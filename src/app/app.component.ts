/**
 * Chatie APP for Android & Ios & SPA
 * Your ChatBot Pocket Manager
 *
 * https://github.com/chatie/app
 * Huan LI <zixia@zixia.net>
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
}                   from '@ionic-native/status-bar'
import {
  SplashScreen,
}                   from '@ionic-native/splash-screen'
import { Brolog }   from 'brolog'

// import { Auth }             from '../providers/auth'

// import { BotieListPage }    from '../pages/botie-list/'
import { DashboardPage }    from '../pages/dashboard/'
// import { HostieListPage }   from '../pages/hostie-list/'
// import { FeedbackPage }     from '../pages/feedback/'
// import { LoginPage }        from '../pages/login/'
// import { SettingPage }      from '../pages/setting/'
// import { WelcomePage }    from '../pages/welcome/'

// Week Type Detection of TypeScript 2.4
// https://blog.mariusschulz.com/2017/12/01/typescript-2-4-weak-type-detection

@Component({
  templateUrl: 'app.html',
})
export class ChatieApp {
  @ViewChild(Nav) private nav: Nav

  public rootPage: any = DashboardPage

  public pages: Array<{
    title:      string,
    icon:       string,
    component:  any,
  }>

  constructor(
    // public auth:      Auth,
    public log:       Brolog,
    public platform:  Platform,
    public statusBar:     StatusBar,
    public splashScreen:  SplashScreen,
    public menu:      MenuController,
  ) {
    console.log(log)
    console.log(this.log)
    this.log.verbose('ChatieApp', 'constructor()')

    this.initializeApp()

    // set our app's pages
    this.pages = [
      { title: 'Dashboard'  , icon: 'speedometer' , component: DashboardPage },
      // { title: 'Gifties'    , icon: 'school'      , component: GiftieListPage },
      // { title: 'Gifties'    , icon: 'flash'       , component: GiftieListPage },
      // { title: 'Boties'     , icon: 'logo-android', component: BotieListPage },
      // { title: 'Hosties'    , icon: 'home'        , component: HostieListPage },
      // { title: 'Setting'    , icon: 'cog'         , component: SettingPage },
      // { title: 'Feedback'   , icon: 'people'      , component: FeedbackPage },
    ]
  }

  public async initializeApp() {
    this.log.verbose('ChatieApp', 'initializeApp()')

    const readySource = await this.platform.ready()

    this.log.silly('ChatieApp', 'initializeApp() platform.ready() return %s', readySource)

    // Okay, so the platform is ready and our plugins are available.
    // Here you can do any higher level native things you might need.

    // this.auth.valid.subscribe(valid => {
      // this.setupPush(valid)
    // })

    this.statusBar.styleDefault()
    this.splashScreen.hide()
     /**
      * https://www.raymondcamden.com/2016/11/04/an-example-of-the-ionic-auth-service-with-ionic-2
      */
    // if (this.auth.snapshot.valid) {
    //   this.rootPage = DashboardPage

    //   // XXX: do we need to call startupTokenRefresh() at here?
    //   // consider to move it to Auth Provider. 201704
    //   this.auth.startupTokenRefresh()
    // } else {
    //   this.rootPage = LoginPage
    // }

    // Schedule a token refresh on app start up

    return readySource
  }

  public openPage(page: any) {
    this.log.verbose('ChatieApp', 'openPage(%s)', page.title)

    // close the menu when clicking a link from the menu
    this.menu.close()

    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component)
  }

  // /**
  //  * Setup Push Service
  //  */
  // async setupPush(push = true): Promise<void> {
  //   this.log.verbose('ChatieApp', 'setupPush(%s)', push)

  //   try {
  //     if (push) {
  //       const pushToken = await this.push.register()
  //       await this.push.saveToken(pushToken)
  //       this.log.silly('ChatieApp', 'setupPush() push token saved: %s', pushToken)

  //       this.pushSubscription = this.push.rx.notification().subscribe(msg => {
  //         this.onPush(msg)
  //       })
  //     } else {
  //       if (this.pushSubscription) {
  //         this.pushSubscription.unsubscribe()
  //         this.pushSubscription = null
  //       }
  //       await this.push.unregister()
  //     }
  //   } catch (e) {
  //     this.log.warn('AppComponent', 'setupPush() exception:%s', e.message)
  //   }

  //   // do something with the push data
  //   // then call finish to let the OS know we are done
  //   // push.finish(function() {
  //   //     console.log("processing of push data is finished");
  //   // }, function() {
  //   //     console.log("something went wrong with push.finish for ID = " + data.additionalData.notId)
  //   // }, data.additionalData.notId);

  // }

  // onPush(msg: IPushMessage): void {
  //   this.log.verbose('ChatieApp', 'onPush({title:%s,...})', msg.title)
  //   alert(msg.title + ': ' + msg.text)
  // }
}
