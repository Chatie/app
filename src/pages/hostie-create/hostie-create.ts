import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the NewHostie page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-hostie-create',
  templateUrl: 'hostie-create.html'
})
export class HostieCreatePage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello HostieCreate Page');
  }

}
