import { Component }  from '@angular/core'
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
  notify:         (newDockie: Dockie) => Promise<void>

  loading:      Loading | null

  constructor(
    public dockieStore: DockieStore,
    public log:         Brolog,
    public loadingCtrl: LoadingController,
    public navCtrl:     NavController,
    public navParams:   NavParams,
  ) {
    this.log.verbose('DockieEditPage', 'constructor()')

    this.dockie   = Object.assign({}, navParams.get('dockie'))
    this.notify = navParams.get('notify')
    this.log.silly('DockieEditPage', 'constructor() dockie id:%s', this.dockie.id)

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
      note: this.dockie.note,
    }).toPromise()
    await this.notify(this.dockie)
    this.hideLoader()

    this.log.silly('DockieEditPage', 'DockieStore.update() return: %s', JSON.stringify(ret))

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
