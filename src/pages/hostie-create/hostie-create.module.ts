import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HostieCreatePage } from './hostie-create';

@NgModule({
  declarations: [
    HostieCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(HostieCreatePage),
  ],
})
export class HostieCreatePageModule {}
