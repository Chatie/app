import { Component }      from '@angular/core'
import { Database }       from '@ionic/cloud-angular'
import { NavController }  from 'ionic-angular'
import * as uuid          from 'uuid'
import { Brolog }         from 'brolog'

import {
  Hostie,
  HostieStatus,
  HostieStore,
}                 from '@chatie/db'

@Component({
  selector: 'page-hostie-create',
  templateUrl: 'hostie-create.html',
})
export class HostieCreatePage {
  private hostieStore: HostieStore

  private token = uuid()
  private name  = 'Unnamed Hostie'
  private note:   string

  private loading = false

  constructor(
    public navCtrl:   NavController,
    public database:  Database,
    public log:       Brolog,
  ) {
    this.log.verbose('HostieCreatePage', 'constructor()')

    this.hostieStore = HostieStore.instance({
      database,
      log,
    })
  }

  ionViewDidLoad() {
    this.log.verbose('HostieCreatePage', 'ionViewDidLoad()')
  }

  create() {
    this.log.verbose('HostieCreatePage', 'create()')
    this.loading = true

    const newHostie: Hostie = {
      token:      this.token,
      name:       this.name,
      note:       this.note,
      updateTime: Date.now(),
      status:     HostieStatus.OFFLINE,
      createTime: Date.now(),
    }

    this.log.silly('HostieCreatePage', 'create() newHostie: %s', JSON.stringify(newHostie))

    this.hostieStore.insert(newHostie).subscribe(_ => {
      this.navCtrl.pop()
    })
  }
}
