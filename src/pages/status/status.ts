import { Component }  from '@angular/core'
import {
  NavController,
  NavParams,
}                     from 'ionic-angular'

import { Brolog }     from 'brolog'

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
