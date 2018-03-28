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

  public deployChannel    = ''
  public isBeta           = false
  public downloadProgress = 0

  constructor(
    public log:       Brolog,
    public navCtrl:   NavController,
    public navParams: NavParams,
  ) {
    this.log.verbose('SettingPage', 'constructor()')
    this.checkChannel()
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

  /**
   * https://ionicframework.com/docs/pro/deploy/plugin-api.html
   */
  public async checkChannel() {
    try {
      const res = await Pro.deploy.info()
      this.deployChannel = res.channel || 'unknown(web?)'
      this.isBeta = (this.deployChannel === 'Beta')
    } catch (err) {
      // We encountered an error.
      // Here's how we would log it to Ionic Pro Monitoring while also catching:

      Pro.monitoring.exception(err)
    }
  }

  public async toggleBeta() {
    const config = {
      channel: (this.isBeta ? 'Beta' : 'Production')
    }

    try {
      await Pro.deploy.init(config)
      await this.checkChannel()
      await this.performAutomaticUpdate() // Alternatively, to customize how this works, use performManualUpdate()
    } catch (err) {
      // We encountered an error.
      // Here's how we would log it to Ionic Pro Monitoring while also catching:

      Pro.monitoring.exception(err)
    }

  }

  public async performAutomaticUpdate() {

    /*
      This code performs an entire Check, Download, Extract, Redirect flow for
      you so you don't have to program the entire flow yourself. This should
      work for a majority of use cases.
    */

    try {
      const resp = await Pro.deploy.checkAndApply(true, progress => {
          this.downloadProgress = progress
      })

      if (resp.update) {
        // We found an update, and are in process of redirecting you since you put true!
      } else {
        // No update available
      }
    } catch (err) {
      // We encountered an error.
      // Here's how we would log it to Ionic Pro Monitoring while also catching:

      Pro.monitoring.exception(err)
    }
  }

  public async performManualUpdate() {

    /*
      Here we are going through each manual step of the update process:
      Check, Download, Extract, and Redirect.
      This code is currently exactly the same as performAutomaticUpdate,
      but you could split it out to customize the flow.

      Ex: Check, Download, Extract when a user logs into your app,
        but Redirect when they logout for an app that is always running
        but used with multiple users (like at a doctors office).
    */

    try {
      const haveUpdate = await Pro.deploy.check()

      if (haveUpdate) {
        this.downloadProgress = 0

        await Pro.deploy.download(progress => {
          this.downloadProgress = progress
        })
        await Pro.deploy.extract()
        await Pro.deploy.redirect()
      }
    } catch (err) {
      // We encountered an error.
      // Here's how we would log it to Ionic Pro Monitoring while also catching:

      Pro.monitoring.exception(err)
    }

  }
}
