import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PessoasProvider } from '../../providers/pessoas/pessoas';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/**
 * Generated class for the PessoaEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pessoa-edit',
  templateUrl: 'pessoa-edit.html',
})
export class PessoaEditPage {

  title: string;
  form: FormGroup;
  pessoa: any ;
  img: any ;

  constructor(public navCtrl: NavController,
    private toast: ToastController,
    private pessoasProvider: PessoasProvider,
    private formBuilder: FormBuilder,
    public navParams: NavParams) {


      this.pessoa = this.navParams.data.pessoa || {};
      this.img = this.navParams.data.img;
      this.setupPageTitle();
      this.createForm();

  }

  private setupPageTitle(){
    this.title = this.navParams.data.pessoa ? 'Alterando contato' : 'Novo contato';
  }

  createForm(){
    this.form = this.formBuilder.group({
      key: [this.pessoa.key],
      nome: [this.pessoa.nome, Validators.required],
      facebookId: [this.pessoa.facebookId, Validators.required],
    });
  }

  onSubmit(){
    if(this.form.valid){
      this.pessoasProvider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Novo contato registrado!', duration: 3000}).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao criar novo contato!', duration: 3000}).present();
          console.error(e);
        })
    }
  }



  newContact() {
    this.navCtrl.push('ContactEditPage');
  }

  editContact(contact: any) {
    // Maneira 1
    this.navCtrl.push('ContactEditPage', { contact: contact });

    // Maneira 2
    // this.navCtrl.push('ContactEditPage', { key: contact.key });
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

  enterAsGuest()
  {
    this.navCtrl.pop();
  }

  enterFacebook()
  {
    this.navCtrl.pop();
  }

}
