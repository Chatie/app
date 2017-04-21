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
  Dockie,
  DockieStore,
}                     from '@chatie/db'

@Component({
  selector:     'page-dockie-edit',
  templateUrl:  'dockie-edit.html',
})
export class DockieEditPage {
  dockie:       Dockie
  done:         (newDockie: Dockie) => Promise<void>
  dockieStore:  DockieStore

  loading:      Loading | null

  constructor(
    public log:         Brolog,
    public database:    Database,
    public loadingCtrl: LoadingController,
    public navCtrl:     NavController,
    public navParams:   NavParams,
  ) {
    this.log.verbose('DockieEditPage', 'constructor()')

    this.dockie   = Object.assign({}, navParams.get('dockie'))
    this.done     = navParams.get('done')
    this.log.silly('DockieEditPage', 'constructor() dockie id:%s', this.dockie.id)

    this.dockieStore = DockieStore.instance()

  }

  ionViewDidLoad() {
    this.log.verbose('DockieEditPage', 'ionViewDidLoad()')
  }

  async save() {
    this.log.verbose('DockieEditPage', 'save()')

    await this.showLoader()
    const ret = await this.dockieStore.update({
      id:   this.dockie.id,
      name: this.dockie.name,
    }).toPromise()
    await this.done(this.dockie)
    this.hideLoader()

    this.log.silly('DockieEditPage', 'update return: %s', JSON.stringify(ret))

    this.navCtrl.pop()
  }

  showLoader() {
    this.log.verbose('DockieEditPage', 'showLoader()')

    this.loading = this.loadingCtrl.create({
      content: 'Loading...',
    })
    return this.loading.present()
  }

  hideLoader() {
    this.log.verbose('DockieEditPage', 'hideLoader()')

    if (!this.loading) {
      return
    }
    this.loading.dismissAll()
    this.loading = null
  }
}
