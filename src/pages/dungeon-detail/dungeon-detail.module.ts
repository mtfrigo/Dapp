import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DungeonDetailPage } from './dungeon-detail';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DungeonDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DungeonDetailPage),
    ComponentsModule
  ],
})
export class DungeonDetailPageModule {}
