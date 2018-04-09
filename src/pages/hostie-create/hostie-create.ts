import { Component }      from '@angular/core'
import {
  IonicPage,
  NavController,
}  from 'ionic-angular'

import { Auth }           from 'auth-angular'
import { Brolog }         from 'brolog'
import uuid               from 'uuid'

import {
  Hostie,
  HostieStore,
  Status,
}                         from '@chatie/db'

@IonicPage()
@Component({
  selector:     'page-hostie-create',
  templateUrl:  'hostie-create.html',
})
export class HostieCreatePage {
  private token = uuid() as string
  private name = 'Hostie #' + this.token.substr(-2, 2)
  private note: string

  public loading = false

  constructor(
    public auth:        Auth,
    public hostieStore: HostieStore,
    public navCtrl:     NavController,
    public log:         Brolog,
  ) {
    this.log.verbose('HostieCreatePage', 'constructor()')
  }

  public ionViewDidLoad() {
    this.log.verbose('HostieCreatePage', 'ionViewDidLoad()')
  }

  public async save() {
    this.log.verbose('HostieCreatePage', 'save()')
    this.loading = true

    const profile = await this.auth.profile.first().toPromise()

    if (!profile || !profile.email) {
      throw new Error('no auth user/email')
    }
    const newHostie: Hostie = {
      key:      this.token,
      name:       this.name,
      note:       this.note,
      status:     Status.OFF,
    }

    this.log.silly('HostieCreatePage', 'save() newHostie: %s', JSON.stringify(newHostie))

    this.hostieStore.create({
      name: this.name,
      key: this.token,
      ownerId: 'zixia',
    }).then(() => {
      this.navCtrl.pop()
    })
  }
}
