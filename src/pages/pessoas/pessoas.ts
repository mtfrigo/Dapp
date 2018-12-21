import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PessoasProvider } from '../../providers/pessoas/pessoas';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-pessoas',
  templateUrl: 'pessoas.html',
})
export class PessoasPage {

  pessoas: Observable<any>;

  constructor(public navCtrl: NavController,
    private pessoasProvider: PessoasProvider,
    private toast: ToastController) {

      this.pessoas = this.pessoasProvider.getAll();

  }

  newContact() {
    this.navCtrl.push('PessoaEditPage');
  }

  editContact(pessoa: any) {
    this.navCtrl.push('PessoaEditPage', { pessoa: pessoa, img:  this.getPessoaPhoto(pessoa)});
  }

  removeContact(key: string) {
    if (key) {
      this.pessoasProvider.remove(key)
        .then(() => {
          this.toast.create({ message: 'Contato removido sucesso.', duration: 3000 }).present();
        })
        .catch(() => {
          this.toast.create({ message: 'Erro ao remover o contato.', duration: 3000 }).present();
        });
    }
  }

  getPessoaPhoto(pessoa)
  {
    let url = "http://graph.facebook.com/"+pessoa.facebookId+"/picture?type=square";
    return url;
  }



}
