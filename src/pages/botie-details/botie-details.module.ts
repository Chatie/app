import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { BotieDetailsPage } from './botie-details'

@NgModule({
  declarations: [
    BotieDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BotieDetailsPage),
  ],
})
export class BotieDetailsPageModule {}
