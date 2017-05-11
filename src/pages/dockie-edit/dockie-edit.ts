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
  selector:     'page-hostie-edit',
  templateUrl:  'hostie-edit.html',
})
export class HostieEditPage {
  hostie:       Dockie
  notify:         (newHostie: Dockie) => Promise<void>

  loading:      Loading | null

  constructor(
    public hostieStore: DockieStore,
    public log:         Brolog,
    public loadingCtrl: LoadingController,
    public navCtrl:     NavController,
    public navParams:   NavParams,
  ) {
    this.log.verbose('HostieEditPage', 'constructor()')

    this.hostie   = Object.assign({}, navParams.get('hostie'))
    this.notify = navParams.get('notify')
    this.log.silly('HostieEditPage', 'constructor() hostie id:%s', this.hostie.id)

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
      note: this.hostie.note,
    }).toPromise()
    await this.notify(this.hostie)
    this.hideLoader()

    this.log.silly('HostieEditPage', 'DockieStore.update() return: %s', JSON.stringify(ret))

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
