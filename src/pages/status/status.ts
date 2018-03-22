import { Component }  from '@angular/core'
import {
  IonicPage,
  NavController,
  NavParams,
}                     from 'ionic-angular'

import { Brolog }     from 'brolog'

@IonicPage()
@Component({
  selector:     'page-status',
  templateUrl:  'status.html',
})
export class StatusPage {

  constructor(
    public log:       Brolog,
    public navCtrl:   NavController,
    public navParams: NavParams,
  ) {
    this.log.verbose('StatusPage', 'constructor()')
  }

  ionViewDidLoad() {
    this.log.verbose('StatusPage', 'ionViewDidLoad()')
  }

}
