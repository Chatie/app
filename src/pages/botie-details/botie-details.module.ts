import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'

import { WechatyModule }  from '@chatie/angular'

import { BotieDetailsPage } from './botie-details'

@NgModule({
  declarations: [
    BotieDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BotieDetailsPage),
    WechatyModule,
  ],
})
export class BotieDetailsPageModule {}
