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
  // reorderArray,
}                           from 'ionic-angular'
import {
  // Observable,
  // Subscription,
}                           from 'rxjs/Rx'

import { Brolog }           from 'brolog'

import {
  Botie,
  BotieStore,
}                             from '@chatie/db'

import { BotieDetailsPage }   from '../botie-details/'

@IonicPage()
@Component({
  selector:         'page-botie-list',
  templateUrl:      'botie-list.html',
  changeDetection:  ChangeDetectionStrategy.OnPush,
})
export class BotieListPage implements OnInit, OnDestroy {
  // private hostieListSubscription: Subscription

  constructor(
    public botieStore:  BotieStore,
    public log:         Brolog,
    public navCtrl:     NavController,
    public navParams:   NavParams,
  ) {
    this.log.verbose('BotieListPage', 'constructor()')
  }

  public ngOnInit() {
    this.log.verbose('BotieListPage', 'ngOnInit()')

    // this.hostieListSubscription = this.hostieStore.hosties.subscribe(list => {
    //   this.log.silly('HostieListPage', 'ngOnInit() subscript list: %s', list)
    //   this.hostieList = list
    // })
  }

  public ionViewDidLoad() {
    this.log.verbose('BotieListPage', 'ionViewDidLoad()')
  }

  public ngOnDestroy() {
    this.log.verbose('BotieListPage', 'ngOnDestroy()')

    // this.hostieListSubscription.unsubscribe()
  }

  public gotoBotieDetail(botie: Botie, event: any) {
    this.log.verbose('BotieListPage', 'gotoBotieDetail({id:%s}, %s)', botie.id, event)
    this.navCtrl.push(BotieDetailsPage, {
      token: botie.id,
    })
  }

}
