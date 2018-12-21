import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { DungeonCreatePage } from './dungeon-create';

@NgModule({
  declarations: [
    DungeonCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(DungeonCreatePage),
    TranslateModule.forChild()
  ],
  exports: [
    DungeonCreatePage
  ]
})
export class DungeonCreatePageModule { }
