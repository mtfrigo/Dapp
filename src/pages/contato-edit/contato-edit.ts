import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { PessoasProvider } from './../../providers/pessoas/pessoas';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the ContatoEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contato-edit',
  templateUrl: 'contato-edit.html',
})
export class ContatoEditPage {

  title: string;
  form: FormGroup;
  contact: any;

  constructor(public navCtrl: NavController,private formBuilder: FormBuilder,
     private pessoasProvider: PessoasProvider, public navParams: NavParams,
     private toast: ToastController) {

      // maneira 1
    this.contact = this.navParams.data.contact || { };
    this.createForm();

    // // maneira 2
    // this.contact = { };
    // this.createForm();

    // if (this.navParams.data.key) {
    //   const subscribe = this.provider.get(this.navParams.data.key).subscribe((c: any) => {
    //     subscribe.unsubscribe();

    //     this.contact = c;
    //     this.createForm();
    //   })
    // }

    this.setupPageTitle();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContatoEditPage');
  }

  private setupPageTitle() {
    this.title = this.navParams.data.contact ? 'Alterando contato' : 'Novo contato';
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.contact.key],
      nome: [this.contact.nome, Validators.required],
      facebookId: [this.contact.facebookId, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.pessoasProvider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Contato salvo com sucesso.', duration: 3000 }).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar o contato.', duration: 3000 }).present();
          console.error(e);
        })
    }
  }

}
