import { Component }  from '@angular/core'
import {
  NavController,
  NavParams,
}                     from 'ionic-angular'

import { Brolog }     from 'brolog'

@Component({
  selector:     'page-logout',
  templateUrl:  'logout.html',
})
export class LogoutPage {

  constructor(
    public log:       Brolog,
    public navCtrl:   NavController,
    public navParams: NavParams,
  ) {
    this.log.verbose('LogoutPage', 'constructor()')
  }

  ionViewDidLoad() {
    this.log.verbose('LogoutPage', 'ionViewDidLoad()')
  }

}
