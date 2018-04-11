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
  IonicPage,
  NavController,
  NavParams,
}                         from 'ionic-angular'
import {
  Subscription,
}                         from 'rxjs/Rx'

import { Auth }           from 'auth-angular'
import { Brolog }         from 'brolog'

import {
  Botie,
  BotieStore,
  // Giftie,
  GiftieStore,
  Status,
  Hostie,
  HostieStore,
}                         from '@chatie/db'

// import { BotieListPage }  from '../botie-list/'
import { HostieListPage } from '../hostie-list/'

@IonicPage()
@Component({
  selector:     'page-dashboard',
  templateUrl:  'dashboard.html',
})
export class DashboardPage implements OnInit, OnDestroy {
  private hostieSubscription?: Subscription

    public hostieList: Hostie[]
    public hostieOnlineNum: number

    public botieList: Botie[]
    public botieOnlineNum: number

  constructor(
    public auth:          Auth,
    public botieStore:    BotieStore,
    public hostieStore:   HostieStore,
    public giftieStore:   GiftieStore,
    public log:           Brolog,
    public navCtrl:       NavController,
    public navParams:     NavParams,
  ) {
    this.log.verbose('DashboardPage', 'constructor()')

    this.hostieList       = []
    this.hostieOnlineNum  = 0

    this.botieList        = []
    this.botieOnlineNum   = 0
  }

  public ionViewDidLoad() {
    this.log.verbose('DashboardPage', 'ionViewDidLoad()')
  }

  // https://devdactic.com/ionic-auth-guards/
  public ionViewCanEnter() {
    this.log.verbose('DashboardPage', 'ionViewCanEnter()')
    return this.auth.valid.first().toPromise()
  }

  // https://webcake.co/page-lifecycle-hooks-in-ionic-2/
  public ngOnInit() {
    this.log.verbose('DashboardPage', 'ngOnInit()')
    // console.log(this.hostieStore)
    // console.log(this.hostieStore.itemList)
    // console.log(this.hostieStore.itemList.subscribe)

    this.hostieSubscription = this.hostieStore.itemList.subscribe(list => {
      this.log.verbose('DashboardPage', 'ngOnInit() hostieStore.itemList.subscribe() list.length=%d', list.length)
      this.hostieList       = list
      this.hostieOnlineNum  = list
                              .filter( l => l.status === Status.ON )
                              .length
    })

    // this.botieSubscription = this.hostieStore.itemList.subscribe(list => {
    //   this.log.verbose('DashboardPage', 'ngOnInit() hostieStore.itemList.subscribe() list.length=%d', list.length)
    //   this.hostieList       = list
    //   this.hostieOnlineNum  = list
    //                           .filter( l => l.status === Status.ON )
    //                           .length
    // })

  }

  public ngOnDestroy() {
    this.log.verbose('DashboardPage', 'ngOnDestroy()')
    if (this.hostieSubscription) {
      this.hostieSubscription.unsubscribe()
    }
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
