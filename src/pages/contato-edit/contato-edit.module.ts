import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContatoEditPage } from './contato-edit';

@NgModule({
  declarations: [
    ContatoEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ContatoEditPage),
  ],
})
export class ContatoEditPageModule {}
