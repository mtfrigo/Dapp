import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaConvidadosPage } from './lista-convidados';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ListaConvidadosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaConvidadosPage),
    PipesModule
  ],
})
export class ListaConvidadosPageModule {}
