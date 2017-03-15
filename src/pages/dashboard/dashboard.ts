/**
 * Wechaty APP for Android & Ios
 * Your ChatBot Pocket Manager
 *
 * https://github.com/wechaty/wechaty-ionic
 * Zhuohuan LI <zixia@zixia.net>
 * License Apache-2.0
 */
import {
  Component,
  OnInit,
} from '@angular/core'

import {
  Hostie,
  HostieStatus
}                       from '../../models/hostie'
import { HostieStore }  from '../../providers/hostie-store'

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage implements OnInit {
  hostieList: Hostie[]  = []
  hostieActiveNum       = 0

  botieList       = [1,2,3]
  botieActiveNum  = 1

  constructor(
    private hostieStore: HostieStore,
  ) {

  }

  ngOnInit() {
    this.hostieStore.list().subscribe(list => {
      this.hostieList       = list
      this.hostieActiveNum  = list.filter( l => l.status === HostieStatus.Online )
                                  .length
    })
  }
}
