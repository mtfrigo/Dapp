import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-festa-tabs',
  templateUrl: 'festa-tabs.html',
})
export class FestaTabsPage {
  @ViewChild('myTabs') tabRef: Tabs;

  tab1 = 'DungeonsPage';
  tab2 = 'ListaEventosPage';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let openTab = this.navParams.get('openTab');
    if (openTab) {
      this.tabRef.select(openTab);
    }
  }

}
