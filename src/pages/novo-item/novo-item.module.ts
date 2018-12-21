import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovoItemPage } from './novo-item';

@NgModule({
  declarations: [
    NovoItemPage,
  ],
  imports: [
    IonicPageModule.forChild(NovoItemPage),
  ],
})
export class NovoItemPageModule {}
