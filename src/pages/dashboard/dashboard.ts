/**
 * Wechaty APP for Android & Ios
 * Your ChatBot Pocket Manager
 *
 * https://github.com/wechaty/wechaty-ionic
 * Zhuohuan LI <zixia@zixia.net>
 * License Apache-2.0
 */
import {
  Component,
  OnInit,
  OnDestroy,
}                         from '@angular/core'
import { NavController }  from 'ionic-angular'
import {
  Database,
}                         from '@ionic/cloud-angular'
import {
  Subscription,
}                         from 'rxjs'

import { Brolog }         from 'brolog'

import {
  Dockie,
  DockieStatus,
  DockieStore,
}                         from '@chatie/db'

import { DockieListPage } from '../hostie-list/'
import { BotieListPage }  from '../botie-list/'

@Component({
  selector:     'page-dashboard',
  templateUrl:  'dashboard.html',
})
export class DashboardPage implements OnInit, OnDestroy {
  private subscription: Subscription

  private dockieStore: DockieStore

  dockieList: Dockie[]  = []
  dockieActiveNum       = 0

  botieList       = [1, 2, 3]
  botieActiveNum  = 1

  constructor(
    public log:      Brolog,
    public database: Database,
    public navCtrl:  NavController,
  ) {
    this.log.verbose('DashboardPage', 'constructor()')
    this.dockieStore = DockieStore.instance({
      database: database,
      log,
    })
  }

  ngOnInit() {
    this.log.verbose('DashboardPage', 'ngOnInit()')
    this.subscription = this.dockieStore.dockies.subscribe(list => {
      this.dockieList       = list
      this.dockieActiveNum  = list.filter( l => l.status === DockieStatus.ONLINE )
                                  .length
    })
  }

  ngOnDestroy() {
    this.log.verbose('DashboardPage', 'ngOnDestroy()')
    this.subscription.unsubscribe()
  }

  gotoHostieListPage() {
    this.navCtrl.push(DockieListPage)
  }

  gotoBotieListPage() {
    this.navCtrl.push(BotieListPage)
  }

}
