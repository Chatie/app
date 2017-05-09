import { Component }    from '@angular/core'
import {
  NavController,
  NavParams,
}                       from 'ionic-angular'

import { Subscription } from 'rxjs/Subscription'

import { Brolog }       from 'brolog'

import {
  WechatyComponent,
  ScanInfo,
  UserInfo,
}                       from '@chatie/angular'

@Component({
  selector: 'page-botie-details',
  templateUrl: 'botie-details.html',
})
export class BotieDetailsPage {

  id: number
  token: string | null
  messages: string[] = []
  scan: ScanInfo | null = null
  user: UserInfo | null = null
  hbCounter = 0

  routeSub: Subscription
  authSub: Subscription

  constructor(
    public log:       Brolog,
    public navCtrl:   NavController,
    public navParams: NavParams,
  ) {
    this.token = navParams.get('token')

    this.log.verbose('BotieDetails', 'constructor() with token:%s', this.token)
  }

  ionViewDidLoad() {
    this.log.verbose('BotieDetails', 'ionViewDidLoad()')
  }

  ngOnInit() {
    this.log.verbose('Botie', 'ngOnInit()')
  }

  ngOnDestroy() {
    this.log.verbose('Botie', 'ngOnDestroy()')
    if (this.routeSub) {
      this.routeSub.unsubscribe()
    }
  }

  onMessage(e: any) {
    this.log.verbose('Botie', 'onMessage(%s)', e)
    this.messages.push(e)
  }
  onHeartbeat(e: any) {
    this.log.silly('Botie', 'onHeartbeat(%s)', e)
    this.hbCounter++
    // this.messages.push(e)
  }
  onScan(scan: ScanInfo) {
    this.log.verbose('Botie', 'onScan(%d: %s)', scan.code, scan.url)
    this.scan = scan
  }
  onLogin(user: UserInfo) {
    this.log.verbose('Botie', 'onLogin(%s)', user.name)
    this.user = user
    this.scan = null
  }
  onLogout(e: UserInfo) {
    this.log.verbose('Botie', 'onLogout(%s)', e.name)
    this.user = null
  }

  reset(wechaty: WechatyComponent) {
    this.log.verbose('Botie', 'reset()')
    this.scan = this.user = null
    wechaty.reset('by web bot component')
  }
  shutdown(wechaty: WechatyComponent) {
    this.log.verbose('Botie', 'shutdown()')
    this.scan = this.user = null
    wechaty.shutdown('by web bot component')
  }

}
