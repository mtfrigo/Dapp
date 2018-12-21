import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import { EventosProvider } from '../../providers/eventos/eventos';
import { ComprasProvider } from '../../providers/compras/compras';
import { MudaPrecoPage } from '../muda-preco/muda-preco';

/**
 * Generated class for the ListaComprasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-compras',
  templateUrl: 'lista-compras.html',
})
export class ListaComprasPage {

  eventoKey: any;
  evento: any;
  convidados: any;
  compras: any = [];
  total : any = 0;

  constructor(public navCtrl: NavController,
    private comprasProvider: ComprasProvider,
    private eventosProvider: EventosProvider,
    private toast: ToastController,
    private http: Http,
    public navParams: NavParams,
    public modalCtrl: ModalController) {

    this.eventoKey = this.navParams.data.eventoKey;


    this.eventosProvider.get(this.eventoKey).subscribe((response) => {

      this.evento = response;

      this.comprasProvider.getAll().subscribe((res) => {

        if(this.evento.compras)
        {
          this.compras = this.evento.compras;

          this.checkForItemDeleted(res);
        }

        this.parseCompras(res);

        this.countTotal();

      })
    });


  }

  parseCompras(compras)
  {



    let obj = {};

    compras.forEach(element => {

      let found = false;
      let categoryAlreadExist = false;


      this.compras.forEach(itens => {

        itens.items.forEach(item => {
          if(item.nome == element.nome) found = true;
        });
      });


      if(!found)
      {
        element.qtd = 0;

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

  checkForItemDeleted(compras)
  {

    let k = this.compras.length

    while(k)
    {
      k--;

      let categorias = this.compras[k];

      let i = categorias['items'].length;

      while(i)
      {
        let ok = false;


        i--;

        let item = categorias['items'][i];

        compras.forEach(compra => {
          if(item.nome == compra.nome) ok = true;
        });

        if(!ok) categorias['items'].splice(i, 1);
      }

      if(categorias.items.length == 0)
        this.compras.splice(k, 1);

    };



  }

  newItem() {
    this.navCtrl.push('ItemEditPage');
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

  salvarLista()
  {
      let evento = this.evento;

      evento['compras'] = this.compras;
      evento['totalCompras'] = this.total;

      evento['compras'].forEach(element => {
        delete element.open;
      });

      this.eventosProvider.save(evento);
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

  countTotal()
  {
    this.total = 0;

    this.compras.forEach(element => {
      element.items.forEach(item => {
        this.total = this.total + item.qtd * item.preco;
      });
    });
  }


  changePreco(item) {

    let mudaPrecoModal = this.modalCtrl.create(MudaPrecoPage, {item: item}, {cssClass:"my-modal"});
    mudaPrecoModal.present();

    mudaPrecoModal.onDidDismiss(data => {
      item.preco = data.preco;
      this.eventosProvider.save(this.evento);

    });




  }



}
