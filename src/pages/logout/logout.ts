import { Component }  from '@angular/core'
import {
  IonicPage,
  Loading,
  LoadingController,
  NavController,
  NavParams,
}                     from 'ionic-angular'

import { Brolog }     from 'brolog'

import { Auth }       from '../../providers/auth'
import { LoginPage }  from '../login/'

@IonicPage()
@Component({
  selector:     'page-logout',
  templateUrl:  'logout.html',
})
export class LogoutPage {
  public loading: Loading | null = null

  constructor(
    public auth:        Auth,
    public loadingCtrl: LoadingController,
    public log:         Brolog,
    public navCtrl:     NavController,
    public navParams:   NavParams,
  ) {
    this.log.verbose('LogoutPage', 'constructor()')

  }

  public ionViewDidLoad() {
    this.log.verbose('LogoutPage', 'ionViewDidLoad()')

    if (!this.auth.snapshot.valid) {
      this.logout()
    }

  }

  public showLoader(): void {
    this.log.verbose('LogoutPage', 'showLoader()')

    this.loading = this.loadingCtrl.create({
      content: 'Loading...',
    })
    this.loading.present()
  }

  public hideLoader(): void {
    this.log.verbose('LogoutPage', 'hideLoader()')

    if (!this.loading) {
      return
    }
    this.loading.dismissAll()
    this.loading = null
  }

  public async logout() {
    this.log.verbose('LogoutPage', 'logout()')

    this.showLoader()
    this.auth.logout()
    this.navCtrl.setRoot(LoginPage)
    this.hideLoader()
  }

}
