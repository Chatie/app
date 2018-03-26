import { Component }        from '@angular/core'
import {
  IonicPage,
  NavController,
  NavParams,
}                           from 'ionic-angular'

import { Brolog }           from 'brolog'

@IonicPage()
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

  public ionViewDidLoad() {
    this.log.verbose('UnlockPage', 'ionViewDidLoad()')
  }

  public securedPing() {
    // Here we use authHttp to make an authenticated
    // request to the server. Change the endpoint up for
    // one that points to your own server.

    // this.authHttp.get('http://localhost:3001/secured/ping')
    //   .map(res => res.json())
    //   .subscribe(
    //     data => this.log.verbose('UnlockPage', 'securePing() data: %s', data.text),
    //     err => this.log.verbose('UnlockPage', 'securePing() err: %s', err),
    //   )
  }
}
