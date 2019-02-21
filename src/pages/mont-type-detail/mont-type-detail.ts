import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MontTypeDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mont-type-detail',
  templateUrl: 'mont-type-detail.html',
})
export class MontTypeDetailPage {
  mont: any;
  scrolls: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.mont = navParams.get('mont')
    this.scrolls = navParams.get('scrolls')
  }

  ionViewDidLoad() {

  }

  getUrlPic(mont)
  {
    return 'url( assets/imgs/monts/' + mont.img + ')'
  }

  getScrollName(id)
  {

    var perg;

    if(id != 0)
    {
      this.scrolls.forEach(el => {
        if(el.id == id)
          perg = el;
      });

      if(perg.id == 1)
        return "Pergaminho " + perg.type;

      return "Pergaminho "+ perg.scale + " de " + perg.type;
    }

    return "Undefined";

  }

  getGestPeriod(gen)
  {
    return gen * 12 + 36 + "h";
  }

  getScrollImg(mont)
  {
    return "assets/imgs/pergs/agilidade.png";
  }

}
