import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HostieListPage } from './hostie-list';

@NgModule({
  declarations: [
    HostieListPage,
  ],
  imports: [
    IonicPageModule.forChild(HostieListPage),
  ],
})
export class HostieListPageModule {}
