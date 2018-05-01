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
  Subscription,
}                           from 'rxjs/Rx'

import { Brolog }           from 'brolog'

import {
  Botie,
  BotieStore,
}                             from '@chatie/db'

import { BotieCreatePage }    from '../botie-create/'
import { BotieDetailsPage }   from '../botie-details/'

@IonicPage()
@Component({
  selector:         'page-botie-list',
  templateUrl:      'botie-list.html',
  changeDetection:  ChangeDetectionStrategy.OnPush,
})
export class BotieListPage implements OnInit, OnDestroy {
  private botieListSubscription?: Subscription

  public botieList: Botie[]

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

    this.botieListSubscription = this.botieStore.itemList.subscribe(list => {
      this.log.silly('BotieListPage', 'ngOnInit() this.botieStore.itemList.subscript() list.length=%d', list.length)
      this.botieList = list
    })
  }

  public ngOnDestroy() {
    this.log.verbose('BotieListPage', 'ngOnDestroy()')

    if (this.botieListSubscription) {
      this.botieListSubscription.unsubscribe()
      this.botieListSubscription = undefined
    }
  }

  public ionViewDidLoad() {
    this.log.verbose('BotieListPage', 'ionViewDidLoad()')
  }

  public gotoBotieDetail(botie: Botie, event: any) {
    this.log.verbose('BotieListPage', 'gotoBotieDetail({id:%s}, %s)', botie.id, event)

    this.navCtrl.push(BotieDetailsPage, {
      token: 'blinder-docker',
    })
  }

  public async trash(botie: Botie): Promise<void> {
    this.log.verbose('BotieListPage', 'trash(%s)', botie.id)
    if (!botie.id) {
      throw new Error('no botie id')
    }
    await this.botieStore.delete(botie.id)
  }

  public add() {
    this.navCtrl.push(BotieCreatePage)
  }
}
