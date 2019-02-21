import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MontTypeDetailPage } from './mont-type-detail';

@NgModule({
  declarations: [
    MontTypeDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MontTypeDetailPage),
  ],
})
export class MontTypeDetailPageModule {}
