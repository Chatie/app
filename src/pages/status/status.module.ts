import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatusPage } from './status';

@NgModule({
  declarations: [
    StatusPage,
  ],
  imports: [
    IonicPageModule.forChild(StatusPage),
  ],
})
export class StatusPageModule {}
