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
  callback:     (newHostie: Hostie) => Promise<void>
  hostieStore:  HostieStore

  loading:      Loading

  constructor(
    public log:         Brolog,
    public database:    Database,
    // public hostieStore: HostieStore,
    public loadingCtrl: LoadingController,
    public navCtrl:     NavController,
    public navParams:   NavParams,
  ) {
    this.log.verbose('HostieEditPage', 'constructor()')

    this.hostie   = Object.assign({}, navParams.get('hostie'))
    this.callback = navParams.get('callback')
    this.log.silly('HostieEditPage', 'constructor() hostie id:%s', this.hostie.id)

    this.hostieStore = HostieStore.instance({
      database,
      log,
    })

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
    await this.callback(this.hostie)
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
