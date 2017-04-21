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

    this.log.verbose('DockieCreatePage', 'save() 1')
    console.log(this.auth.user)
    const user = this.auth.user
    if (!user) {
      throw new Error('no auth user')
    }
    this.log.verbose('DockieCreatePage', 'save() 2')
    const newDockie: Dockie = {
      email:      user.email,
      token:      this.token,
      name:       this.name,
      note:       this.note,
      update_at: Date.now(),
      status:     DockieStatus.OFFLINE,
      create_at: Date.now(),
    }

    this.log.silly('DockieCreatePage', 'create() newDockie: %s', JSON.stringify(newDockie))

    this.dockieStore.insert(newDockie).subscribe(_ => {
      this.navCtrl.pop()
    })
  }
}
