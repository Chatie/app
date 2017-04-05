import { Component }  from '@angular/core'
import { Auth }       from '@ionic/cloud-angular'
import {
  NavController,
  NavParams,
}                     from 'ionic-angular'


import { Brolog }     from 'brolog'

import { AboutPage }  from '../about/'
import { LoginPage }  from '../login/'

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  private notificate: boolean = true

  constructor(
    public auth:      Auth,
    public log:       Brolog,
    public navCtrl:   NavController,
    public navParams: NavParams,
  ) {
    this.log.verbose('SettingPage', 'constructor()')
  }

  ionViewDidLoad() {
    this.log.verbose('SettingPage', 'ionViewDidLoad()')
  }

  about() {
    this.navCtrl.push(AboutPage)
  }

  logout() {
    this.auth.logout()
    this.navCtrl.setRoot(LoginPage)
  }
}
