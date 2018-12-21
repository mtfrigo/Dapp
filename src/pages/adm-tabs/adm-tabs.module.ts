import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdmTabsPage } from './adm-tabs';

@NgModule({
  declarations: [
    AdmTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(AdmTabsPage),
  ],
})
export class AdmTabsPageModule {}
