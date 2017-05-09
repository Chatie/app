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
  // Subscription,
}                           from 'rxjs/Subscription'

import { Brolog }           from 'brolog'

import {
  Dockie,
  DockieStore,
}                             from '@chatie/db'

import { BotieDetailsPage }   from '../botie-details/'

@Component({
  selector:         'page-botie-list',
  templateUrl:      'botie-list.html',
  changeDetection:  ChangeDetectionStrategy.OnPush,
})
export class BotieListPage implements OnInit, OnDestroy {
  // private dockieListSubscription: Subscription

  constructor(
    public database:    Database,
    public dockieStore: DockieStore,
    public log:         Brolog,
    public navCtrl:     NavController,
    public navParams:   NavParams,
  ) {
    this.log.verbose('BotieListPage', 'constructor()')
  }

  ngOnInit() {
    this.log.verbose('BotieListPage', 'ngOnInit()')

    // this.dockieListSubscription = this.dockieStore.dockies.subscribe(list => {
    //   this.log.silly('DockieListPage', 'ngOnInit() subscript list: %s', list)
    //   this.dockieList = list
    // })
  }

  ionViewDidLoad() {
    this.log.verbose('BotieListPage', 'ionViewDidLoad()')
  }

  ngOnDestroy() {
    this.log.verbose('BotieListPage', 'ngOnDestroy()')

    // this.dockieListSubscription.unsubscribe()
  }

  gotoBotieDetail(dockie: Dockie, event: any) {
    this.log.verbose('BotieListPage', 'gotoBotieDetail({id:%s}, %s)', dockie.id, event)
    this.navCtrl.push(BotieDetailsPage, {
      token: dockie.token,
    })
  }

}
