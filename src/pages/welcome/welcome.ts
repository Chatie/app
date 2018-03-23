/**
 * Chatie APP for Android & Ios & SPA
 * Your ChatBot Pocket Manager
 *
 * https://github.com/chatie/app
 * Huan LI <zixia@zixia.net>
 * License Apache-2.0
 */
import { Component }      from '@angular/core'
import {
  IonicPage,
  NavController,
  NavParams,
}                         from 'ionic-angular'

import { Brolog }         from 'brolog'
import { DashboardPage }  from '../dashboard/'
// import { LoginPage }      from '../login/'

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})

export class WelcomePage {

  constructor(
    public log:     Brolog,
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {
    this.log.verbose('WelcomePage', 'constructor()')
  }

  public ionViewDidLoad() {
    this.log.verbose('WelcomePage', 'ionViewDidLoad()')
  }

  public async goToDashboard() {
    this.log.verbose('WelcomePage', 'goToDashboard()')

    try {
      await this.navCtrl.setRoot(DashboardPage)
    } catch (e) {
      this.log.warn('WelcomePage', 'goToDashboard() exception:%s', e.message)
      // await this.navCtrl.push(LoginPage)
    }

  }
}
