import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RaidHistoryPage } from './raid-history';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    RaidHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(RaidHistoryPage),
    ComponentsModule,
  ],
})
export class RaidHistoryPageModule {}
