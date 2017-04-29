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
  IPushMessage,
  Push,
}                   from '@ionic/cloud-angular'

import {
  Platform,
  MenuController,
  Nav,
}                   from 'ionic-angular'
import {
  StatusBar,
  Splashscreen,
}                   from 'ionic-native'

import {
  Subscription,
}                   from 'rxjs/Subscription'
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

  private pushSubscription: Subscription | null = null

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
    public push:      Push,
    public menu:      MenuController,
  ) {
    this.log.verbose('ChatieApp', 'constructor()')

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
    this.log.verbose('ChatieApp', 'initializeApp()')

    const readySource = await this.platform.ready()

    this.log.silly('ChatieApp', 'initializeApp() platform.ready() return %s', readySource)

    // Okay, so the platform is ready and our plugins are available.
    // Here you can do any higher level native things you might need.

    this.auth.status.subscribe(valid => {
      this.setupPush(valid)
    })

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

    return readySource
  }

  openPage(page: any) {
    this.log.verbose('ChatieApp', 'openPage(%s)', page.title)

    // close the menu when clicking a link from the menu
    this.menu.close()
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component)
  }

  /**
   * Setup Push Service
   */
  async setupPush(push = true): Promise<void> {
    this.log.verbose('ChatieApp', 'setupPush(%s)', push)

    if (push) {
      const pushToken = await this.push.register()
      await this.push.saveToken(pushToken)
      this.log.silly('ChatieApp', 'setupPush() push token saved: %s', pushToken)

      this.pushSubscription = this.push.rx.notification().subscribe(msg => {
        this.onPush(msg)
      })
    } else {
      if (this.pushSubscription) {
        this.pushSubscription.unsubscribe()
        this.pushSubscription = null
      }
      await this.push.unregister()
    }

    // do something with the push data
    // then call finish to let the OS know we are done
    // push.finish(function() {
    //     console.log("processing of push data is finished");
    // }, function() {
    //     console.log("something went wrong with push.finish for ID = " + data.additionalData.notId)
    // }, data.additionalData.notId);

  }

  onPush(msg: IPushMessage): void {
    this.log.verbose('ChatieApp', 'onPush({title:%s,...})', msg.title)
    alert(msg.title + ': ' + msg.text)
  }
}
