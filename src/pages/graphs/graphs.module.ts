import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GraphsPage } from './graphs';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    GraphsPage,
  ],
  imports: [
    IonicPageModule.forChild(GraphsPage),
    ComponentsModule
  ],
})
export class GraphsPageModule {}
