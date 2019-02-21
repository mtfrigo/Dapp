import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaddockPage } from './paddock';

@NgModule({
  declarations: [
    PaddockPage,
  ],
  imports: [
    IonicPageModule.forChild(PaddockPage),
  ],
})
export class PaddockPageModule {}
