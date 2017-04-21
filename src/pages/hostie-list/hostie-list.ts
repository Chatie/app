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
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
}                           from '@angular/core'
import {
  Database,
}                           from '@ionic/cloud-angular'
import {
  NavController,
  NavParams,
  // reorderArray,
}                           from 'ionic-angular'
import {
  // Observable,
  Subscription,
}                           from 'rxjs'

import { Brolog }           from 'brolog'

import {
  Dockie,
  DockieStatus,
  DockieStore,
}                 from '@chatie/db'

import { DockieDetailsPage }  from '../hostie-details/'
import { DockieCreatePage }   from '../hostie-create/'

@Component({
  selector: 'hostie-list',
  templateUrl: 'hostie-list.html',
  changeDetection:  ChangeDetectionStrategy.OnPush,
})

export class DockieListPage implements OnInit, OnDestroy {
  // hostieList: Hostie[]
  hostieListSubscription: Subscription

  private hostieStore: DockieStore

  reordering = false

  constructor(
    public database:  Database,
    public log:       Brolog,
    public navCtrl:   NavController,
    public navParams: NavParams,
  ) {
    this.log.verbose('HostieListPage', 'constructor()')
    this.hostieStore = DockieStore.instance({
      database: database,
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

  gotoHostieDetail(hostie: Dockie, event: any) {
    this.log.verbose('HostieListPage', 'select(%s, %s)', hostie.id, event)
    this.navCtrl.push(DockieDetailsPage, {
      hostie,
    })
  }

  toggleReordering() {
    this.reordering = !this.reordering
  }

  reorder(indexes: number[]) {
    // this.hostieList = reorderArray(this.hostieList, indexes)
    // TODO save to backend
  }

  hostieIcon(hostie: Dockie) {
    this.log.verbose('HostieListPage', 'hostieIcon()')

    if (hostie.status === DockieStatus.ONLINE) {
      return 'ios-home'
    }
    return 'ios-home-outline'
  }

  trash(hostie: Dockie) {
    this.log.verbose('HostieListPage', 'trash(%s)', hostie.id)
    if (!hostie.id) {
      throw new Error('no hostie id')
    }
    this.hostieStore.remove(hostie.id)
  }

  add() {
    this.navCtrl.push(DockieCreatePage)
  }
}
