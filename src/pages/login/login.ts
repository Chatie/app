import {
  Component,
  OnInit,
  OnDestroy,
}                         from '@angular/core'
import {
  User,
}                         from '@ionic/cloud-angular'
import {
  AlertController,
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
    public user:        User,
  ) {
    this.log.verbose('LoginPage', 'constructor()')
  }

  ngOnInit() {
    this.log.verbose('LoginPage', 'ngOnInit()')

    this.validSub = this.auth.valid.subscribe(valid => {
      this.log.verbose('LoginPage', 'constructor() Auth.valid.subscribe() got:%s', valid)
      if (valid) {
        this.onLogin()
      }
    })
    this.log.silly('LoginPage', 'constructor() Auth.valid.subscribe()-ed')

  }
  onLogin(): void {
    this.log.verbose('LoginPage', 'onLogin()')
    this.gotoDashboardPage()
  }

  ionViewDidLoad() {
    this.log.verbose('LoginPage', 'ngOnInit()')

    if (this.auth.snapshot.valid) {
      this.gotoDashboardPage()
    }
  }

  // https://webcake.co/page-lifecycle-hooks-in-ionic-2/
  ngOnDestroy() {
    this.log.verbose('LoginPage', 'ngOnDestroy()')

    if (this.validSub) {
      this.validSub.unsubscribe()
    }
  }

  async login(): Promise<void> {
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

  showLoader(): void {
    this.log.verbose('LoginPage', 'showLoader()')

    this.loading = this.loadingCtrl.create({
      content: 'Loading...',
    })
    this.loading.present()
  }

  hideLoader(): void {
    this.log.verbose('LoginPage', 'hideLoader()')

    if (!this.loading) {
      return
    }
    this.loading.dismissAll()
    this.loading = null
  }

  async gotoDashboardPage(): Promise<void> {
    this.log.verbose('LoginPage', 'gotoDashboardPage()')
    try {
      await this.navCtrl.setRoot(DashboardPage)
    } catch (e) {
      this.log.verbose('LoginPage', 'gotoDashboardPage() exception:%s', e.message)
    }
  }

}
