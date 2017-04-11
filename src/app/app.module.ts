/**
 * Wechaty APP for Android & Ios
 * Your ChatBot Pocket Manager
 *
 * https://github.com/wechaty/wechaty-ionic
 * Zhuohuan LI <zixia@zixia.net>
 * License Apache-2.0
 */
import {
  NgModule,
  ErrorHandler,
}                         from '@angular/core'
import {
  CloudSettings,
  CloudModule,
}                         from '@ionic/cloud-angular'

import {
  IonicApp,
  IonicModule,
  IonicErrorHandler,
}                         from 'ionic-angular'

import { AUTH_PROVIDERS } from 'angular2-jwt'

import {
  Brolog,
}                         from 'brolog'

import { Auth }           from '../providers/auth'
import { ChatieApp }      from './app.component'

const ionicConfig = require('../../ionic.config.json')

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': ionicConfig['app_id'],
  },
  'push': {
    'sender_id': '673602949542',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true,
      },
      'android': {
        'iconColor': '#343434',
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
import { DashboardPage }      from '../pages/dashboard/'
import { FeedbackPage }       from '../pages/feedback/'
import { GiftieListPage }     from '../pages/giftie-list/'
import { HelpPage }           from '../pages/help/'
import { HostieDetailsPage }  from '../pages/hostie-details/'
import { HostieEditPage }     from '../pages/hostie-edit/'
import { HostieListPage }     from '../pages/hostie-list/'
import { HostieCreatePage }   from '../pages/hostie-create/'
import { LoginPage }          from '../pages/login/'
import { LogoutPage }         from '../pages/logout/'
import { SettingPage }        from '../pages/setting/'
import { StatusPage }         from '../pages/status/'
import { UnlockPage }         from '../pages/unlock/'
import { WelcomePage }        from '../pages/welcome/'

@NgModule({
  declarations: [
    ChatieApp,
    // Pages
    AboutPage,
    BotieListPage,
    DashboardPage,
    FeedbackPage,
    GiftieListPage,
    HelpPage,
    HostieCreatePage,
    HostieDetailsPage,
    HostieEditPage,
    HostieListPage,
    LoginPage,
    LogoutPage,
    SettingPage,
    StatusPage,
    UnlockPage,
    WelcomePage,
],
  imports: [
    IonicModule.forRoot(ChatieApp),
    CloudModule.forRoot(cloudSettings),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ChatieApp,
    // Pages
    AboutPage,
    BotieListPage,
    DashboardPage,
    FeedbackPage,
    GiftieListPage,
    HelpPage,
    HostieCreatePage,
    HostieDetailsPage,
    HostieEditPage,
    HostieListPage,
    LoginPage,
    LogoutPage,
    SettingPage,
    StatusPage,
    UnlockPage,
    WelcomePage,
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: Brolog, useClass: Brolog('silly')},
    AUTH_PROVIDERS,
    Auth,
  ],
})

export class AppModule {}
