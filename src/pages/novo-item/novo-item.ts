import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the NovoItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-novo-item',
  templateUrl: 'novo-item.html',
})
export class NovoItemPage {

  categoria: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.categoria = this.navParams.get('categoria')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NovoItemPage');
  }

  novoItem(nome, preco, unidade) {
    this.viewCtrl.dismiss({ nome: nome, categoria: this.categoria, preco: preco, unidade: unidade });
  }
}
