import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-adm-tabs',
  templateUrl: 'adm-tabs.html',
})
export class AdmTabsPage {
  @ViewChild('myTabs') tabRef: Tabs;

  tab1 = 'ManagePage';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let openTab = this.navParams.get('openTab');
    if (openTab) {
      this.tabRef.select(openTab);
    }
  }

}
