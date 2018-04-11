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
  // Storage,
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

import { HttpClientModule } from '@angular/common/http'

import {
  Brolog,
  log,
}                         from 'brolog'

import { WechatyModule }  from '@chatie/angular'
import {
  DbModule,
}                         from '@chatie/db'

import { AuthModule }     from 'auth-angular'

import {
  VERSION,
}                         from '../config'

import { ChatieApp }      from './app.component'

const { app_id } = require('../../ionic.config.json')
Pro.init(app_id, {
  appVersion: VERSION,
})

log.info('ChatieApp', 'v%s', VERSION)

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

export function appInitializerFactory() {
  log.verbose('AppModule', 'appInitializerFactory()')
  // Be careful: this will block the ui when starting the app
  return appInit

  async function appInit () {
    log.verbose('AppModule', 'appInitializerFactory() appInit()')
    // FIXME: Should not wait db open()
    // design better observable to chain the events.
    // await db.open()
  }
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

    AuthModule.forRoot(),
    DbModule.forRoot(),
    HttpClientModule,
    IonicModule.forRoot(ChatieApp),
    IonicStorageModule.forRoot(),
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
    IonicErrorHandler,
    StatusBar,
    SplashScreen,
    {
      provide:      Brolog,
      useValue:     log,
    },
    {
      provide:      ErrorHandler,
      useClass:     ProErrorHandler,
    },
    {
      provide:      APP_INITIALIZER,
      useFactory:   appInitializerFactory,
      deps:         [],
      multi:        true,
    },
  ],
})

export class AppModule {}
