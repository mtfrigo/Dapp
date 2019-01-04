import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RaidsProvider } from '../../providers/raids/raids';

/**
 * Generated class for the RaidHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-raid-history',
  templateUrl: 'raid-history.html',
})
export class RaidHistoryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private raidsProvider: RaidsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RaidHistoryPage');
  }

  removeRaid(key: string) {
    if (key) {
      this.raidsProvider.remove(key);
    }
  }

}
