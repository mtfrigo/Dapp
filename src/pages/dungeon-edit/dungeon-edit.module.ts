import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DungeonEditPage } from './dungeon-edit';

@NgModule({
  declarations: [
    DungeonEditPage,
  ],
  imports: [
    IonicPageModule.forChild(DungeonEditPage),
  ],
})
export class DungeonEditPageModule {}
