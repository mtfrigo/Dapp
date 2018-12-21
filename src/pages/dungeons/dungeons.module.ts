import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DungeonsPage } from './dungeons';

@NgModule({
  declarations: [
    DungeonsPage,
  ],
  imports: [
    IonicPageModule.forChild(DungeonsPage),
  ],
})
export class DungeonsPageModule {}
