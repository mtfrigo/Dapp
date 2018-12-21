import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { DungeonDetailPage } from './dungeon-detail';

@NgModule({
  declarations: [
    DungeonDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DungeonDetailPage),
    TranslateModule.forChild()
  ],
  exports: [
    DungeonDetailPage
  ]
})
export class DungeonDetailPageModule { }
