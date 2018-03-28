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
  Injectable,
  Injector,
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

// These are all imports required for Pro Client with Monitoring & Deploy,
// feel free to merge into existing imports above.
import { Pro }            from '@ionic/pro'
import { StatusBar }      from '@ionic-native/status-bar'
import { SplashScreen }   from '@ionic-native/splash-screen'

import {
  JWT_OPTIONS,
  JwtModule,
  JwtModuleOptions,
}                           from '@auth0/angular-jwt'
import { HttpClientModule } from '@angular/common/http'

import { Brolog }         from 'brolog'

import { WechatyModule }  from '@chatie/angular'
import {
  Db,
  DbOptions,
  HostieStore,
}                         from '@chatie/db'

import { Auth }           from '../providers/auth'

import {
  VERSION,
  log,
}                         from '../config'

import { ChatieApp }      from './app.component'

const { app_id } = require('../../ionic.config.json')
Pro.init(app_id, {
  appVersion: VERSION,
})

@Injectable()
export class ProErrorHandler implements ErrorHandler {
  private ionicErrorHandler: IonicErrorHandler

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler)
    } catch (e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
      throw e
    }
  }

  public handleError(err: any): void {
    Pro.monitoring.handleNewError(err)
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    this.ionicErrorHandler.handleError(err)
  }
}

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
 * << Pages >>
 */
import { AboutPageModule }          from '../pages/about/'
import { BotieListPageModule }      from '../pages/botie-list/'
import { BotieDetailsPageModule }   from '../pages/botie-details/'
import { DashboardPageModule }      from '../pages/dashboard/'
import { FeedbackPageModule }       from '../pages/feedback/'
import { GiftieListPageModule }     from '../pages/giftie-list/'
import { HelpPageModule }           from '../pages/help/'
import { HostieDetailsPageModule }  from '../pages/hostie-details/'
import { HostieEditPageModule }     from '../pages/hostie-edit/'
import { HostieListPageModule }     from '../pages/hostie-list/'
import { HostieCreatePageModule }   from '../pages/hostie-create/'
import { LoginPageModule }          from '../pages/login/'
import { LogoutPageModule }         from '../pages/logout/'
import { SettingPageModule }        from '../pages/setting/'
import { StatusPageModule }         from '../pages/status/'
import { UnlockPageModule }         from '../pages/unlock/'
import { WelcomePageModule }        from '../pages/welcome/'

/**
 *
 * Angular DEPENDENCY INJECTION - Factory Provider
 * https://angular.io/docs/ts/latest/guide/dependency-injection.html#!#factory-provider
 */
export function dbFactory(
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
export function hostieStoreFactory(db: Db) {
  return new HostieStore(db)
}

export function configFactory(
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
    // << Pages >>
    // BotieListPage,
    // BotieDetailsPage,
    // DashboardPage,
    // FeedbackPage,
    // GiftieListPage,
    // HelpPage,
    // HostieCreatePage,
    // HostieDetailsPage,
    // HostieEditPage,
    // HostieListPage,
    // LoginPage,
    // LogoutPage,
    // SettingPage,
    // StatusPage,
    // UnlockPage,
    // WelcomePage,
  ],
  imports: [
    // << Page Modules >>
    AboutPageModule,
    BrowserModule,
    BotieDetailsPageModule,
    BotieListPageModule,
    DashboardPageModule,
    FeedbackPageModule,
    GiftieListPageModule,
    HelpPageModule,
    HostieCreatePageModule,
    HostieDetailsPageModule,
    HostieEditPageModule,
    HostieListPageModule,
    LoginPageModule,
    LogoutPageModule,
    SettingPageModule,
    StatusPageModule,
    UnlockPageModule,
    WelcomePageModule,
    // Others
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
    WechatyModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ChatieApp,
    // << Pages >>
    // BotieDetailsPage,
    // BotieListPage,
    // DashboardPage,
    // FeedbackPage,
    // GiftieListPage,
    // HelpPage,
    // HostieCreatePage,
    // HostieDetailsPage,
    // HostieEditPage,
    // HostieListPage,
    // LoginPage,
    // LogoutPage,
    // SettingPage,
    // StatusPage,
    // UnlockPage,
    // WelcomePage,
  ],
  providers: [
    Auth,
    IonicErrorHandler,
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
      useClass:     ProErrorHandler,
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
