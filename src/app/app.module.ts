/**
 * Chatie APP for Android & Ios & Web
 * Your ChatBot Pocket Manager
 *
 * https://github.com/chatie/app
 * Huan LI <zixia@zixia.net>
 * License Apache-2.0
 */
import {
  ErrorHandler,
  NgModule,
}                         from '@angular/core'
import {
  CloudSettings,
  CloudModule,
  Database,
}                         from '@ionic/cloud-angular'

import {
  IonicApp,
  IonicModule,
  IonicErrorHandler,
}                         from 'ionic-angular'

import { AUTH_PROVIDERS } from 'angular2-jwt'

import { WechatyModule }  from '@chatie/angular'

import { Brolog }         from 'brolog'

import { DockieStore }    from '@chatie/db'

import { Auth }           from '../providers/auth'
import { ChatieApp }      from './app.component'

const { app_id } = require('../../ionic.config.json')

const cloudSettings: CloudSettings = {
  core: {
    app_id,  // : ionicConfig['app_id'],
  },
  push: {
    sender_id: '673602949542',
    pluginConfig: {
      ios: {
        badge: true,
        sound: true,
      },
      android: {
        iconColor: '#343434',
      },
    },
  },
  // 'database': {
  //   'authType': 'authenticated',
  // },
}

/**
 * Pages
 */
import { AboutPage }          from '../pages/about/'
import { BotieListPage }      from '../pages/botie-list/'
import { BotieDetailsPage }   from '../pages/botie-details/'
import { DashboardPage }      from '../pages/dashboard/'
import { FeedbackPage }       from '../pages/feedback/'
import { GiftieListPage }     from '../pages/giftie-list/'
import { HelpPage }           from '../pages/help/'
import { DockieDetailsPage }  from '../pages/dockie-details/'
import { DockieEditPage }     from '../pages/dockie-edit/'
import { DockieListPage }     from '../pages/dockie-list/'
import { DockieCreatePage }   from '../pages/dockie-create/'
import { LoginPage }          from '../pages/login/'
import { LogoutPage }         from '../pages/logout/'
import { SettingPage }        from '../pages/setting/'
import { StatusPage }         from '../pages/status/'
import { UnlockPage }         from '../pages/unlock/'
import { WelcomePage }        from '../pages/welcome/'

/**
 *
 * Angular DEPENDENCY INJECTION - Factory Provider
 * https://angular.io/docs/ts/latest/guide/dependency-injection.html#!#factory-provider
 */
function dockieStoreFactory(
  auth:     Auth,
  log:      Brolog,
  database: Database,
) {
  const dockieStore = DockieStore.instance({
    database,
    log,
  })
  auth.profile.filter(p => !!p)
              .subscribe(p => p && dockieStore.auth(p.email))

  return dockieStore
}

@NgModule({
  declarations: [
    ChatieApp,
    // Pages
    AboutPage,
    BotieListPage,
    BotieDetailsPage,
    DashboardPage,
    FeedbackPage,
    GiftieListPage,
    HelpPage,
    DockieCreatePage,
    DockieDetailsPage,
    DockieEditPage,
    DockieListPage,
    LoginPage,
    LogoutPage,
    SettingPage,
    StatusPage,
    UnlockPage,
    WelcomePage,
],
  imports: [
    CloudModule.forRoot(cloudSettings),
    IonicModule.forRoot(ChatieApp),
    WechatyModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ChatieApp,
    // Pages
    AboutPage,
    BotieListPage,
    BotieListPage,
    DashboardPage,
    FeedbackPage,
    GiftieListPage,
    HelpPage,
    DockieCreatePage,
    DockieDetailsPage,
    DockieEditPage,
    DockieListPage,
    LoginPage,
    LogoutPage,
    SettingPage,
    StatusPage,
    UnlockPage,
    WelcomePage,
  ],
  providers: [
    AUTH_PROVIDERS,
    Auth,
    {
      provide:      Brolog,
      useFactory()  { return Brolog.instance('silly') },
    },
    {
      provide:      DockieStore,
      useFactory:   dockieStoreFactory,
      deps:         [Auth, Brolog, Database], // be careful about the seq, must as same as the function define.
    },
    {
      provide:      ErrorHandler,
      useClass:     IonicErrorHandler,
    },
  ],
})

export class AppModule {}
