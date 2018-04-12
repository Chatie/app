import { Component }    from '@angular/core'
import {
  IonicPage,
  NavController,
  NavParams,
}                       from 'ionic-angular'

import * as moment      from 'moment'

import { Brolog }       from 'brolog'

import {
  WechatyComponent,
  ScanInfo,
  UserInfo,
}                       from '@chatie/angular'

import {
  // Botie,
}                       from '@chatie/db'

interface WechatyEvent {
  type: 'scan' | 'login' | 'logout' | 'message' | 'error',
  time: string,
  data: string,
}

@IonicPage()
@Component({
  selector: 'page-botie-details',
  templateUrl: 'botie-details.html',
})
export class BotieDetailsPage {

  public token: string
  public messageList: string[]
  public scan: ScanInfo | null
  public user: UserInfo | null
  public counter: number

  public timestamp: string

  public eventList: WechatyEvent[]

  // private botie: Botie

  constructor(
    public log:       Brolog,
    public navCtrl:   NavController,
    public navParams: NavParams,
  ) {
    this.token = navParams.get('token')

    this.log.verbose('BotieDetails', 'constructor() with token:%s', this.token)
  }

  public ionViewDidLoad() {
    this.log.verbose('BotieDetails', 'ionViewDidLoad()')
  }

  public ngOnInit() {
    this.log.verbose('BotieDetailsPage', 'ngOnInit()')

    this.eventList    = []
    this.messageList  = []
    this.counter      = 0
  }

  public ngOnDestroy() {
    this.log.verbose('BotieDetailsPage', 'ngOnDestroy()')
  }

  public onMessage(msg: any) {
    this.log.verbose('BotieDetailsPage', 'onMessage(%s)', msg)
    this.messageList.push(msg)
    this.eventList.push({
      type: 'message',
      time: moment().format('LTS'),
      data: msg,
    })
  }
  public onHeartbeat(e: any) {
    this.log.silly('BotieDetailsPage', 'onHeartbeat(%s)', e)
    this.counter++
    this.timestamp = moment().format('LTS')
  }
  public onScan(scan: ScanInfo) {
    this.log.verbose('BotieDetailsPage', 'onScan(%d: %s)', scan.code, scan.url)
    this.scan = scan
    this.eventList.push({
      type: 'scan',
      time: moment().format('LTS'),
      data: scan.url,
    })
  }
  public onLogin(user: UserInfo) {
    this.log.verbose('BotieDetailsPage', 'onLogin(%s)', user.name)
    this.user = user
    this.scan = null
    this.eventList.push({
      type: 'login',
      time: moment().format('LTS'),
      data: user.name,
    })
  }
  public onLogout(e: UserInfo) {
    this.log.verbose('BotieDetailsPage', 'onLogout(%s)', e.name)
    this.user = null
    this.eventList.push({
      type: 'logout',
      time: moment().format('LTS'),
      data: e.name,
    })
  }
  public onError(e: any) {
    this.log.verbose('BotieDetailsPage', 'onError(%s)', e)
    this.eventList.push({
      type: 'error',
      time: moment().format('LTS'),
      data: e,
    })
  }

  public shutdown(wechaty: WechatyComponent) {
    this.log.verbose('BotieDetailsPage', 'shutdown()')
    this.scan = this.user = null
    wechaty.shutdown('by web bot component')
  }

  public eventToIcon(eventName: string): string {
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
