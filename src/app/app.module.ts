/**
 * Chatie APP for Android & Ios & Web
 * Your ChatBot Pocket Manager
 *
 * https://github.com/chatie/app
 * Huan LI <zixia@zixia.net>
 * License Apache-2.0
 */
import { BrowserModule } from '@angular/platform-browser'
import {
  ErrorHandler,
  NgModule,
}                         from '@angular/core'
// import {
//   CloudSettings,
//   CloudModule,
// }                         from '@ionic/cloud-angular'
// import { Storage }        from '@ionic/storage'

import {
  IonicApp,
  IonicModule,
  IonicErrorHandler,
}                         from 'ionic-angular'

import { HomePage } from '../pages/home/home'
import { ListPage } from '../pages/list/list'
// import { Http }           from '@angular/http'
// import {
  // AuthConfig,
  // AuthHttp,
// }                         from 'angular2-jwt'

// import { WechatyModule }  from '@chatie/angular'

import { Brolog }         from 'brolog'

import { StatusBar }      from '@ionic-native/status-bar'
import { SplashScreen }   from '@ionic-native/splash-screen'
import {
  Db,
  HostieStore,
}                         from '@chatie/db'

// import { Auth }           from '../providers/auth'
import { ChatieApp }      from './app.component'

// const { app_id } = require('../../ionic.config.json')

// const cloudSettings: CloudSettings = {
//   core: {
//     app_id,  // : ionicConfig['app_id'],
//   },
//   push: {
//     sender_id: '673602949542',
//     pluginConfig: {
//       ios: {
//         badge: true,
//         sound: true,
//       },
//       android: {
//         iconColor: '#343434',
//       },
//     },
//   },
//   // 'database': {
//   //   'authType': 'authenticated',
//   // },
// }

/**
 * Pages
 */
import { AboutPage }          from '../pages/about/'
// import { BotieListPage }      from '../pages/botie-list/'
// import { BotieDetailsPage }   from '../pages/botie-details/'
import { DashboardPage }      from '../pages/dashboard/'
// import { FeedbackPage }       from '../pages/feedback/'
// import { GiftieListPage }     from '../pages/giftie-list/'
import { HelpPage }           from '../pages/help/'
// import { HostieDetailsPage }  from '../pages/hostie-details/'
// import { HostieEditPage }     from '../pages/hostie-edit/'
// import { HostieListPage }     from '../pages/hostie-list/'
// import { HostieCreatePage }   from '../pages/hostie-create/'
// import { LoginPage }          from '../pages/login/'
// import { LogoutPage }         from '../pages/logout/'
// import { SettingPage }        from '../pages/setting/'
import { StatusPage }         from '../pages/status/'
// import { UnlockPage }         from '../pages/unlock/'
import { WelcomePage }        from '../pages/welcome/'

/**
 *
 * Angular DEPENDENCY INJECTION - Factory Provider
 * https://angular.io/docs/ts/latest/guide/dependency-injection.html#!#factory-provider
 */
function dbFactory(
  // auth: Auth,
  log:  Brolog,
) {
  const db = new Db({
    log,
  })

  db.open()
  // // auth.profile.subscribe( ({email}) => db.setToken(email!))

  return db
}

// https://github.com/auth0-samples/auth0-ionic2-samples/blob/master/01-Login/src/app/app.module.ts
// const storage = new Storage()
// export function getAuthHttp(http: Http) {
//   return new AuthHttp(new AuthConfig({
//     globalHeaders: [{'Accept': 'application/json'}],
//     tokenGetter: (() => storage.get('id_token')),
//   }), http);
// }

@NgModule({
  declarations: [
    ChatieApp,
    HomePage,
    ListPage,
    // Pages
    AboutPage,
    // BotieListPage,
    // BotieDetailsPage,
    DashboardPage,
    // FeedbackPage,
    // GiftieListPage,
    HelpPage,
    // HostieCreatePage,
    // HostieDetailsPage,
    // HostieEditPage,
    // HostieListPage,
    // LoginPage,
    // LogoutPage,
    // SettingPage,
    StatusPage,
    // UnlockPage,
    WelcomePage,
  ],
  imports: [
    BrowserModule,
    // CloudModule.forRoot(cloudSettings),
    IonicModule.forRoot(ChatieApp),
    // WechatyModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ChatieApp,
    HomePage,
    ListPage,
    // Pages
    AboutPage,
    // BotieDetailsPage,
    // BotieListPage,
    DashboardPage,
    // FeedbackPage,
    // GiftieListPage,
    HelpPage,
    // HostieCreatePage,
    // HostieDetailsPage,
    // HostieEditPage,
    // HostieListPage,
    // LoginPage,
    // LogoutPage,
    // SettingPage,
    StatusPage,
    // UnlockPage,
    WelcomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    // AuthHttp,
    // Auth,
    // {
    //   provide:      AuthHttp,
    //   useFactory:   getAuthHttp,
    //   deps:         [Http],
    // },

    {
      provide:      Brolog,
      useFactory()  { return Brolog.instance('silly') },
    },
    {
      provide:        Db,
      useFactory:     dbFactory,
      deps:           [Brolog],
    },
    {
      provide:            HostieStore,
      useFactory(db: Db)  { return new HostieStore(db).open() },
      deps:               [Db], // be careful about the seq, must as same as the function define.
    },
    {
      provide:      ErrorHandler,
      useClass:     IonicErrorHandler,
    },
  ],
})

export class AppModule {}
