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

import { Auth }           from 'auth-angular'
import { Brolog }         from 'brolog'

import { VERSION }        from '../../config'

import { DashboardPage }  from '../dashboard/'

@IonicPage()
@Component({
  selector:     'page-login',
  templateUrl:  'login.html',
})
export class LoginPage implements OnInit, OnDestroy {
  private validSub?:  Subscription
  private loading?:   Loading

  public email:     string
  public password:  string

  public version:   string

  constructor(
    public alertCtrl:   AlertController,
    public auth:        Auth,
    public log:         Brolog,
    public loadingCtrl: LoadingController,
    public navCtrl:     NavController,
  ) {
    this.log.verbose('LoginPage', 'constructor()')

    this.version = VERSION
  }

  public ngOnInit() {
    this.log.verbose('LoginPage', 'ngOnInit()')

    this.validSub = this.auth.valid.subscribe(valid => {
      this.log.verbose('LoginPage', 'ngOnInit() this.auth.valid.subscribe(valid=%s)', valid)
      if (valid) {
        this.onLogin()
      }
    })
  }

  // https://webcake.co/page-lifecycle-hooks-in-ionic-2/
  public ngOnDestroy() {
    this.log.verbose('LoginPage', 'ngOnDestroy()')

    if (this.validSub) {
      this.validSub.unsubscribe()
    }
  }

  public ionViewDidLoad() {
    this.log.verbose('LoginPage', 'ionViewDidLoad()')
  }

  public onLogin(): void {
    this.log.verbose('LoginPage', 'onLogin()')
    this.gotoDashboardPage()
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

  public async logout(): Promise<void> {
    this.log.verbose('LoginPage', 'logout()')

    await this.auth.logout()
    this.navCtrl.setRoot(LoginPage)
  }

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
    this.loading = undefined
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
