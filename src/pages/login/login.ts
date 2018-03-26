import {
  Component,
  OnInit,
  OnDestroy,
}                         from '@angular/core'
import {
  AlertController,
  IonicPage,
  LoadingController,
  Loading,
  NavController,
}                         from 'ionic-angular'

import {
  Subscription,
}                         from 'rxjs/Subscription'

import { Auth }           from '../../providers/auth'

import { Brolog }         from 'brolog'

import { DashboardPage }  from '../../pages/dashboard/'

@IonicPage()
@Component({
  selector:     'page-login',
  templateUrl:  'login.html',
})
export class LoginPage implements OnInit, OnDestroy {
  private validSub: Subscription
  private loading:  Loading | null              = null

  public email:     string
  public password:  string

  constructor(
    public alertCtrl:   AlertController,
    public auth:        Auth,
    public log:         Brolog,
    public loadingCtrl: LoadingController,
    public navCtrl:     NavController,
    // public user:        User,
  ) {
    this.log.verbose('LoginPage', 'constructor()')
  }

  public ngOnInit() {
    this.log.verbose('LoginPage', 'ngOnInit()')

    this.validSub = this.auth.valid.subscribe(valid => {
      this.log.verbose('LoginPage', 'constructor() Auth.valid.subscribe() got:%s', valid)
      if (valid) {
        this.onLogin()
      }
    })
    this.log.silly('LoginPage', 'constructor() Auth.valid.subscribe()-ed')

  }
  public onLogin(): void {
    this.log.verbose('LoginPage', 'onLogin()')
    this.gotoDashboardPage()
  }

  public ionViewDidLoad() {
    this.log.verbose('LoginPage', 'ngOnInit()')

    if (this.auth.snapshot.valid) {
      this.gotoDashboardPage()
    }
  }

  // https://webcake.co/page-lifecycle-hooks-in-ionic-2/
  public ngOnDestroy() {
    this.log.verbose('LoginPage', 'ngOnDestroy()')

    if (this.validSub) {
      this.validSub.unsubscribe()
    }
  }

  public async login(): Promise<void> {
    this.log.verbose('LoginPage', 'login()')

    this.auth.login()

    // } catch (e) {
    //   this.log.warn('LoginPage', 'login() exception: %s', e && e.message || e)

    //   this.alertCtrl.create({
    //     title:    'Login Error',
    //     subTitle: 'Exception: ' + e.message,
    //     buttons:  ['OK'],
    //   }).present()
    // }

  }

  // logout(): void {
  //   this.log.verbose('LoginPage', 'logout()')
  //   this.auth.logout()
  //   this.navCtrl.setRoot(LoginPage)
  // }

  public showLoader(): void {
    this.log.verbose('LoginPage', 'showLoader()')

    this.loading = this.loadingCtrl.create({
      content: 'Loading...',
    })
    this.loading.present()
  }

  public hideLoader(): void {
    this.log.verbose('LoginPage', 'hideLoader()')

    if (!this.loading) {
      return
    }
    this.loading.dismissAll()
    this.loading = null
  }

  public async gotoDashboardPage(): Promise<void> {
    this.log.verbose('LoginPage', 'gotoDashboardPage()')
    try {
      await this.navCtrl.setRoot(DashboardPage)
    } catch (e) {
      this.log.verbose('LoginPage', 'gotoDashboardPage() exception:%s', e.message)
    }
  }

}
