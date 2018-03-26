import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { BotieListPage } from './botie-list'

@NgModule({
  declarations: [
    BotieListPage,
  ],
  imports: [
    IonicPageModule.forChild(BotieListPage),
  ],
})
export class BotieListPageModule {}
