/**
 * Wechaty APP for Android & Ios
 * Your ChatBot Pocket Manager
 *
 * https://github.com/wechaty/wechaty-ionic
 * Zhuohuan LI <zixia@zixia.net>
 * License Apache-2.0
 */
import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'

import { DashboardPage } from '../dashboard/'

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})

export class WelcomePage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello WelcomePage Page')
  }

  goToDashboard() {
    this.navCtrl.setRoot(DashboardPage)
  }
}
