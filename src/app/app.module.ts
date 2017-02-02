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
  IonicApp,
  IonicModule,
  IonicErrorHandler,
}                     from 'ionic-angular'

import { DashboardPage }      from '../pages/dashboard/'

import { HostieDetailsPage }  from '../pages/hostie-details/'
import { HostieListPage }     from '../pages/hostie-list/'
import { HostieCreatePage }   from '../pages/hostie-create/'

import { WelcomePage }        from '../pages/welcome/'
import { LoginPage }          from '../pages/login/'

import { HostieStore }        from '../providers/hostie-store'

import { MyApp }      from './app.component'

@NgModule({
  declarations: [
    MyApp,
    DashboardPage,
    HostieDetailsPage,
    HostieListPage,
    HostieCreatePage,
    WelcomePage,
    LoginPage,
],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DashboardPage,
    HostieDetailsPage,
    HostieListPage,
    HostieCreatePage,
    WelcomePage,
    LoginPage,
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HostieStore,
  ],
})

export class AppModule {}
