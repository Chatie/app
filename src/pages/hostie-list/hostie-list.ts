/**
 * Wechaty APP for Android & Ios
 * Your ChatBot Pocket Manager
 *
 * https://github.com/wechaty/wechaty-ionic
 * Zhuohuan LI <zixia@zixia.net>
 * License Apache-2.0
 */

/**
 * An Introduction to Lists in Ionic 2
 * http://www.joshmorony.com/an-introduction-to-lists-in-ionic-2/
 *
 */
import {
  Component,
  OnInit,
  OnDestroy,
}                 from '@angular/core'
import {
  Database,
}                 from '@ionic/cloud-angular'
import {
  NavController,
  NavParams,
  reorderArray,
}                 from 'ionic-angular'
import {
  // Observable,
  Subscription,
}                 from 'rxjs'

import { Brolog } from 'brolog'

import {
  Hostie,
  HostieStatus,
  HostieStore,
}                 from '@chatie/db'

import { HostieDetailsPage }  from '../hostie-details/'
import { HostieCreatePage }   from '../hostie-create/'

@Component({
  selector: 'hostie-list',
  templateUrl: 'hostie-list.html',
})

export class HostieListPage implements OnInit, OnDestroy {
  // hostieList: Hostie[]
  hostieListSubscription: Subscription

  private hostieStore: HostieStore

  reordering = false

  constructor(
    private database:  Database,
    private log:       Brolog,
    private navCtrl:   NavController,
    private navParams: NavParams,
  ) {
    this.log.verbose('HostieListPage', 'constructor()')

    this.hostieStore = HostieStore.instance({
      database,
      log,
    })
  }

  ngOnInit() {
    this.log.verbose('HostieListPage', 'ngOnInit()')

    // this.hostieListSubscription = this.hostieStore.hosties.subscribe(list => {
    //   this.log.silly('HostieListPage', 'ngOnInit() subscript list: %s', list)
    //   this.hostieList = list
    // })
  }

  ngOnDestroy() {
    this.log.verbose('HostieListPage', 'ngOnDestroy()')

    // this.hostieListSubscription.unsubscribe()
  }

  select(hostie: Hostie, event) {
    this.log.verbose('HostieListPage', 'select(%s, %s)', hostie.id, event)
    this.navCtrl.push(HostieDetailsPage, {
      hostie,
    })
  }

  toggleReordering() {
    this.reordering = !this.reordering
  }

  reorder(indexes) {
    // this.hostieList = reorderArray(this.hostieList, indexes)
    // TODO save to backend
  }

  hostieIcon(hostie: Hostie) {
    this.log.verbose('HostieListPage', 'hostieIcon()')

    if (hostie.status === HostieStatus.ONLINE) {
      return 'ios-home'
    }
    return 'ios-home-outline'
  }

  trash(hostie: Hostie) {
    this.log.verbose('HostieListPage', 'trash(%s)', hostie.id)
    this.hostieStore.remove(hostie.id)
  }

  add() {
    this.navCtrl.push(HostieCreatePage)
  }
}
