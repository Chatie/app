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
}                   from '@angular/core'
import {
  Database,
}                   from '@ionic/cloud-angular'
import {
  Subscription,
}                   from 'rxjs'

import {
  Hostie,
  HostieStatus,
  HostieStore,
}                   from '@chatie/db'

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage implements OnInit, OnDestroy {
  private subscription: Subscription

  private hostieStore: HostieStore

  hostieList: Hostie[]  = []
  hostieActiveNum       = 0

  botieList       = [1, 2, 3]
  botieActiveNum  = 1

  constructor(
    private database: Database,
  ) {
    this.hostieStore = HostieStore.instance({
      database,
      log: null,
    })
  }

  ngOnInit() {
    this.subscription = this.hostieStore.hosties.subscribe(list => {
      this.hostieList       = list
      this.hostieActiveNum  = list.filter( l => l.status === HostieStatus.ONLINE )
                                  .length
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
