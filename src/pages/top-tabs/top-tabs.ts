import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-top-tabs',
  templateUrl: 'top-tabs.html',
})
export class TopTabsPage {
  @ViewChild('myTabs') tabRef: Tabs;

  tab1 = 'FotoPage';
  tab2 = 'MatchPage';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let openTab = this.navParams.get('openTab');
    if (openTab) {
      this.tabRef.select(openTab);
    }
  }

}
