import { Component }  from '@angular/core'
import {
  IonicPage,
  NavController,
  NavParams,
}                     from 'ionic-angular'

import { Brolog }     from 'brolog'

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {

  constructor(
    public log:       Brolog,
    public navCtrl:   NavController,
    public navParams: NavParams,
  ) {
    this.log.verbose('FeedbackPage', 'constructor()')
  }

  public ionViewDidLoad() {
    this.log.verbose('FeedbackPage', 'ionViewDidLoad()')
  }

}
