import { Component }  from '@angular/core'
import {
  IonicPage,
  NavController,
  NavParams,
}                     from 'ionic-angular'

import { Brolog }     from 'brolog'

import { AboutPage }  from '../about/'
import { HelpPage }   from '../help/'
import { LogoutPage } from '../logout/'

@IonicPage()
@Component({
  selector:     'page-setting',
  templateUrl:  'setting.html',
})
export class SettingPage {
  public notificate = true

  constructor(
    public log:       Brolog,
    public navCtrl:   NavController,
    public navParams: NavParams,
  ) {
    this.log.verbose('SettingPage', 'constructor()')
  }

  public ionViewDidLoad() {
    this.log.verbose('SettingPage', 'ionViewDidLoad()')
  }

  public about() {
    this.navCtrl.push(AboutPage)
  }

  public help() {
    this.navCtrl.push(HelpPage)
  }

  public gotoLogoutPage() {
    this.navCtrl.push(LogoutPage)
  }
}
