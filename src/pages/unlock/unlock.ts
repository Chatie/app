import { Component }        from '@angular/core'
import {
  NavController,
  NavParams,
}                           from 'ionic-angular'

import { Brolog }           from 'brolog'

@Component({
  selector:     'page-unlock',
  templateUrl:  'unlock.html',
})
export class UnlockPage {

  constructor(
    public log:       Brolog,
    public navCtrl:   NavController,
    public navParams: NavParams,
  ) {
    this.log.verbose('UnlockPage', 'constructor()')
  }

  ionViewDidLoad() {
    this.log.verbose('UnlockPage', 'ionViewDidLoad()')
  }

}
