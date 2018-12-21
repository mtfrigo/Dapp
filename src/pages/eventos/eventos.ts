import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { EventosProvider } from '../../providers/eventos/eventos';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the EventosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-eventos',
  templateUrl: 'eventos.html',
})
export class EventosPage {

  evento: any;
  eventoKey : any;
  recarregar :boolean = false;

  constructor(public navCtrl: NavController,
    private eventosProvider: EventosProvider,
    public navParams: NavParams,
    private toast: ToastController) {

      this.eventoKey = this.navParams.data.eventoKey;
      this.getEvento(this.eventoKey);
      this.recarregar = true;

  }

  getEvento(key)
  {
    this.eventosProvider.get(key).subscribe((res) => {
      this.evento = res;
    })
  }

  ionViewWillEnter(){

    if(this.recarregar)
      this.getEvento(this.eventoKey)
  }

  criaListaConvidados(key: string)
  {
    this.navCtrl.push('ListaConvidadosPage', { eventoKey: key});
  }

  criaListaCompras(key: string)
  {
    this.navCtrl.push('ListaComprasPage', { eventoKey: key});
  }


  editEvent(evento: any) {
    this.navCtrl.push('EventoEditPage', { evento: evento});
  }

  removeEvent(key: string) {
    if (key) {
      this.eventosProvider.remove(key)
        .then(() => {
          this.toast.create({ message: 'Evento removido sucesso.', duration: 3000 }).present();
        })
        .catch(() => {
          this.toast.create({ message: 'Erro ao remover o evento.', duration: 3000 }).present();
        });
    }
  }

}
