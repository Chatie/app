/**
 * 3 Common Rxjs Pitfalls that you might find while building Angular 2 Applications
 * http://blog.angular-university.io/angular-2-rxjs-common-pitfalls/
 */
import {
  Component,
  OnInit,
}                 from '@angular/core'
import {
  NavController,
  NavParams,
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
  selectedItem: any
  icons: string[]
  items: Array<{title: string, note: string, icon: string}>

  hostieList: Observable<Hostie[]>

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public hostieStore: HostieStore,
  ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for(let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  ngOnInit() {
    this.hostieList = this.hostieStore.hostieList
  }

  itemTapped(event, item) {
    this.navCtrl.push(HostieDetailsPage, {
      item: item
    });
  }
}
