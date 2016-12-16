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
}                 from '@angular/core'
import {
  NavController,
  NavParams,
  reorderArray,
}                 from 'ionic-angular'
import {
  Observable,
}                 from 'rxjs'

import { Hostie }             from '../../models/hostie'
import { HostieStore }        from '../../providers/hostie-store'

import { HostieDetailsPage }  from '../hostie-details/'

@Component({
  selector: 'hostie-list',
  templateUrl: 'hostie-list.html',
})
export class HostieListPage implements OnInit {
  private hostieList: Hostie[]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public hostieStore: HostieStore,
  ) {

  }

  ngOnInit() {
    this.hostieStore.list().subscribe(list => {
      this.hostieList = list
    })
  }

  select(hostie, event) {
    this.navCtrl.push(HostieDetailsPage, {
      hostie
    })
  }

  reorder(indexes) {
    this.hostieList = reorderArray(this.hostieList, indexes)
    // TODO save to backend
  }
}
