import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaComprasPage } from './lista-compras';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ListaComprasPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaComprasPage),
    PipesModule
  ],
})
export class ListaComprasPageModule {}
