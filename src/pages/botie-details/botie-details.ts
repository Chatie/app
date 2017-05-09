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

interface WechatyEvent {
  type: 'scan' | 'login' | 'logout' | 'message' | 'error',
  time: string,
  data: string,
}

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
  counter = 0

  timestamp: string

  routeSub: Subscription
  authSub: Subscription

  eventList: WechatyEvent[] = [
    {
        type: 'scan',
        time: '10:01',
        data: 'fasdfas',
    },
    {
        type: 'login',
        time: '10:01',
        data: 'fasdfas',
    },
    {
        type: 'message',
        time: '10:01',
        data: 'fasdfas',
    },
    {
        type: 'logout',
        time: '10:01',
        data: 'fasdfas',
    },
    {
        type: 'error',
        time: '10:01',
        data: 'fasdfas',
    },
  ]

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
    this.counter++
    this.timestamp = new Date().toString()
    // this.messages.push(e)
  }
  onScan(scan: ScanInfo) {
    this.log.verbose('Botie', 'onScan(%d: %s)', scan.code, scan.url)
    this.scan = scan
    this.eventList.push({
      type: 'scan',
      time: new Date().toString(),
      data: scan.url
    })
  }
  onLogin(user: UserInfo) {
    this.log.verbose('Botie', 'onLogin(%s)', user.name)
    this.user = user
    this.scan = null
    this.eventList.push({
      type: 'login',
      time: new Date().toString(),
      data: user.name
    })
  }
  onLogout(e: UserInfo) {
    this.log.verbose('Botie', 'onLogout(%s)', e.name)
    this.user = null
    this.eventList.push({
      type: 'logout',
      time: new Date().toString(),
      data: e.name,
    })

  }

  shutdown(wechaty: WechatyComponent) {
    this.log.verbose('Botie', 'shutdown()')
    this.scan = this.user = null
    wechaty.shutdown('by web bot component')
  }

  eventToIcon(eventName: string): string {
    switch (eventName) {
      case 'scan':    return 'qr-scanner'
      case 'login':   return 'log-in'
      case 'logout':  return 'log-out'
      case 'message': return 'chatboxes'
      case 'error':   return 'alert'
      default:        return 'help'
    }
  }

}
