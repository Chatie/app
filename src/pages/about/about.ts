import { Component }  from '@angular/core'
import { Deploy }     from '@ionic/cloud-angular'
import {
  AlertController,
  NavController,
  NavParams,
  ToastController,
}                     from 'ionic-angular'

import { Brolog }     from 'brolog'

import { HelpPage }   from '../help/'
import { StatusPage } from '../status/'

@Component({
  selector:     'page-about',
  templateUrl:  'about.html',
})
export class AboutPage {
  version = '0.0.0'
  clickCounter = 0

  constructor(
    public alertCtrl: AlertController,
    public deploy:    Deploy,
    public log:       Brolog,
    public navCtrl:   NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
  ) {
    this.log.verbose('AboutPage', 'constructor()')
    this.initVersion()
  }

  initVersion() {
    this.log.verbose('AboutPage', 'getVersion()')

    try {
      const packageJson = require('../../../package.json')
      this.version = packageJson.version
    } catch (e) {
      this.log.warn('AboutPage', 'getVersion() exception: %s', e.message)
    }
  }

  ionViewDidLoad() {
    this.log.verbose('AboutPage', 'ionViewDidLoad()')
  }

  help() {
    this.navCtrl.push(HelpPage)
  }

  status() {
    this.navCtrl.push(StatusPage)
  }

  async checkDeploy() {
    this.log.verbose('AboutPage', 'check() clickCounter=%s', this.clickCounter)

    if (this.clickCounter <= 3) {
      const toast = this.toastCtrl.create({
        message: (3 - this.clickCounter).toString(),
        duration: 500,
        position: 'middle',
      })
      toast.onDidDismiss(() => this.clickCounter++)
      toast.present()
      return
    }

    this.deploy.channel = 'dev'

    try {
      const hasUpdate = await this.deploy.check()
      if (hasUpdate) {
        this.log.silly('AboutPage', 'checkDeploy() found new update!')

        const metaData = this.deploy.getMetadata()
        this.log.silly('AboutPage', 'check() metaData of update: %s', JSON.stringify(metaData))

        this.log.silly('AboutPage', 'check() downloading...')
        await this.deploy.download()

        this.log.silly('AboutPage', 'check() extracting...')
        await this.deploy.extract()

        const snapshotList = await this.deploy.getSnapshots() as string[]
        this.log.silly('AboutPage', 'check() we has %s snapshots: %s',
                                    snapshotList.length,
                                    snapshotList.join(','),
                      )

        this.log.silly('AboutPage', 'check() loading...')
        this.deploy.load()

      }

    } catch (e) {
      this.log.warn('AboutPage', 'check() exception: %s', e.message)

      this.alertCtrl.create({
        title:    'Check Error',
        subTitle: 'Exception: ' + e.message,
        buttons:  ['OK'],
      }).present()
    }
  }

}
