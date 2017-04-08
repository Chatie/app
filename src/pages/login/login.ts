import { Component }      from '@angular/core'
import {
  Auth,
  User,
}                         from '@ionic/cloud-angular'
import {
  AlertController,
  LoadingController,
  Loading,
  NavController,
}                         from 'ionic-angular'

import { Brolog }         from 'brolog'

import { UserService }    from '../../provider/user-service'

import { DashboardPage }  from '../../pages/dashboard/'

@Component({
  selector:     'page-login',
  templateUrl:  'login.html',
})
export class LoginPage {
  private showLogin = false
  private loading: Loading = null

  public email:     string
  public password:  string

  constructor(
    public alertCtrl:    AlertController,
    public auth:         Auth,
    public log:          Brolog,
    public loadingCtrl:  LoadingController,
    public navCtrl:      NavController,
    public user:         User,
  ) {
    this.log.verbose('LoginPage', 'constructor()')
    // this.userService.user.subscribe(userInfo => {
    //   this.userInfo = userInfo
    // })
  }

  ionViewDidLoad() {
    this.log.verbose('LoginPage', 'ionViewDidLoad()')
  }

  async loginEmail(): Promise<void> {
    this.log.verbose('LoginPage', 'loginEmail() with email:%s password:%s',
                                  this.email,
                                  this.password,
                    )

    let details = {
      email:    this.email,
      password: this.password,
    }

    try {
      this.showLoader()
      await this.auth.login('basic', details)
      this.log.silly('LoginPage', 'loginEmail() successful!')
      this.hideLoader()

      this.redirectAfterLogin()

    } catch (e) {
      this.log.verbose('LoginPage', 'LoginEmail() failed: %s', e.message)

      this.hideLoader()

      this.alertCtrl.create({
        title:    'Login Error',
        subTitle: 'Exception: ' + e.message,
        buttons:  ['OK'],
      }).present()

    }
  }

  /**
   * https://docs.ionic.io/services/auth/github-auth.html
   */
  async loginGithub(): Promise<void> {
    this.log.verbose('LoginPage', 'loginGithub()')

    if (!this.showLogin) {
      this.showLogin = true
      return
    }

    try {
      const authLoginResult = await this.auth.login('github')
      if (authLoginResult.signup) {
        this.log.verbose('LoginPage', 'login() new user signup for %s',
                                      this.user.social.github.uid,
                        )
      } else {
        this.log.verbose('LoginPage', 'login() returned user login for %s',
                                      this.user.social.github.uid,
                        )
      }

      this.log.silly('LoginPage', 'login() %s',
                                  JSON.stringify(this.user.social.github.data),
                    )

      const github = this.user.social.github

      // this.userService.login('github', github.uid, {
      //   email:  github.data.email,
      //   id:     github.data.username,
      //   name:   github.data.full_name,
      //   avatar: github.data.profile_picture,
      // })

      this.redirectAfterLogin()

    } catch (e) {
      this.log.warn('LoginPage', 'loginGithub() %s', e.message)

      this.alertCtrl.create({
        title:    'Login Error',
        subTitle: 'Exception: ' + e.message,
        buttons:  ['OK'],
      }).present()

    }
  }

  logout(): void {
    this.log.verbose('LoginPage', 'logout()')
    this.auth.logout()
    this.navCtrl.setRoot(LoginPage)
  }

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

  redirectAfterLogin(): void {
    this.navCtrl.setRoot(DashboardPage)
  }
}
