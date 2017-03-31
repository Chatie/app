import { Component }      from '@angular/core'
import {
  Auth,
  User,
}                         from '@ionic/cloud-angular'
import { NavController }  from 'ionic-angular'

import { Brolog }         from 'brolog'

/*
  https://docs.ionic.io/services/auth/github-auth.html
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    private auth:     Auth,
    private log:      Brolog,
    private navCtrl:  NavController,
    private user:     User,
  ) {
    this.log.verbose('LoginPage', 'constructor()')

  }

  ionViewDidLoad() {
    this.log.verbose('LoginPage', 'ionViewDidLoad()')
  }

  async login() {
    this.log.verbose('LoginPage', 'login()')
    try {
      const authLoginResult = await this.auth.login('github')
      if (authLoginResult.signup) {
        this.log.verbose('LoginPage', 'login() new user signup for %s'
                                    , this.user.social.github.uid
                        )
      } else {
        this.log.verbose('LoginPage', 'login() returned user login for %s'
                                    , this.user.social.github.uid
                        )
      }

      this.log.silly('LoginPage', 'login() %s'
                                , JSON.stringify(this.user.social.github.data)
                    )

    } catch (e) {
      this.log.error('LoginPage', 'login() %s', e.message)
    }
  }

  logout() {
    this.log.verbose('LoginPage', 'logout()')
    this.auth.logout()
  }


}
