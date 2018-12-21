import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventosProvider } from '../../providers/eventos/eventos';
import { Observable } from 'rxjs';

/**
 * Generated class for the ListaEventosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-eventos',
  templateUrl: 'lista-eventos.html',
})
export class ListaEventosPage {

  eventos: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private eventosProvider: EventosProvider) {

      this.eventosProvider.getAll().subscribe((res) => {
        this.eventos = res;
      })
  }

  ionViewDidLoad() {

  }

  viewEvent(evento) {
    this.navCtrl.push('EventosPage', { eventoKey: evento.key});
  }

  newEvent() {
    this.navCtrl.push('EventoEditPage');
  }
}
