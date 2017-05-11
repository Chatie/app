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
}                           from 'rxjs/Subscription'

import { Brolog }           from 'brolog'

import {
  Dockie,
  DockieStatus,
  DockieStore,
}                 from '@chatie/db'

import { HostieDetailsPage }  from '../dockie-details/'
import { HostieCreatePage }   from '../dockie-create/'

@Component({
  selector:         'page-hostie-list',
  templateUrl:      'hostie-list.html',
  changeDetection:  ChangeDetectionStrategy.OnPush,
})

export class HostieListPage implements OnInit, OnDestroy {
  // dockieList: Dockie[]
  hostieListSubscription: Subscription

  reordering = false

  constructor(
    public database:    Database,
    public hostieStore: DockieStore,
    public log:         Brolog,
    public navCtrl:     NavController,
    public navParams:   NavParams,
  ) {
    this.log.verbose('HostieListPage', 'constructor()')
  }

  ngOnInit() {
    this.log.verbose('HostieListPage', 'ngOnInit()')

    // this.dockieListSubscription = this.dockieStore.dockies.subscribe(list => {
    //   this.log.silly('HostieListPage', 'ngOnInit() subscript list: %s', list)
    //   this.dockieList = list
    // })
  }

  ngOnDestroy() {
    this.log.verbose('HostieListPage', 'ngOnDestroy()')

    // this.dockieListSubscription.unsubscribe()
  }

  gotoDockieDetail(hostie: Dockie, event: any) {
    this.log.verbose('HostieListPage', 'select(%s, %s)', hostie.id, event)
    this.navCtrl.push(HostieDetailsPage, {
      hostie,
    })
  }

  toggleReordering() {
    this.reordering = !this.reordering
  }

  reorder(indexes: number[]) {
    // this.dockieList = reorderArray(this.dockieList, indexes)
    // TODO save to backend
  }

  hostieIcon(hostie: Dockie) {
    this.log.verbose('HostieListPage', 'dockieIcon()')

    if (hostie.status === DockieStatus.ONLINE) {
      return 'ios-home'
    }
    return 'ios-home-outline'
  }

  trash(hostie: Dockie) {
    this.log.verbose('HostieListPage', 'trash(%s)', hostie.id)
    if (!hostie.id) {
      throw new Error('no dockie id')
    }
    this.hostieStore.remove(hostie.id)
  }

  add() {
    this.navCtrl.push(HostieCreatePage)
  }
}
