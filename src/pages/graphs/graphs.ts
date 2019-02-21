import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the GraphsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-graphs',
  templateUrl: 'graphs.html',
})
export class GraphsPage {

  grafico: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.grafico = 1;
  }

  ionViewDidLoad() {

  }

  changeGrafico(value)
  {
    this.grafico = value;
  }

  getOpacity(value)
  {
    if(value == this.grafico)
    {
      return 1;
    }
    else
    {
      return 0.3;
    }
  }

}
