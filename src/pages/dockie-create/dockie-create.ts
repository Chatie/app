import { Component }      from '@angular/core'
import { NavController }  from 'ionic-angular'

import { Brolog }         from 'brolog'
import uuid               from 'uuid'

import {
  Dockie,
  DockieStatus,
  DockieStore,
}                         from '@chatie/db'

import { Auth }           from '../../providers/auth'

@Component({
  selector: 'page-dockie-create',
  templateUrl: 'dockie-create.html',
})
export class DockieCreatePage {
  private token = uuid() as string
  private name = 'Dockie #' + this.token.substr(-2, 2)
  private note: string

  private loading = false

  constructor(
    public auth:        Auth,
    public dockieStore: DockieStore,
    public navCtrl:     NavController,
    public log:         Brolog,
  ) {
    this.log.verbose('DockieCreatePage', 'constructor()')
  }

  ionViewDidLoad() {
    this.log.verbose('DockieCreatePage', 'ionViewDidLoad()')
  }

  async save() {
    this.log.verbose('DockieCreatePage', 'save()')
    this.loading = true

    const profile = this.auth.snapshot.profile
    if (!profile || !profile.email) {
      throw new Error('no auth user/email')
    }
    const newDockie: Dockie = {
      email:      profile.email,
      token:      this.token,
      name:       this.name,
      note:       this.note,
      update_at: Date.now(),
      status:     DockieStatus.OFFLINE,
      create_at: Date.now(),
    }

    this.log.silly('DockieCreatePage', 'save() newDockie: %s', JSON.stringify(newDockie))

    this.dockieStore.insert(newDockie).subscribe(_ => {
      this.navCtrl.pop()
    })
  }
}
