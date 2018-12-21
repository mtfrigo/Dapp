import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DungeonDetailPage } from './dungeon-detail';

@NgModule({
  declarations: [
    DungeonDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DungeonDetailPage),
  ],
})
export class DungeonDetailPageModule {}
