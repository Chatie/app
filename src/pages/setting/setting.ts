import { Component }  from '@angular/core'
import {
  IonicPage,
  NavController,
  NavParams,
}                     from 'ionic-angular'
import {
  Pro,
}                     from '@ionic/pro'

import { Brolog }     from 'brolog'

import { AboutPage }  from '../about/'
import { HelpPage }   from '../help/'
import { LogoutPage } from '../logout/'

@IonicPage()
@Component({
  selector:     'page-setting',
  templateUrl:  'setting.html',
})
export class SettingPage {
  public notificate = true

  constructor(
    public log:       Brolog,
    public navCtrl:   NavController,
    public navParams: NavParams,
  ) {
    this.log.verbose('SettingPage', 'constructor()')
  }

  public ionViewDidLoad() {
    this.log.verbose('SettingPage', 'ionViewDidLoad()')
  }

  public about() {
    this.navCtrl.push(AboutPage)
  }

  public help() {
    this.navCtrl.push(HelpPage)
  }

  public gotoLogoutPage() {
    this.navCtrl.push(LogoutPage)
  }

  public testMonitoring() {

    Pro.monitoring.exception(new Error('test Pro.monitoring.exception()'))
    Pro.monitoring.log('test Pro.monitoring.log() This happens sometimes for level: error', { level: 'error' })

    try {
      Pro.monitoring.call(() => {
        throw new Error('test Pro.monitoring.call() error')
      })
    } catch (e) {
      console.log('call function exception still be throwed to outside')
    }

    const newFn = Pro.monitoring.wrap(() => {
      throw new Error('test Pro.monitoring.wrap newFn() error')
    })
    try {
      newFn()
    } catch (e) {
      console.log('call wrap func error still be throwed to outside')
    }

  }
}
