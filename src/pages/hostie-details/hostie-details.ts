/**
 * Wechaty APP for Android & Ios
 * Your ChatBot Pocket Manager
 *
 * https://github.com/wechaty/wechaty-ionic
 * Zhuohuan LI <zixia@zixia.net>
 * License Apache-2.0
 */
import { Component } from '@angular/core'

import { NavController, NavParams } from 'ionic-angular'

import { Brolog } from 'brolog'

import { Hostie } from '@chatie/db'

@Component({
  selector: 'page-hostie-details',
  templateUrl: 'hostie-details.html',
})
export class HostieDetailsPage {
  hostie: Hostie

  constructor(
    private log:        Brolog,
    private navCtrl:    NavController,
    private navParams:  NavParams,
  ) {
    this.log.verbose('HostieDetailsPage', 'constructor()')

    // If we navigated to this page, we will have an item available as a nav param
    this.hostie = navParams.get('hostie')
    this.log.silly('HostieDetailsPage', 'constructor() hostie id:%s', this.hostie.id)
  }
}
