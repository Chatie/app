import { Component }  from '@angular/core'
import {
  IonicPage,
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

@IonicPage()
@Component({
  selector:     'page-hostie-edit',
  templateUrl:  'hostie-edit.html',
})
export class HostieEditPage {
  public hostie:       Hostie
  public notify:         (newHostie: Hostie) => Promise<void>

  public loading:      Loading | null

  constructor(
    public hostieStore: HostieStore,
    public log:         Brolog,
    public loadingCtrl: LoadingController,
    public navCtrl:     NavController,
    public navParams:   NavParams,
  ) {
    this.log.verbose('HostieEditPage', 'constructor()')

    // XXX: why Object.assign ???
    this.hostie   = Object.assign({}, navParams.get('hostie'))
    this.notify = navParams.get('notify')
    this.log.silly('HostieEditPage', 'constructor() hostie id:%s', this.hostie.id)

  }

  public ionViewDidLoad() {
    this.log.verbose('HostieEditPage', 'ionViewDidLoad()')
  }

  public async save() {
    this.log.verbose('HostieEditPage', 'save()')

    await this.showLoader()
    const ret = await this.hostieStore.update(
      this.hostie.id!,
      {
        name: this.hostie.name,
        note: this.hostie.note,
      },
    )
    await this.notify(this.hostie)
    this.hideLoader()

    this.log.silly('HostieEditPage', 'HostieStore.update() return: %s', JSON.stringify(ret))

    this.navCtrl.pop()
  }

  public showLoader() {
    this.log.verbose('HostieEditPage', 'showLoader()')

    this.loading = this.loadingCtrl.create({
      content: 'Loading...',
    })
    return this.loading.present()
  }

  public hideLoader() {
    this.log.verbose('HostieEditPage', 'hideLoader()')

    if (!this.loading) {
      return
    }
    this.loading.dismissAll()
    this.loading = null
  }
}
