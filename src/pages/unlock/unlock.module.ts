import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnlockPage } from './unlock';

@NgModule({
  declarations: [
    UnlockPage,
  ],
  imports: [
    IonicPageModule.forChild(UnlockPage),
  ],
})
export class UnlockPageModule {}
