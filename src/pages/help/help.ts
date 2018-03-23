import { Component }  from '@angular/core'
import {
  IonicPage,
  NavController,
  NavParams,
}                     from 'ionic-angular'

import { Brolog }     from 'brolog'

@IonicPage()
@Component({
  selector:     'page-help',
  templateUrl:  'help.html',
})
export class HelpPage {

  constructor(
    public log:       Brolog,
    public navCtrl:   NavController,
    public navParams: NavParams,
  ) {
    this.log.verbose('HelpPage', 'constructor()')
  }

  public ionViewDidLoad() {
    this.log.verbose('HelpPage', 'ionViewDidLoad()')
  }

}
