import { Component }      from '@angular/core'
import {
  IonicPage,
  NavController,
}  from 'ionic-angular'

import { Brolog }         from 'brolog'
import cuid               from 'cuid'

import {
  Botie,
  BotieStore,
  Status,
}                         from '@chatie/db'

@IonicPage()
@Component({
  selector:     'page-botie-create',
  templateUrl:  'botie-create.html',
})
export class BotieCreatePage {
  private token:  string
  private name:   string
  private note:   string

  public loading: boolean

  constructor(
    public log:         Brolog,
    public botieStore:  BotieStore,
    public navCtrl:     NavController,
  ) {
    this.log.verbose('BotieCreatePage', 'constructor()')

    this.token = cuid()
    this.name  = 'Botie #' + this.token.substr(-2, 2)
    this.note   = ''

    this.loading = false
  }

  public ionViewDidLoad() {
    this.log.verbose('BotieCreatePage', 'ionViewDidLoad()')
  }

  public async save() {
    this.log.verbose('BotieCreatePage', 'save()')
    this.loading = true

    const newBotie: Botie = {
      token:  this.token,
      name:   this.name,
      note:   this.note,
      status: Status.OFF,
    }

    this.log.silly('BotieCreatePage', 'save() newBotie: %s', JSON.stringify(newBotie))

    this.botieStore.create({
      name:     this.name,
      token:    this.token,
    }).then(() => {
      this.navCtrl.pop()
    })
  }
}
