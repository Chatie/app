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

import { DockieDetailsPage }  from '../dockie-details/'
import { DockieCreatePage }   from '../dockie-create/'

@Component({
  selector: 'dockie-list',
  templateUrl: 'dockie-list.html',
  changeDetection:  ChangeDetectionStrategy.OnPush,
})

export class DockieListPage implements OnInit, OnDestroy {
  // dockieList: Dockie[]
  dockieListSubscription: Subscription

  reordering = false

  constructor(
    public database:    Database,
    public dockieStore: DockieStore,
    public log:         Brolog,
    public navCtrl:     NavController,
    public navParams:   NavParams,
  ) {
    this.log.verbose('DockieListPage', 'constructor()')
  }

  ngOnInit() {
    this.log.verbose('DockieListPage', 'ngOnInit()')

    // this.dockieListSubscription = this.dockieStore.dockies.subscribe(list => {
    //   this.log.silly('DockieListPage', 'ngOnInit() subscript list: %s', list)
    //   this.dockieList = list
    // })
  }

  ngOnDestroy() {
    this.log.verbose('DockieListPage', 'ngOnDestroy()')

    // this.dockieListSubscription.unsubscribe()
  }

  gotoDockieDetail(dockie: Dockie, event: any) {
    this.log.verbose('DockieListPage', 'select(%s, %s)', dockie.id, event)
    this.navCtrl.push(DockieDetailsPage, {
      dockie,
    })
  }

  toggleReordering() {
    this.reordering = !this.reordering
  }

  reorder(indexes: number[]) {
    // this.dockieList = reorderArray(this.dockieList, indexes)
    // TODO save to backend
  }

  dockieIcon(dockie: Dockie) {
    this.log.verbose('DockieListPage', 'dockieIcon()')

    if (dockie.status === DockieStatus.ONLINE) {
      return 'ios-home'
    }
    return 'ios-home-outline'
  }

  trash(dockie: Dockie) {
    this.log.verbose('DockieListPage', 'trash(%s)', dockie.id)
    if (!dockie.id) {
      throw new Error('no dockie id')
    }
    this.dockieStore.remove(dockie.id)
  }

  add() {
    this.navCtrl.push(DockieCreatePage)
  }
}
