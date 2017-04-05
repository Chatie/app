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
}                     from '@angular/core'
import {
  CloudSettings,
  CloudModule,
}                     from '@ionic/cloud-angular'

import {
  IonicApp,
  IonicModule,
  IonicErrorHandler,
}                     from 'ionic-angular'

import {
  Brolog,
  LogLevel,
}                     from 'brolog'

import { AboutPage }          from '../pages/about/'
import { DashboardPage }      from '../pages/dashboard/'

import { HostieDetailsPage }  from '../pages/hostie-details/'
import { HostieListPage }     from '../pages/hostie-list/'
import { HostieCreatePage }   from '../pages/hostie-create/'
import { SettingPage }        from '../pages/setting/'

import { WelcomePage }        from '../pages/welcome/'
import { LoginPage }          from '../pages/login/'

import { ChatieApp }          from './app.component'

const ionicConfig = require('../../ionic.config.json')

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': ionicConfig['app_id'],
  },
  // 'database': {
  //   'authType': 'authenticated',
  // },
}

@NgModule({
  declarations: [
    ChatieApp,
    // Pages
    AboutPage,
    DashboardPage,
    HostieCreatePage,
    HostieDetailsPage,
    HostieListPage,
    LoginPage,
    SettingPage,
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
    DashboardPage,
    HostieCreatePage,
    HostieDetailsPage,
    HostieListPage,
    LoginPage,
    SettingPage,
    WelcomePage,
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: Brolog, useClass: Brolog('silly')},
  ],
})

export class AppModule {}
