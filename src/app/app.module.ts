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
  APP_INITIALIZER,
  ErrorHandler,
  NgModule,
}                         from '@angular/core'
import {
  IonicStorageModule,
  Storage,
}                         from '@ionic/storage'

import {
  IonicApp,
  IonicModule,
  IonicErrorHandler,
}                         from 'ionic-angular'

// import { Http }           from '@angular/http'

// import { WechatyModule }  from '@chatie/angular'

import { Brolog }         from 'brolog'

import { StatusBar }      from '@ionic-native/status-bar'
import { SplashScreen }   from '@ionic-native/splash-screen'
import {
  Db,
  DbOptions,
  HostieStore,
}                         from '@chatie/db'

import {
  JWT_OPTIONS,
  JwtModule,
  JwtModuleOptions,
}                           from '@auth0/angular-jwt'
import { HttpClientModule } from '@angular/common/http'

import { log }      from '../config'

import { Auth }           from '../providers/auth'
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
  auth:   Auth,
  brolog: Brolog,
) {
  const dbOptions: DbOptions = {
    log: brolog,
  }

  const db = new Db(dbOptions)

  // auth.token.subscribe(token => db.setToken(token))

  // // auth.profile.subscribe( ({email}) => db.setToken(email!))

  return db
}
function hostieStoreFactory(db: Db) {
  return new HostieStore(db)
}

function configFactory(
  db: Db,
) {
  return async () => {
    // await db.open()
  }
}

export function jwtOptionsFactory(storage: Storage) {
  const jwtOptions: JwtModuleOptions = {
    config: {
      tokenGetter: () => {
        return storage.get('access_token')
      },
      whitelistedDomains: [
        'localhost:3001',
        'chatie.io',
      ],
      blacklistedRoutes: ['localhost:3001/auth/'],
      throwNoTokenError: false,
      skipWhenExpired: true,
    },
  }

  return jwtOptions.config
}

@NgModule({
  declarations: [
    ChatieApp,
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
    HttpClientModule,
    IonicModule.forRoot(ChatieApp),
    IonicStorageModule.forRoot(),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide:    JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps:       [Storage],
      },
    }),
    // WechatyModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ChatieApp,
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
    Auth,
    StatusBar,
    SplashScreen,
    {
      provide:      Brolog,
      useValue:     log,
    },
    {
      provide:      Db,
      useFactory:   dbFactory,
      deps:         [Auth, Brolog],
    },
    {
      provide:      HostieStore,
      useFactory:   hostieStoreFactory,
      deps:         [Db],
    },
    {
      provide:      ErrorHandler,
      useClass:     IonicErrorHandler,
    },
    {
      provide:      APP_INITIALIZER,
      useFactory:   configFactory,
      deps:         [Db],
      multi:        true,
    },
  ],
})

export class AppModule {}
