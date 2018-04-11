import {
  Component,
  OnInit,
}  from '@angular/core'
import {
  IonicPage,
  Loading,
  LoadingController,
  NavController,
  NavParams,
}                     from 'ionic-angular'

import { Auth }       from 'auth-angular'
import { Brolog }     from 'brolog'

import { LoginPage }  from '../login/'

@IonicPage()
@Component({
  selector:     'page-logout',
  templateUrl:  'logout.html',
})
export class LogoutPage implements OnInit {
  public loading?:  Loading

  constructor(
    public auth:        Auth,
    public log:         Brolog,
    public loadingCtrl: LoadingController,
    public navCtrl:     NavController,
    public navParams:   NavParams,
  ) {
    this.log.verbose('LogoutPage', 'constructor()')
  }

  public ngOnInit() {
    this.log.verbose('LogoutPage', 'ngOnInit()')

    this.auth.valid.first().toPromise().then(valid => {
      if (!valid) {
        this.logout()
      }
    })
  }

  public ionViewDidLoad() {
    this.log.verbose('LogoutPage', 'ionViewDidLoad()')
  }

  public async showLoader(): Promise<void> {
    this.log.verbose('LogoutPage', 'showLoader()')

    if (this.loading) {
      await this.loading.dismissAll()
    }
    this.loading = this.loadingCtrl.create({
      content: 'Loading...',
    })
    await this.loading.present()
  }

  public hideLoader(): void {
    this.log.verbose('LogoutPage', 'hideLoader()')

    if (!this.loading) {
      return
    }
    this.loading.dismissAll()
    this.loading = undefined
  }

  public async logout() {
    this.log.verbose('LogoutPage', 'logout()')

    await this.showLoader()
    await this.auth.logout()
    await this.navCtrl.setRoot(LoginPage)
    await this.hideLoader()
  }

}
