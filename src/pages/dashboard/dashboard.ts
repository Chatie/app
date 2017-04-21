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
  Subscription,
}                         from 'rxjs'

import { Brolog }         from 'brolog'

import {
  Dockie,
  DockieStatus,
  DockieStore,
}                         from '@chatie/db'

import { Auth }           from '../../providers/auth'

import { DockieListPage } from '../dockie-list/'
import { BotieListPage }  from '../botie-list/'

@Component({
  selector:     'page-dashboard',
  templateUrl:  'dashboard.html',
})
export class DashboardPage implements OnInit, OnDestroy {
  private subscription: Subscription

  dockieList: Dockie[]  = []
  dockieActiveNum       = 0

  botieList       = [1, 2, 3]
  botieActiveNum  = 1

  constructor(
    public auth:          Auth,
    public dockieStore:   DockieStore,
    public log:           Brolog,
    public navCtrl:       NavController,
  ) {
    this.log.verbose('DashboardPage', 'constructor()')

    const user = auth.user
    if (!user) {
      throw new Error('no user login')
    }
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

  gotoDockieListPage() {
    this.navCtrl.push(DockieListPage)
  }

  gotoBotieListPage() {
    this.navCtrl.push(BotieListPage)
  }

}
