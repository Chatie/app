import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { HostieDetailsPage } from './hostie-details'

@NgModule({
  declarations: [
    HostieDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(HostieDetailsPage),
  ],
})
export class HostieDetailsPageModule {}
