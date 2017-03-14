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
  NavController,
  NavParams,
  reorderArray,
}                 from 'ionic-angular'
import {
  // Observable,
  Subscription,
}                 from 'rxjs'

import {
  Hostie,
  HostieStatus,
}                             from '@chatie/db'

import { HostieStore }        from '../../providers/hostie-store'

import { HostieDetailsPage }  from '../hostie-details/'
import { HostieCreatePage }   from '../hostie-create/'

@Component({
  selector: 'hostie-list',
  templateUrl: 'hostie-list.html',
})

export class HostieListPage implements OnInit, OnDestroy {
  hostieList: Hostie[]
  hostieListSubscription: Subscription

  reordering = false

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public hostieStore: HostieStore,
  ) {

  }

  ngOnInit() {
    this.hostieListSubscription = this.hostieStore.list().subscribe(list => {
      this.hostieList = list
    })
  }

  ngOnDestroy() {
    this.hostieListSubscription.unsubscribe()
  }

  select(hostie, event) {
    console.log(event)
    this.navCtrl.push(HostieDetailsPage, {
      hostie,
    })
  }

  toggleReordering() {
    this.reordering = !this.reordering
  }

  reorder(indexes) {
    this.hostieList = reorderArray(this.hostieList, indexes)
    // TODO save to backend
  }

  hostieIcon(hostie: Hostie) {
    if (hostie.status === HostieStatus.ONLINE) {
      return 'ios-cloud-upload'
    }
    return 'ios-cloud-upload-outline'
  }

  add() {
    this.navCtrl.push(HostieCreatePage)
  }
}
