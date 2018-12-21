import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map'
import { MudaPrecoPage } from '../muda-preco/muda-preco';
import { NovoItemPage } from '../novo-item/novo-item';

import { ComprasProvider } from '../../providers/compras/compras'

/**
 * Generated class for the ManagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage',
  templateUrl: 'manage.html',
})
export class ManagePage {


  compras: any[] = [];
  total: any;
  convidados: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,private comprasProvider: ComprasProvider, private http: Http, public modalCtrl: ModalController) {
    this.total = 0;
    this.convidados = 15;

    comprasProvider.getAll().subscribe((res) => {

      this.parseCompras(res);
      console.log(this.compras);
    })

  }

  parseCompras(compras)
  {
    let obj = {};

    compras.forEach(element => {

      let found = false;
      let categoryAlreadExist = false;

      if(this.compras)
      this.compras.forEach(itens => {

        itens.items.forEach(item => {
          if(item.nome == element.nome) found = true;
        });
      });

      if(!found)
      {
        element.qtd = 0;

        if(this.compras)
        this.compras.forEach(compra => {
          if(compra.nome == element.categoria) {
            categoryAlreadExist = true;
            compra['items'].push(element);
          }
        });

        if(!categoryAlreadExist)
        {
          if(!obj[element.categoria])
          {
            obj[element.categoria] = {
              nome: element.categoria,
              items: []
            };
          }
          obj[element.categoria]['items'].push(element);

        }

      }
    });

    for(var categoria in obj)
    {
      this.compras.push(obj[categoria])
    }

  }


  ionViewDidLoad() {
    //console.log('ionViewDidLoad ManagePage');
  }

  changePreco(item) {

    let mudaPrecoModal = this.modalCtrl.create(MudaPrecoPage, {item: item}, {cssClass:"my-modal"});
    mudaPrecoModal.present();

    mudaPrecoModal.onDidDismiss(data => {
      item.preco = data.preco;
    });

  }


  novoItem(categoria)
  {
    let novoItemModal = this.modalCtrl.create(NovoItemPage, {categoria: categoria.nome});
    novoItemModal.present();

    novoItemModal.onDidDismiss(data => {
      data.imagem = "natasha.jpg";
      data.qtd = 0;

      this.compras.forEach(function(el) {
        if(el.nome == data.categoria)
          el.items.push(data);
      })
    });
  }

  toggleSection(i) {
    this.compras[i].open = !this.compras[i].open;
  }

  toggleItem(i, j) {
    this.compras[i].items[j].open = !this.compras[i].items[j].open;
  }

  getItemImg(item) {
    return "assets/imgs/"+item.imagem;
  }

  modifyItem(item, action)
  {
    if(action == "remove"){
      if(item.qtd > 0)
        item.qtd--;
    }
    else
    {
      item.qtd++;
    }

    this.countTotal();
  }

  modifyQuant(action)
  {
    if(action == "remove"){
      if(this.convidados > 0)
        this.convidados--;
    }
    else
    {
      this.convidados++;
    }
  }

  newItem() {
    this.navCtrl.push('ItemEditPage');
  }


  countTotal()
  {
    this.total = 0;

    this.compras.forEach(element => {
      element.items.forEach(item => {
        this.total = this.total + item.qtd * item.preco;
      });
    });
  }

}
