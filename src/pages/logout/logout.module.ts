import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LogoutPage } from './logout';

@NgModule({
  declarations: [
    LogoutPage,
  ],
  imports: [
    IonicPageModule.forChild(LogoutPage),
  ],
})
export class LogoutPageModule {}
