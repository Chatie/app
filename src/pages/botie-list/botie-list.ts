import { Component }  from '@angular/core'
import {
  NavController,
  NavParams,
}                     from 'ionic-angular'

import { Brolog }     from 'brolog'

@Component({
  selector: 'page-botie-list',
  templateUrl: 'botie-list.html',
})
export class BotieListPage {

  constructor(
    public log:       Brolog,
    public navCtrl:   NavController,
    public navParams: NavParams,
  ) {
    this.log.verbose('BotieListPage', 'constructor()')

  }

  ionViewDidLoad() {
    this.log.verbose('BotieListPage', 'ionViewDidLoad()')
  }

}
