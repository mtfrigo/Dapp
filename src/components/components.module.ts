import { NgModule } from '@angular/core';
import { RaidsHistoryComponent } from './raids-history/raids-history';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { BarGraphComponent } from './bar-graph/bar-graph';
import { LineGraphComponent } from './line-graph/line-graph';
@NgModule({
	declarations: [RaidsHistoryComponent,
    BarGraphComponent,
    LineGraphComponent],
	imports: [
    CommonModule,
    IonicModule
  ],
	exports: [RaidsHistoryComponent,
    BarGraphComponent,
    LineGraphComponent]
})
export class ComponentsModule {}
