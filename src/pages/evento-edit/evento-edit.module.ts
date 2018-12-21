import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventoEditPage } from './evento-edit';

@NgModule({
  declarations: [
    EventoEditPage,
  ],
  imports: [
    IonicPageModule.forChild(EventoEditPage),
  ],
})
export class EventoEditPageModule {}
