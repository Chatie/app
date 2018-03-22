/**
 * Chatie APP for Android & Ios & SPA
 * Your ChatBot Pocket Manager
 *
 * https://github.com/chatie/app
 * Huan LI <zixia@zixia.net>
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
  Hostie,
  HostieStore,
  Status,
  // System,
}                           from '@chatie/db'

import { HostieDetailsPage }  from '../hostie-details/'
import { HostieCreatePage }   from '../hostie-create/'

@Component({
  selector:         'page-hostie-list',
  templateUrl:      'hostie-list.html',
  changeDetection:  ChangeDetectionStrategy.OnPush,
})

export class HostieListPage implements OnInit, OnDestroy {
  // hostieList: Hostie[]
  hostieListSubscription: Subscription

  reordering = false

  constructor(
    public hostieStore: HostieStore,
    public log:         Brolog,
    public navCtrl:     NavController,
    public navParams:   NavParams,
  ) {
    this.log.verbose('HostieListPage', 'constructor()')
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

  gotoHostieDetail(hostie: Hostie, event: any) {
    this.log.verbose('HostieListPage', 'select(%s, %s)', hostie.id, event)
    this.navCtrl.push(HostieDetailsPage, {
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

  hostieIcon(hostie: Hostie) {
    this.log.verbose('HostieListPage', 'hostieIcon()')

    if (hostie.status === Status.ON) {
      return 'ios-home'
    }
    return 'ios-home-outline'
  }

  trash(hostie: Hostie) {
    this.log.verbose('HostieListPage', 'trash(%s)', hostie.id)
    if (!hostie.id) {
      throw new Error('no hostie id')
    }
    this.hostieStore.delete(hostie.id)
  }

  add() {
    this.navCtrl.push(HostieCreatePage)
  }
}
