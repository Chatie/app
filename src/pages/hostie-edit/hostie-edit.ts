import { Component }  from '@angular/core'
import {
  Database,
}                     from '@ionic/cloud-angular'
import {
  LoadingController,
  Loading,
  NavController,
  NavParams,
}                     from 'ionic-angular'

import { Brolog }     from 'brolog'

import {
  Hostie,
  HostieStore,
}                     from '@chatie/db'

@Component({
  selector:     'page-hostie-edit',
  templateUrl:  'hostie-edit.html',
})
export class HostieEditPage {
  hostie:       Hostie
  done:         (newHostie: Hostie) => Promise<void>
  hostieStore:  HostieStore

  loading:      Loading | null

  constructor(
    public log:         Brolog,
    public database:    Database,
    public loadingCtrl: LoadingController,
    public navCtrl:     NavController,
    public navParams:   NavParams,
  ) {
    this.log.verbose('HostieEditPage', 'constructor()')

    this.hostie   = Object.assign({}, navParams.get('hostie'))
    this.done     = navParams.get('done')
    this.log.silly('HostieEditPage', 'constructor() hostie id:%s', this.hostie.id)

    this.hostieStore = HostieStore.instance()

  }

  ionViewDidLoad() {
    this.log.verbose('HostieEditPage', 'ionViewDidLoad()')
  }

  async save() {
    this.log.verbose('HostieEditPage', 'save()')

    await this.showLoader()
    const ret = await this.hostieStore.update({
      id:   this.hostie.id,
      name: this.hostie.name,
    }).toPromise()
    await this.done(this.hostie)
    this.hideLoader()

    this.log.silly('HostieEditPage', 'update return: %s', JSON.stringify(ret))

    this.navCtrl.pop()
  }

  showLoader() {
    this.log.verbose('HostieEditPage', 'showLoader()')

    this.loading = this.loadingCtrl.create({
      content: 'Loading...',
    })
    return this.loading.present()
  }

  hideLoader() {
    this.log.verbose('HostieEditPage', 'hideLoader()')

    if (!this.loading) {
      return
    }
    this.loading.dismissAll()
    this.loading = null
  }
}
