import { Component }  from '@angular/core'
import {
  NavController,
  NavParams,
}                     from 'ionic-angular'

import { Brolog }     from 'brolog'

import {
  Hostie,
  HostieStatus,
  HostieRuntime,
}                     from '@chatie/db'

@Component({
  selector:     'page-hostie-edit',
  templateUrl:  'hostie-edit.html',
})
export class HostieEditPage {
  hostie: Hostie

  constructor(
    public log:       Brolog,
    public navCtrl:   NavController,
    public navParams: NavParams,
  ) {
    this.log.verbose('HostieEditPage', 'constructor()')

    this.hostie = Object.assign({}, navParams.get('hostie'))
    this.log.silly('HostieEditPage', 'constructor() hostie id:%s', this.hostie.id)

  }

  ionViewDidLoad() {
    this.log.verbose('HostieEditPage', 'ionViewDidLoad()')
  }

}
