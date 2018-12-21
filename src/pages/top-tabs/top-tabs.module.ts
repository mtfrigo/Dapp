import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopTabsPage } from './top-tabs';

@NgModule({
  declarations: [
    TopTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(TopTabsPage),
  ],
})
export class TopTabsPageModule {}
