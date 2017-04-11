import { Component }  from '@angular/core'
import {
  Auth,
  Push,
}                     from '@ionic/cloud-angular'
import {
  NavController,
  NavParams,
}                     from 'ionic-angular'

import { Brolog }     from 'brolog'

import { LoginPage }  from '../login/'

@Component({
  selector:     'page-logout',
  templateUrl:  'logout.html',
})
export class LogoutPage {

  constructor(
    public auth:      Auth,
    public log:       Brolog,
    public navCtrl:   NavController,
    public navParams: NavParams,
    public push:      Push,
  ) {
    this.log.verbose('LogoutPage', 'constructor()')
  }

  ionViewDidLoad() {
    this.log.verbose('LogoutPage', 'ionViewDidLoad()')
  }

  logout() {
    this.push.unregister()
    this.auth.logout()
    this.navCtrl.setRoot(LoginPage)
  }

}
