import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'

import { QRCodeModule } from 'angularx-qrcode'
import { WechatyModule }  from '@chatie/angular'

import { BotieDetailsPage } from './botie-details'

@NgModule({
  declarations: [
    BotieDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BotieDetailsPage),
    QRCodeModule,
    WechatyModule,
  ],
})
export class BotieDetailsPageModule {}
