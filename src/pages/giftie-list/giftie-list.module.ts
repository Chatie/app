import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GiftieListPage } from './giftie-list';

@NgModule({
  declarations: [
    GiftieListPage,
  ],
  imports: [
    IonicPageModule.forChild(GiftieListPage),
  ],
})
export class GiftieListPageModule {}
