import { Component }      from '@angular/core'
import {
  Auth,
  Push,
  User,
}                         from '@ionic/cloud-angular'
import {
  AlertController,
  LoadingController,
  Loading,
  NavController,
}                         from 'ionic-angular'

import { Brolog }         from 'brolog'

// import { UserService }    from '../../provider/user-service'

import { DashboardPage }  from '../../pages/dashboard/'

@Component({
  selector:     'page-login',
  templateUrl:  'login.html',
})
export class LoginPage {
  private showLogin = false
  private loading: Loading | null

  public email:     string
  public password:  string

  constructor(
    public alertCtrl:   AlertController,
    public auth:        Auth,
    public log:         Brolog,
    public loadingCtrl: LoadingController,
    public navCtrl:     NavController,
    public push:        Push,
    public user:        User,
  ) {
    this.log.verbose('LoginPage', 'constructor()')
    // this.userService.user.subscribe(userInfo => {
    //   this.userInfo = userInfo
    // })
  }

  ionViewDidLoad() {
    this.log.verbose('LoginPage', 'ionViewDidLoad()')

    if (this.auth.isAuthenticated()) {
      this.gotoDashboardPage()
    }

  }

  async loginEmail(): Promise<void> {
    this.log.verbose('LoginPage', 'loginEmail() with email:%s password:%s',
                                  this.email,
                                  this.password,
                    )

    if (!this.showLogin) {
      this.showLogin = true
      return
    }

    let details = {
      email:    this.email,
      password: this.password,
    }

    try {
      this.showLoader()
      await this.auth.login('basic', details)
      this.log.silly('LoginPage', 'loginEmail() successful!')
      this.hideLoader()

      this.gotoDashboardPage()

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

    this.showLoader()

    try {
      const authLoginResult = await this.auth.login('github')
      const github = this.user.social.github

      if (!github) {
        throw new Error('no github data')
      }

      if (authLoginResult.signup) {
        this.log.verbose('LoginPage', 'login() new user signup for %s',
                                      github.uid,
                        )
        this.user.set('signupTime', Date.now())
      } else {
        this.log.verbose('LoginPage', 'login() returned user login for %s',
                                      github.uid,
                        )
      }

      this.log.silly('LoginPage', 'login() %s',
                                  JSON.stringify(github.data),
                    )

      // this.userService.login('github', github.uid, {
      //   email:  github.data.email,
      //   id:     github.data.username,
      //   name:   github.data.full_name,
      //   avatar: github.data.profile_picture,
      // })

      this.user.set('loginTime', Date.now())
      this.user.save()

      await this.setupPush()

      this.hideLoader()
      this.gotoDashboardPage()

    } catch (e) {
      this.log.warn('LoginPage', 'loginGithub() %s', e.message)
      this.hideLoader()

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

  gotoDashboardPage(): void {
    this.log.verbose('LoginPage', 'gotoDashboardPage()')

    this.navCtrl.setRoot(DashboardPage)
  }

  /**
   * Setup Push Service
   */
  async setupPush() {
    this.log.verbose('LoginPage', 'setupPush()')

    const pushToken = await this.push.register()
    await this.push.saveToken(pushToken)
    this.log.silly('LoginPage', 'setupPush() push token saved: %s', pushToken)

    this.push.rx.notification().subscribe((msg) => {
      this.log.silly('LoginPage', 'setupPush() notification received: %s - %s',
                                  msg.title, msg.text,
                    )
      alert(msg.title + ': ' + msg.text)
    })

    // do something with the push data
    // then call finish to let the OS know we are done
    // push.finish(function() {
    //     console.log("processing of push data is finished");
    // }, function() {
    //     console.log("something went wrong with push.finish for ID = " + data.additionalData.notId)
    // }, data.additionalData.notId);

  }
}
