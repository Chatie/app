/**
 * Wechaty APP for Android & Ios
 * Your ChatBot Pocket Manager
 *
 * https://github.com/chatie/app
 * Zhuohuan LI <zixia@zixia.net>
 * License Apache-2.0
 */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
}                           from '@angular/core'

import {
  AlertController,
  NavController,
  NavParams,
}                           from 'ionic-angular'

import { Brolog }           from 'brolog'

import {
  Dockie,
  DockieStatus,
  DockieStore,
  DockieRuntime,
}                           from '@chatie/db'

import { HostieEditPage }   from '../dockie-edit/'

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
  hostie:       Dockie
  hostieStore:  DockieStore

  constructor(
    public alertCtrl:  AlertController,
    public log:        Brolog,
    public cdRef:      ChangeDetectorRef,
    public navCtrl:    NavController,
    public navParams:  NavParams,
  ) {
    this.log.verbose('HostieDetailsPage', 'constructor()')

    // If we navigated to this page, we will have an item available as a nav param
    this.hostie = navParams.get('hostie')
    this.log.silly('HostieDetailsPage', 'constructor() hostie id:%s', this.hostie.id)
  }

  online(): boolean {
    this.log.verbose('HostieDetailsPage', 'online()')
    return this.hostie.status === DockieStatus.ONLINE
  }

  uptime(): number {
    this.log.verbose('HostieDetailsPage', 'uptime()')
    return Date.now() - this.hostie.create_at
  }

  /**
   * http://ionicframework.com/docs/ionicons/
   */
  icon(): string {
    switch (this.hostie.runtime) {
      case DockieRuntime.UNKNOWN: return 'help'
      case DockieRuntime.DOCKER:  return 'cube'
      case DockieRuntime.LINUX:   return 'logo-tux'
      case DockieRuntime.WINDOWS: return 'logo-windows'
      case DockieRuntime.APPLE:   return 'logo-apple'
      default:                    return 'help'
    }
  }

  copy() {
    this.alertCtrl.create({
      title:    'Copy TOKEN',
      subTitle: 'Use this string as WECHATY_TOKEN',
      inputs: [
        {
          label: 'Token',
          name: 'TOKEN',
          placeholder: 'Token',
          value: this.hostie.token,
          disabled: true,
        },
      ],
      buttons:  ['Done'],
    }).present()
  }

  edit() {
    this.log.verbose('HostieDetailsPage', 'edit() hostie #%s', this.hostie.id)

    this.navCtrl.push(HostieEditPage, {
      hostie: this.hostie,
      /**
       * [SOLVED] Ionic2 navController pop with params
       * https://forum.ionicframework.com/t/solved-ionic2-navcontroller-pop-with-params/58104
       */
      notify: (savedHostie: Dockie) => {
        this.log.verbose('HostieDetailsPage', 'edit() done() %s',
                                              JSON.stringify(savedHostie),
                        )
        this.hostie = savedHostie
        this.cdRef.markForCheck()
      },
    })
  }

}
