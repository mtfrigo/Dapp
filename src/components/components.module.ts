import { NgModule } from '@angular/core';
import { RaidsHistoryComponent } from './raids-history/raids-history';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [RaidsHistoryComponent],
	imports: [
    CommonModule,
    IonicModule
  ],
	exports: [RaidsHistoryComponent]
})
export class ComponentsModule {}
