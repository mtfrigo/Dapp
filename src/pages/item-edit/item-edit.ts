import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ComprasProvider } from '../../providers/compras/compras';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the ItemEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-edit',
  templateUrl: 'item-edit.html',
})
export class ItemEditPage {

  title: string;
  form: FormGroup;
  img: any ;
  item: any ;

  constructor(public navCtrl: NavController,
    private toast: ToastController,
    private comprasProvider: ComprasProvider,
    private formBuilder: FormBuilder,
    public navParams: NavParams) {

      this.item = this.navParams.data.item || {};
      this.img = this.navParams.data.img;
      this.setupPageTitle();
      this.createForm();
  }

  private setupPageTitle(){
    this.title = this.navParams.data.item ? 'Alterando item' : 'Novo item';
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemEditPage');
  }

  createForm(){
    this.form = this.formBuilder.group({
      key: [this.item.key],
      nome: [this.item.nome, Validators.required],
      categoria: [this.item.categoria, Validators.required],
      preco: [this.item.preco, Validators.required],
      unidade: [this.item.unidade, Validators.required],
      imagem: [this.item.imagem, Validators.required],
    });
  }

  onSubmit(){
    if(this.form.valid){
      this.comprasProvider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Novo item registrado!', duration: 3000}).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao criar novo item!', duration: 3000}).present();
          console.error(e);
        })
    }
  }

}
