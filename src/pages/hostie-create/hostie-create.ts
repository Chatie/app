import { Component }      from '@angular/core'
import { NavController }  from 'ionic-angular'

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
  token: string
  nick: string
  note: string

  constructor(
    public navCtrl: NavController,
    public hostieStore: HostieStore,
  ) {

  }

  ionViewDidLoad() {
    console.log('Hello HostieCreate Page');
  }

  create() {
    console.log('create', this.nick)

    const newHostie: Hostie = {
      token:      this.token,
      name:       this.nick,
      updateTime: 222,
      status:     HostieStatus.OFFLINE,
      createTime: Date.now(),
    }

    this.hostieStore.insert(newHostie)
  }
}
