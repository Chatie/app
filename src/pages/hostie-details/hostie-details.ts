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
  ChangeDetectionStrategy,
} from '@angular/core'

import { NavController, NavParams } from 'ionic-angular'

import { Brolog } from 'brolog'

import {
  Hostie,
  HostieStatus,
  HostieRuntime,
}                 from '@chatie/db'

@Component({
  selector:     'page-hostie-details',
  templateUrl:  'hostie-details.html',
  /**
   * http://stackoverflow.com/questions/34375624/angular-2-one-time-binding
   * https://angular.io/docs/ts/latest/api/core/index/ChangeDetectionStrategy-enum.html#!#OnPush-anchor
   * http://www.syntaxsuccess.com/viewarticle/change-detection-in-angular-2.0
   */
  changeDetection:  ChangeDetectionStrategy.OnPush,
})
export class HostieDetailsPage {
  hostie: Hostie

  constructor(
    private log:        Brolog,
    private navCtrl:    NavController,
    private navParams:  NavParams,
  ) {
    this.log.verbose('HostieDetailsPage', 'constructor()')

    // If we navigated to this page, we will have an item available as a nav param
    this.hostie = navParams.get('hostie')
    this.log.silly('HostieDetailsPage', 'constructor() hostie id:%s', this.hostie.id)
  }

  online(): boolean {
    this.log.verbose('HostieDetailsPage', 'online()')
    // return this.hostie.status === HostieStatus.ONLINE
    return this.hostie.status === HostieStatus.ONLINE
  }

  uptime(): number {
    this.log.verbose('HostieDetailsPage', 'uptime()')
    return Date.now() - this.hostie.createTime
  }

  /**
   * http://ionicframework.com/docs/ionicons/
   */
  icon(): string {
    const iconMap = {}
    iconMap[HostieRuntime.UNKNOWN]  = 'help'
    iconMap[HostieRuntime.DOCKER]   = 'cube'
    iconMap[HostieRuntime.LINUX]    = 'logo-tux'
    iconMap[HostieRuntime.WINDOWS]  = 'logo-windows'
    iconMap[HostieRuntime.APPLE]    = 'logo-apple'

    const iconName = iconMap[this.hostie.runtime]
                  || iconMap[HostieRuntime.UNKNOWN]

    return iconName
  }
}
