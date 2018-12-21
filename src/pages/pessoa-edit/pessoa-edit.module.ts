import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PessoaEditPage } from './pessoa-edit';

@NgModule({
  declarations: [
    PessoaEditPage,
  ],
  imports: [
    IonicPageModule.forChild(PessoaEditPage),
  ],
})
export class PessoaEditPageModule {}
