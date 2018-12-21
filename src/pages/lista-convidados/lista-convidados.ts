import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PessoasProvider } from '../../providers/pessoas/pessoas';
import { EventosProvider } from '../../providers/eventos/eventos';

/**
 * Generated class for the ListaConvidadosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-convidados',
  templateUrl: 'lista-convidados.html',
})
export class ListaConvidadosPage {

  eventoKey: any;
  pessoas: any;

  convidados: any = [];
  naoConvidados: any = [];

  teste: any;

  evento: any;

  constructor(public navCtrl: NavController,
    private pessoasProvider: PessoasProvider,
    private eventosProvider: EventosProvider,
    private toast: ToastController,
    public navParams: NavParams) {

    this.eventoKey = this.navParams.data.eventoKey;


    this.eventosProvider.get(this.eventoKey).subscribe((response) => {
      this.evento = response;
      this.getPessoas();
    });
  }

  parsePessoas()
  {

    this.convidados = [];
    this.naoConvidados = [];

    this.evento.pessoas.forEach(element => {

      if(element.convidado == true)
        this.convidados.push(element);
      else
        this.naoConvidados.push(element);


    });

  }

  getPessoas() {

    this.pessoasProvider.getAll()
      .subscribe(response => {


        if(this.evento.pessoas)
        {

          if(response.length < this.evento.pessoas.length)
          {
          // FUNÇÃO PARA ATUALIZAR LITA CASO CONVIDADO SEJA DELETADO

            this.evento.pessoas.forEach(el1 => {

              let found = false;

              response.forEach(el2 => {
                if(el1['nome'] == el2['nome'])
                  found = true;
              });

              if(!found)
              {
                this.evento.pessoas = this.evento.pessoas.filter(function (el) {
                  return el.nome != el1['nome'];
                })
              }

            });
          }
          else if(response.length > this.evento.pessoas.length)
          {
            //FUNÇÃO PARA ATUALIZAR LSITA CASO ALGUEM SEJA CADASTRADO
            response.forEach(element => {
              let found = false;

              this.evento.pessoas.forEach(el => {
                if(element['nome'] == el.nome)
                  found = true;

              });

              if(!found)
              {
                element['convidado'] = false;
                element['bebe'] = false;
                this.evento.pessoas.push(element);
              }

            });
          }
        }
        else
        {
          this.evento.pessoas = response;

          this.evento.pessoas.forEach(element => {
            element.convidado = false;
            element.bebe = false;
          });

        }

        this.parsePessoas();

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaConvidadosPage');
  }

  getPessoaPhoto(pessoa)
  {
    let url = "http://graph.facebook.com/"+pessoa.facebookId+"/picture?type=square";
    return url;
  }


  addConvidado(pessoa)
  {
    pessoa.convidado = !pessoa.convidado;

    this.naoConvidados = this.naoConvidados.filter(function(el) { return el.key != pessoa.key; });
    this.convidados.push(pessoa);
    this.convidados.sort((a,b) => (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0));
  };

  removeConvidado(pessoa)
  {
    pessoa.convidado = !pessoa.convidado;

    this.convidados = this.convidados.filter(function(el) { return el.key != pessoa.key; });
    this.naoConvidados.push(pessoa);
    this.naoConvidados.sort((a,b) => (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0));
  }

  salvarLista(convidados)
  {
    this.eventosProvider.get(this.eventoKey).subscribe((response) => {

      let evento = response;

      evento['pessoas'] = this.evento.pessoas;
      this.eventosProvider.save(evento);

    });
  }

}
