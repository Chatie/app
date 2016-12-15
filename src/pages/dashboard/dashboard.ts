import {
  Component,
  OnInit,
} from '@angular/core'

import { Hostie }       from '../../models/hostie'
import { HostieStore }  from '../../providers/hostie-store'

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage implements OnInit {
  hostieList: Hostie[] = []
  hostieTotalNum  = 0
  hostieActiveNum = 0

  botieList   = [1,2,3]
  activeBotieNum = 1

  constructor(
    private hostieStore: HostieStore,
  ) {

  }

  ngOnInit() {
    this.hostieStore.hostieList.subscribe(list => {
      this.hostieList     = list
      this.hostieTotalNum = list.length
    })
  }
}
