import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the IndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexPage');
  }

  goToDungeons()
  {
    this.navCtrl.push("DungeonsPage")
  }

  goToMonts()
  {
    this.navCtrl.push("MontsPage")
  }

  goToNewMont()
  {
    this.navCtrl.push("NewMontPage")
  }

  goToPaddock()
  {
    this.navCtrl.push("PaddockPage")
  }

  goToTrades()
  {
    this.navCtrl.push("TradesPage")
  }

  goToGraphs()
  {
    this.navCtrl.push("GraphsPage")
  }
}
