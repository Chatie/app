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
  selector: 'page-dockie-create',
  templateUrl: 'dockie-create.html',
})
export class DockieCreatePage {
  private dockieStore: DockieStore

  private token = uuid() as string
  private name = 'Dockie #' + this.token.substr(-2, 2)
  private note: string

  private loading = false

  constructor(
    public navCtrl:   NavController,
    public database:  Database,
    public log:       Brolog,
  ) {
    this.log.verbose('DockieCreatePage', 'constructor()')

    this.dockieStore = DockieStore.instance({
      database,
      log,
    })
  }

  ionViewDidLoad() {
    this.log.verbose('DockieCreatePage', 'ionViewDidLoad()')
  }

  save() {
    this.log.verbose('DockieCreatePage', 'save()')
    this.loading = true

    const Dockostie: Dockie = {
      token:      this.token,
      name:       this.name,
      note:       this.note,
      update_at: Date.now(),
      status:     DockieStatus.OFFLINE,
      create_at: Date.now(),
    }

    this.log.silly('DockieCreatePage', 'create() Dockostie: %s', JSON.stringify(Dockostie))

    this.dockieStore.insert(Dockostie).subscribe(_ => {
      this.navCtrl.pop()
    })
  }
}
