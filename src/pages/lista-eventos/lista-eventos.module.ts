import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaEventosPage } from './lista-eventos';

@NgModule({
  declarations: [
    ListaEventosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaEventosPage),
  ],
})
export class ListaEventosPageModule {}
