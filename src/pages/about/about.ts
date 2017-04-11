import { Component }  from '@angular/core'
import { Deploy }     from '@ionic/cloud-angular'
import {
  AlertController,
  Loading,
  LoadingController,
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
  loading: Loading | null = null

  constructor(
    public alertCtrl:   AlertController,
    public deploy:      Deploy,
    public log:         Brolog,
    public loadingCtrl: LoadingController,
    public navCtrl:     NavController,
    public navParams:   NavParams,
    public toastCtrl:   ToastController,
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

    if (this.loading) {
      return
    }

    const MAX_NUM = 7
    if (this.clickCounter <= MAX_NUM) {
      this.toastCtrl.create({
        message: (MAX_NUM - this.clickCounter).toString(),
        duration: 500,
        position: 'middle',
      }).present()

      this.clickCounter++
      return
    }

    this.deploy.channel = 'dev'
    this.showLoader()

    try {
      const hasUpdate = await this.deploy.check()

      if (!hasUpdate) {
        this.hideLoader()

        this.toastCtrl.create({
          message: 'You are cool!',
          duration: 1500,
          position: 'middle',
        })
        .present()

        return

      }

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

      this.hideLoader()

      this.log.silly('AboutPage', 'check() loading...')
      this.deploy.load()

    } catch (e) {
      this.log.warn('AboutPage', 'check() exception: %s', e.message)

      this.hideLoader()
      this.alertCtrl.create({
        title:    'Check Error',
        subTitle: 'Exception: ' + e.message,
        buttons:  ['OK'],
      }).present()
    }
  }

  showLoader(): void {
    this.log.verbose('AboutPage', 'showLoader()')

    this.loading = this.loadingCtrl.create({
      content: 'Loading...',
    })
    this.loading.present()
  }

  hideLoader(): void {
    this.log.verbose('AboutPage', 'hideLoader()')

    if (!this.loading) {
      return
    }
    this.loading.dismissAll()
    this.loading = null
  }

}
