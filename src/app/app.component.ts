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
import {
  Platform,
  MenuController,
  Nav,
}                   from 'ionic-angular'
import {
  StatusBar,
  Splashscreen,
}                   from 'ionic-native'

import { DashboardPage }    from '../pages/dashboard/'

import { HostieListPage }   from '../pages/hostie-list/'
import { HostieCreatePage } from '../pages/hostie-create/'
// import { WelcomePage }    from '../pages/welcome/'

import { LoginPage }        from '../pages/login/'

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

  pages: Array<{title: string, component: any}>

  constructor(
    public platform: Platform,
    public menu: MenuController,
  ) {
    this.initializeApp()

    // set our app's pages
    this.pages = [
      { title: 'Dashboard'  , component: DashboardPage },
      // { title: 'Giftie List', component: GiftieListPage },
      // { title: 'Botie List' , component: BotieListPage },
      { title: 'Hostie List', component: HostieListPage },
      { title: 'Login'      , component: LoginPage },
    ]
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault()
      Splashscreen.hide()
    })
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close()
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component)
  }
}
