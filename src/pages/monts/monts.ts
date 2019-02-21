import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JsonsProvider } from '../../providers/jsons/jsons';

/**
 * Generated class for the MontsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-monts',
  templateUrl: 'monts.html',
})
export class MontsPage {

  monts: any = undefined;
  scrolls: any = undefined;


  constructor(public navCtrl: NavController, public navParams: NavParams, public jsonsProvider: JsonsProvider) {

  }

  ngOnInit() {

    this.jsonsProvider.getMonts()
    .subscribe(d=>{
      this.monts = d['items'][0]['items'];
    })

    this.jsonsProvider.getScrolls()
      .subscribe(d=>{
        this.scrolls = d['items'][0]['items'];
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MontsPage');
  }

  getImg(mont)
  {
    return "assets/imgs/monts/"+mont.img;
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
  }



  viewMontDetail(mont)
  {
    this.navCtrl.push('MontTypeDetailPage',  { mont: mont, scrolls: this.scrolls});
  }


}
