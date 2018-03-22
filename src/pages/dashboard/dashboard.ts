/**
 * Chatie APP for Android & Ios & SPA
 * Your ChatBot Pocket Manager
 *
 * https://github.com/chatie/app
 * Huan LI <zixia@zixia.net>
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
}                         from 'rxjs/Subscription'

import { Brolog }         from 'brolog'

import {
  Hostie,
  Status,
  HostieStore,
}                         from '@chatie/db'

import { Auth }           from '../../providers/auth'

import { BotieListPage }  from '../botie-list/'
import { HostieListPage } from '../hostie-list/'

@Component({
  selector:     'page-dashboard',
  templateUrl:  'dashboard.html',
})
export class DashboardPage implements OnInit, OnDestroy {
  private subscription: Subscription

  hostieList: Hostie[]  = []
  hostieActiveNum       = 0

  botieList       = [1, 2, 3]
  botieActiveNum  = 1

  constructor(
    public auth:          Auth,
    public hostieStore:   HostieStore,
    public log:           Brolog,
    public navCtrl:       NavController,
  ) {
    this.log.verbose('DashboardPage', 'constructor()')
  }

  // https://devdactic.com/ionic-auth-guards/
  ionViewCanEnter() {
    this.log.verbose('DashboardPage', 'ionViewCanEnter()')
    return this.auth.snapshot.valid
  }

  // https://webcake.co/page-lifecycle-hooks-in-ionic-2/
  ngOnInit() {
    this.log.verbose('DashboardPage', 'ngOnInit()')
    this.subscription = this.hostieStore.itemList.subscribe(list => {
      this.hostieList       = list
      this.hostieActiveNum  = list.filter( l => l.status === Status.ON )
                                  .length
    })
  }

  ngOnDestroy() {
    this.log.verbose('DashboardPage', 'ngOnDestroy()')
    this.subscription.unsubscribe()
  }

  gotoHostieListPage() {
    this.log.verbose('DashboardPage', 'gotoHostieListPage()')
    this.navCtrl.push(HostieListPage)
  }

  gotoBotieListPage() {
    this.log.verbose('DashboardPage', 'gotoBotieListPage()')
    this.navCtrl.push(BotieListPage)
  }

  // gotoBotieDetailsPage() {
  //   this.log.verbose('DashboardPage', 'gotoBotieDetailsPage()')
  //   this.navCtrl.push(BotieDetailsPage)
  // }

}
