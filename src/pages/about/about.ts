import { Component }  from '@angular/core'
import {
  NavController,
  NavParams,
}                     from 'ionic-angular'

import { Brolog }     from 'brolog'

import { HelpPage }   from '../help/'
import { StatusPage } from '../status/'

const packageJson = require('../../package.json')

@Component({
  selector:     'page-about',
  templateUrl:  'about.html',
})
export class AboutPage {
  version: string = packageJson.version

  constructor(
    public log:       Brolog,
    public navCtrl:   NavController,
    public navParams: NavParams,
  ) {
    this.log.verbose('AboutPage', 'constructor()')
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
}
