import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'

import { DashboardPage } from '../dashboard/'

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})

export class WelcomePage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello WelcomePage Page')
  }

  goToDashboard(){
    this.navCtrl.setRoot(DashboardPage)
  }
}
