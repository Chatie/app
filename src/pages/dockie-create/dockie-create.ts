import { Component }      from '@angular/core'
import { NavController }  from 'ionic-angular'

import { Brolog }         from 'brolog'
import uuid               from 'uuid'

import {
  Hostie,
  HostieStatus,
  HostieStore,
}                         from '@chatie/db'

import { Auth }           from '../../providers/auth'

@Component({
  selector: 'page-hostie-create',
  templateUrl: 'hostie-create.html',
})
export class HostieCreatePage {
  private token = uuid() as string
  private name = 'Hostie #' + this.token.substr(-2, 2)
  private note: string

  private loading = false

  constructor(
    public auth:        Auth,
    public hostieStore: HostieStore,
    public navCtrl:     NavController,
    public log:         Brolog,
  ) {
    this.log.verbose('HostieCreatePage', 'constructor()')
  }

  ionViewDidLoad() {
    this.log.verbose('HostieCreatePage', 'ionViewDidLoad()')
  }

  async save() {
    this.log.verbose('HostieCreatePage', 'save()')
    this.loading = true

    const profile = this.auth.snapshot.profile
    if (!profile || !profile.email) {
      throw new Error('no auth user/email')
    }
    const newHostie: Hostie = {
      email:      profile.email,
      token:      this.token,
      name:       this.name,
      note:       this.note,
      update_at: Date.now(),
      status:     HostieStatus.OFFLINE,
      create_at: Date.now(),
    }

    this.log.silly('HostieCreatePage', 'save() newHostie: %s', JSON.stringify(newHostie))

    this.hostieStore.insert(newHostie).subscribe(_ => {
      this.navCtrl.pop()
    })
  }
}
