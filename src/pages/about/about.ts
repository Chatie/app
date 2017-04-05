import { Component }  from '@angular/core'
import {
  NavController,
  NavParams,
}                     from 'ionic-angular'

import { Brolog }     from 'brolog'

@Component({
  selector:     'page-about',
  templateUrl:  'about.html',
})
export class AboutPage {

  constructor(
    public log:       Brolog,
    public navCtrl:   NavController,
    public navParams: NavParams,
  ) {
    this.log.verbose('AboutPage', 'constructor()')
  }

  ionViewDidLoad() {
    this.log.verbose('AboutPage', 'ionViewDidLoad()')
  }

}
