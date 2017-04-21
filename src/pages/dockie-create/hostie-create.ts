import { Component }      from '@angular/core'
import { Database }       from '@ionic/cloud-angular'
import { NavController }  from 'ionic-angular'

import { Brolog }         from 'brolog'
import uuid               from 'uuid'

import {
  Dockie,
  DockieStatus,
  DockieStore,
}                         from '@chatie/db'

@Component({
  selector: 'page-hostie-create',
  templateUrl: 'hostie-create.html',
})
export class DockieCreatePage {
  private hostieStore: DockieStore

  private token = uuid() as string
  private name = 'Hostie #' + this.token.substr(-2, 2)
  private note: string

  private loading = false

  constructor(
    public navCtrl:   NavController,
    public database:  Database,
    public log:       Brolog,
  ) {
    this.log.verbose('HostieCreatePage', 'constructor()')

    this.hostieStore = DockieStore.instance({
      database,
      log,
    })
  }

  ionViewDidLoad() {
    this.log.verbose('HostieCreatePage', 'ionViewDidLoad()')
  }

  save() {
    this.log.verbose('HostieCreatePage', 'save()')
    this.loading = true

    const newHostie: Dockie = {
      token:      this.token,
      name:       this.name,
      note:       this.note,
      update_at: Date.now(),
      status:     DockieStatus.OFFLINE,
      create_at: Date.now(),
    }

    this.log.silly('HostieCreatePage', 'create() newHostie: %s', JSON.stringify(newHostie))

    this.hostieStore.insert(newHostie).subscribe(_ => {
      this.navCtrl.pop()
    })
  }
}
