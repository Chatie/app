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

import { DockieEditPage }   from '../dockie-edit/'

@Component({
  selector:     'page-dockie-details',
  templateUrl:  'dockie-details.html',
  /**
   * http://stackoverflow.com/questions/34375624/angular-2-one-time-binding
   * https://angular.io/docs/ts/latest/api/core/index/ChangeDetectionStrategy-enum.html#!#OnPush-anchor
   * http://www.syntaxsuccess.com/viewarticle/change-detection-in-angular-2.0
   */
  changeDetection:  ChangeDetectionStrategy.OnPush,
})
export class DockieDetailsPage {
  dockie:       Dockie
  dockieStore:  DockieStore

  eventList: any[] = [
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
    public alertCtrl:  AlertController,
    public log:        Brolog,
    public cdRef:      ChangeDetectorRef,
    public navCtrl:    NavController,
    public navParams:  NavParams,
  ) {
    this.log.verbose('DockieDetailsPage', 'constructor()')

    // If we navigated to this page, we will have an item available as a nav param
    this.dockie = navParams.get('dockie')
    this.log.silly('DockieDetailsPage', 'constructor() dockie id:%s', this.dockie.id)
  }

  online(): boolean {
    this.log.verbose('DockieDetailsPage', 'online()')
    return this.dockie.status === DockieStatus.ONLINE
  }

  uptime(): number {
    this.log.verbose('DockieDetailsPage', 'uptime()')
    return Date.now() - this.dockie.create_at
  }

  /**
   * http://ionicframework.com/docs/ionicons/
   */
  icon(): string {
    switch (this.dockie.runtime) {
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
          value: this.dockie.token,
          disabled: true,
        },
      ],
      buttons:  ['Done'],
    }).present()
  }

  edit() {
    this.log.verbose('DockieDetailsPage', 'edit() dockie #%s', this.dockie.id)

    this.navCtrl.push(DockieEditPage, {
      dockie: this.dockie,
      /**
       * [SOLVED] Ionic2 navController pop with params
       * https://forum.ionicframework.com/t/solved-ionic2-navcontroller-pop-with-params/58104
       */
      notify: (savedDockie: Dockie) => {
        this.log.verbose('DockieDetailsPage', 'edit() done() %s',
                                              JSON.stringify(savedDockie),
                        )
        this.dockie = savedDockie
        this.cdRef.markForCheck()
      },
    })
  }

  eventToIcon(event: string): string {
    switch (event) {
      case 'scan':    return 'qr-scanner'
      case 'login':   return 'log-in'
      case 'logout':  return 'log-out'
      case 'message': return 'chatboxes'
      case 'error':   return 'alert'
      default:        return 'help'
    }
  }
}
