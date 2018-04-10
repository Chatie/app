/**
 * Chatie APP for Android & Ios & SPA
 * Your ChatBot Pocket Manager
 *
 * https://github.com/chatie/app
 * Huan LI <zixia@zixia.net>
 * License Apache-2.0
 */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
}                           from '@angular/core'

import {
  AlertController,
  IonicPage,
  NavController,
  NavParams,
}                           from 'ionic-angular'

import { Brolog }           from 'brolog'

import {
  Hostie,
  HostieStore,
  Status,
  Platform,
}                           from '@chatie/db'

import { HostieEditPage }   from '../hostie-edit/'

@IonicPage()
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
  public hostie:       Hostie
  public hostieStore:  HostieStore

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

  public online(): boolean {
    this.log.verbose('HostieDetailsPage', 'online()')
    return this.hostie.status === Status.ON
  }

  public uptime(): number {
    this.log.verbose('HostieDetailsPage', 'uptime()')
    return Date.now() - 0 // FIXME
  }

  /**
   * http://ionicframework.com/docs/ionicons/
   */
  public icon(): string {
    switch (this.hostie.platform) {
      case Platform.UNKNOWN:  return 'help'
      case Platform.DOCKER:   return 'cube'
      case Platform.LINUX:    return 'logo-tux'
      case Platform.WIN32:    return 'logo-windows'
      case Platform.DARWIN:   return 'logo-apple'
      default:                return 'help'
    }
  }

  public copy() {
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

  public edit() {
    this.log.verbose('HostieDetailsPage', 'edit() hostie #%s', this.hostie.id)

    this.navCtrl.push(HostieEditPage, {
      hostie: this.hostie,
      /**
       * [SOLVED] Ionic2 navController pop with params
       * https://forum.ionicframework.com/t/solved-ionic2-navcontroller-pop-with-params/58104
       */
      notify: (savedHostie: Hostie) => {
        this.log.verbose('HostieDetailsPage', 'edit() done() %s',
                                              JSON.stringify(savedHostie),
                        )
        this.hostie = savedHostie
        this.cdRef.markForCheck()
      },
    })
  }

}
