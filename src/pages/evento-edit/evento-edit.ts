import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { EventosProvider } from '../../providers/eventos/eventos';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the EventoEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-evento-edit',
  templateUrl: 'evento-edit.html',
})
export class EventoEditPage {

  title: string;
  form: FormGroup;
  evento: any ;
  img: any ;

  constructor(public navCtrl: NavController,
    private toast: ToastController,
    private eventosProvider: EventosProvider,
    private formBuilder: FormBuilder,
    public navParams: NavParams) {


      this.evento = this.navParams.data.evento || {};
      this.setupPageTitle();
      this.createForm();

  }

  private setupPageTitle(){
    this.title = this.navParams.data.pessoa ? 'Alterando evento' : 'Novo evento';
  }

  createForm(){
    this.form = this.formBuilder.group({
      key: [this.evento.key],
      nome: [this.evento.nome, Validators.required],
      hora: [this.evento.hora, Validators.required],
      descricao: [this.evento.descricao, Validators.required],
      dia: [this.evento.dia, Validators.required],
      convidados: [this.evento.convidados]
    });
  }

  onSubmit(){
    if(this.form.valid){
      this.eventosProvider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Novo evento registrado!', duration: 3000}).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao criar novo evento!', duration: 3000}).present();
          console.error(e);
        })
    }
  }



  newContact() {
    this.navCtrl.push('EventoEditPage');
  }

  editContact(evento: any) {
    // Maneira 1
    this.navCtrl.push('EventoEditPage', { evento: evento });

    // Maneira 2
    // this.navCtrl.push('ContactEditPage', { key: contact.key });
  }

  removeContact(key: string) {
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
