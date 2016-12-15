import { NgModule, ErrorHandler } from '@angular/core'
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular'
import { MyApp } from './app.component'

import { DashboardPage }      from '../pages/dashboard/'
import { HostieDetailsPage }  from '../pages/hostie-details/'
import { HostieListPage }     from '../pages/hostie-list/'
import { WelcomePage }        from '../pages/welcome/'

import { HostieStore }        from '../providers/hostie-store'
import { HostieBackend }      from '../providers/hostie-backend'

@NgModule({
  declarations: [
    MyApp,
    DashboardPage,
    HostieDetailsPage,
    HostieListPage,
    WelcomePage,
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
    WelcomePage,
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HostieStore,
    HostieBackend,
  ],
})

export class AppModule {}
