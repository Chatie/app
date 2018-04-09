import { Component }      from '@angular/core'
import {
  IonicPage,
  NavController,
}  from 'ionic-angular'

import { Brolog }         from 'brolog'
import cuid               from 'cuid'

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
  private token:  string
  private name:   string
  private note:   string

  public loading: boolean

  constructor(
    public log:         Brolog,
    public hostieStore: HostieStore,
    public navCtrl:     NavController,
  ) {
    this.log.verbose('HostieCreatePage', 'constructor()')

    this.token = cuid()
    this.name  = 'Hostie #' + this.token.substr(-2, 2)
    this.note   = ''

    this.loading = false
  }

  public ionViewDidLoad() {
    this.log.verbose('HostieCreatePage', 'ionViewDidLoad()')
  }

  public async save() {
    this.log.verbose('HostieCreatePage', 'save()')
    this.loading = true

    const newHostie: Hostie = {
      token:  this.token,
      name:   this.name,
      note:   this.note,
      status: Status.OFF,
    }

    this.log.silly('HostieCreatePage', 'save() newHostie: %s', JSON.stringify(newHostie))

    this.hostieStore.create({
      name:     this.name,
      token:    this.token,
    }).then(() => {
      this.navCtrl.pop()
    })
  }
}
