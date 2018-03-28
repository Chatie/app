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
import {
  Pro,
}                         from '@ionic/pro'
import {
  IonicPage,
  NavController,
  NavParams,
}                         from 'ionic-angular'
import {
  Subscription,
}                         from 'rxjs/Subscription'

import { Brolog }         from 'brolog'

import {
  Hostie,
  Status,
  HostieStore,
}                         from '@chatie/db'

// import { Auth }           from '../../providers/auth'

// import { BotieListPage }  from '../botie-list/'
import { HostieListPage } from '../hostie-list/'

@IonicPage()
@Component({
  selector:     'page-dashboard',
  templateUrl:  'dashboard.html',
})
export class DashboardPage implements OnInit, OnDestroy {
  private subscription: Subscription

    public hostieList: Hostie[]
    public hostieActiveNum

    // botieList       = [1, 2, 3]
    // botieActiveNum  = 1

  constructor(
    // public auth:          Auth,
    public hostieStore:   HostieStore,
    public log:           Brolog,
    public navCtrl:       NavController,
    public navParams:     NavParams,
  ) {
    this.log.verbose('DashboardPage', 'constructor()')

    Pro.monitoring.exception(new Error('test pro monitoring exception'))
    Pro.monitoring.log('This happens sometimes for level: error', { level: 'error' })
    try {
      Pro.monitoring.call(() => {
        throw new Error('test Pro.monitoring.call() error')
      })
    } catch (e) {
      console.log('call function exception catched')
    }
    const newFn = Pro.monitoring.wrap(() => {
      throw new Error('test Pro.monitoring.wrap newFn() error')
    })
    try {
      newFn()
    } catch (e) {
      console.log('call wrap func error')
    }

    this.hostieList       = []
    this.hostieActiveNum  = 0
  }

  public ionViewDidLoad() {
    this.log.verbose('DashboardPage', 'ionViewDidLoad()')
  }

  // https://devdactic.com/ionic-auth-guards/
  public ionViewCanEnter() {
    this.log.verbose('DashboardPage', 'ionViewCanEnter()')
    // return this.auth.snapshot.valid
  }

  // https://webcake.co/page-lifecycle-hooks-in-ionic-2/
  public ngOnInit() {
    this.log.verbose('DashboardPage', 'ngOnInit()')
    console.log(this.hostieStore)
    console.log(this.hostieStore.itemList)
    console.log(this.hostieStore.itemList.subscribe)

    this.subscription = this.hostieStore.itemList.subscribe(list => {
      this.log.verbose('DashboardPage', 'ngOnInit() hostieStore.itemList.subscribe()')
      this.hostieList       = list
      this.hostieActiveNum  = list
                              .filter( l => l.status === Status.ON )
                              .length
    })
  }

  public ngOnDestroy() {
    this.log.verbose('DashboardPage', 'ngOnDestroy()')
    this.subscription.unsubscribe()
  }

  public gotoHostieListPage() {
    this.log.verbose('DashboardPage', 'gotoHostieListPage()')
    this.navCtrl.push(HostieListPage)
  }

  public gotoBotieListPage() {
    this.log.verbose('DashboardPage', 'gotoBotieListPage()')
    // this.navCtrl.push(BotieListPage)
  }

  // gotoBotieDetailsPage() {
  //   this.log.verbose('DashboardPage', 'gotoBotieDetailsPage()')
  //   this.navCtrl.push(BotieDetailsPage)
  // }

}
