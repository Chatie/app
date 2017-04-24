/**
 * Wechaty APP for Android & Ios
 * Your ChatBot Pocket Manager
 *
 * https://github.com/wechaty/wechaty-ionic
 * Zhuohuan LI <zixia@zixia.net>
 * License Apache-2.0
 */
import {
  Component,
  Type,
  ViewChild,
}                   from '@angular/core'

import {
  Platform,
  MenuController,
  Nav,
}                   from 'ionic-angular'
import {
  StatusBar,
  Splashscreen,
}                   from 'ionic-native'

import { Brolog }   from 'brolog'

import { Auth }             from '../providers/auth'

import { BotieListPage }    from '../pages/botie-list/'
import { DashboardPage }    from '../pages/dashboard/'
import { DockieListPage }   from '../pages/dockie-list/'
import { FeedbackPage }     from '../pages/feedback/'
import { LoginPage }        from '../pages/login/'
import { SettingPage }      from '../pages/setting/'
// import { WelcomePage }    from '../pages/welcome/'

@Component({
  templateUrl: 'app.html',
})
export class ChatieApp {
  @ViewChild(Nav) nav: Nav

  // make HelloIonicPage the root (or first) page
  // rootPage: any = WelcomePage
  // rootPage: Type<Component> = DashboardPage
  rootPage: Type<Component> = LoginPage
  // rootPage: any = DockieCreatePage

  pages: Array<{
    title: string,
    icon: string,
    component: Type<Component>,
  }>

  constructor(
    public auth:      Auth,
    public log:       Brolog,
    public platform:  Platform,
    public menu:      MenuController,
  ) {
    this.initializeApp()

    // set our app's pages
    this.pages = [
      { title: 'Dashboard'  , icon: 'speedometer' , component: DashboardPage },
      // { title: 'Gifties'    , icon: 'school'      , component: GiftieListPage },
      // { title: 'Gifties'    , icon: 'flash'       , component: GiftieListPage },
      { title: 'Boties'     , icon: 'logo-android', component: BotieListPage },
      { title: 'Dockies'    , icon: 'home'        , component: DockieListPage },
      { title: 'Setting'    , icon: 'cog'         , component: SettingPage },
      { title: 'Feedback'   , icon: 'people'      , component: FeedbackPage },
    ]
  }

  async initializeApp() {
    await this.platform.ready()
    // Okay, so the platform is ready and our plugins are available.
    // Here you can do any higher level native things you might need.

    StatusBar.styleDefault()
    Splashscreen.hide()

    /**
     * https://www.raymondcamden.com/2016/11/04/an-example-of-the-ionic-auth-service-with-ionic-2
     */
    if (this.auth.valid) {
      this.rootPage = DashboardPage

      // XXX: do we need to call startupTokenRefresh() at here?
      // consider to move it to Auth Provider. 201704
      this.auth.startupTokenRefresh()
    } else {
      this.rootPage = LoginPage
    }

    // Schedule a token refresh on app start up
  }

  openPage(page: any) {
    this.log.verbose('ChatieApp', 'openPage(%s)', page.title)

    // close the menu when clicking a link from the menu
    this.menu.close()
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component)
  }
}
