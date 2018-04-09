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
  IonicPage,
  NavController,
  NavParams,
  reorderArray,
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

@IonicPage()
@Component({
  selector:         'page-hostie-list',
  templateUrl:      'hostie-list.html',
  changeDetection:  ChangeDetectionStrategy.OnPush,
})

export class HostieListPage implements OnInit, OnDestroy {
  public hostieList: Hostie[]
  public hostieListSubscription: Subscription

  public reordering = false

  constructor(
    public log:         Brolog,
    public hostieStore: HostieStore,
    public navCtrl:     NavController,
    public navParams:   NavParams,
  ) {
    this.log.verbose('HostieListPage', 'constructor()')
  }

  public ngOnInit() {
    this.log.verbose('HostieListPage', 'ngOnInit()')

    this.hostieListSubscription = this.hostieStore.itemList.subscribe(list => {
      this.log.silly('HostieListPage', 'ngOnInit() subscript list: %s', list)
      this.hostieList = list
    })
  }

  public ngOnDestroy() {
    this.log.verbose('HostieListPage', 'ngOnDestroy()')

    if (this.hostieListSubscription) {
      this.hostieListSubscription.unsubscribe()
    }
  }

  public gotoHostieDetail(hostie: Hostie, event: any) {
    this.log.verbose('HostieListPage', 'select(%s, %s)', hostie.id, event)
    this.navCtrl.push(HostieDetailsPage, {
      hostie,
    })
  }

  public toggleReordering() {
    this.reordering = !this.reordering
  }

  public reorder(indexes: number[]) {
    this.hostieList = reorderArray(this.hostieList, {from: 0, to: 1})
    // TODO: save to backend
  }

  public hostieIcon(hostie: Hostie) {
    this.log.verbose('HostieListPage', 'hostieIcon()')

    if (hostie.status === Status.ON) {
      return 'ios-home'
    }
    return 'ios-home-outline'
  }

  public trash(hostie: Hostie) {
    this.log.verbose('HostieListPage', 'trash(%s)', hostie.id)
    if (!hostie.id) {
      throw new Error('no hostie id')
    }
    this.hostieStore.delete(hostie.id)
  }

  public add() {
    this.navCtrl.push(HostieCreatePage)
  }
}
