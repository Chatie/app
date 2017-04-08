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
  ViewChild,
}                   from '@angular/core'

import { Auth }     from '@ionic/cloud-angular'
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

import { DashboardPage }    from '../pages/dashboard/'

import { FeedbackPage }     from '../pages/feedback/'
import { GiftieListPage }   from '../pages/giftie-list/'
import { HostieListPage }   from '../pages/hostie-list/'
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
  // rootPage: any = DashboardPage
  rootPage: any = HostieListPage
  // rootPage: any = HostieCreatePage

  pages: Array<{
    title: string,
    icon: string,
    component: any,
  }>

  constructor(
    public auth:      Auth,
    public log:       Brolog,
    public platform:  Platform,
    public menu:      MenuController,
  ) {
    this.initializeApp()

    // // set our app's pages
    this.pages = [
      { title: 'Dashboard'  , icon: 'speedometer' , component: DashboardPage },
      { title: 'Gifties'    , icon: 'flash'       , component: GiftieListPage },
      // { title: 'Boties'     , icon: 'logo-android', component: BotieListPage },
      { title: 'Hosties'    , icon: 'home'        , component: HostieListPage },
      { title: 'Feedback'   , icon: 'people'      , component: FeedbackPage },
      { title: 'Setting'    , icon: 'cog'         , component: SettingPage },
    ]
  }

  async initializeApp() {
    await this.platform.ready()
    // Okay, so the platform is ready and our plugins are available.
    // Here you can do any higher level native things you might need.

    StatusBar.styleDefault()
    Splashscreen.hide()

    // https://www.raymondcamden.com/2016/11/04/an-example-of-the-ionic-auth-service-with-ionic-2
    if (this.auth.isAuthenticated()) {
      this.rootPage = DashboardPage
    } else {
      this.rootPage = LoginPage
    }

  }

  openPage(page) {
    this.log.verbose('ChatieApp', 'openPage(%s)', page)

    // close the menu when clicking a link from the menu
    this.menu.close()
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component)
  }
}
