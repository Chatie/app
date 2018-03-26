import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { HostieEditPage } from './hostie-edit'

@NgModule({
  declarations: [
    HostieEditPage,
  ],
  imports: [
    IonicPageModule.forChild(HostieEditPage),
  ],
})
export class HostieEditPageModule {}
