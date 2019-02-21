import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MontsPage } from './monts';

@NgModule({
  declarations: [
    MontsPage,
  ],
  imports: [
    IonicPageModule.forChild(MontsPage),
  ],
})
export class MontsPageModule {}
