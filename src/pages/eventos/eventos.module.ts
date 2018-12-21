import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventosPage } from './eventos';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    EventosPage,
  ],
  imports: [
    IonicPageModule.forChild(EventosPage),
    PipesModule
  ],
})
export class EventosPageModule {}
