import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DungeonsProvider } from '../../providers/dungeons/dungeons';
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
  selector: 'page-dungeon-edit',
  templateUrl: 'dungeon-edit.html',
})
export class DungeonEditPage {

  title: string;
  form: FormGroup;
  dungeon: any ;
  img: any ;

  constructor(public navCtrl: NavController,
    private toast: ToastController,
    private dungeonsProvider: DungeonsProvider,
    private formBuilder: FormBuilder,
    public navParams: NavParams) {


      this.dungeon = this.navParams.data.dungeon || {};

      if(this.dungeon.active == null)
        this.dungeon.active = 0;

      this.img = this.navParams.data.img;
      this.setupPageTitle();
      this.createForm();

  }

  private setupPageTitle(){
    this.title = this.navParams.data.dungeon ? 'Updating dungeon' : 'New dungeon';
  }

  createForm(){
    this.form = this.formBuilder.group({
      key: [this.dungeon.key],
      name: [this.dungeon.name, Validators.required],
      pic: [this.dungeon.pic, Validators.required],
      difficulty: [this.dungeon.difficulty, Validators.required],
      active: [this.dungeon.active],
    });
  }

  onSubmit(){
    if(this.form.valid){
      this.dungeonsProvider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'New dungeon created!', duration: 3000}).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Error creating new dungeon!', duration: 3000}).present();
          console.error(e);
        })
    }
  }



  newDungeon() {
    this.navCtrl.push('DungeonEditPage');
  }

  editDungeon(dungeon: any) {
    // Maneira 1
    this.navCtrl.push('DungeonEditPage', { dungeon: dungeon });

    // Maneira 2
    // this.navCtrl.push('ContactEditPage', { key: contact.key });
  }

  removeDungeon(key: string) {
    if (key) {
      this.dungeon.remove(key)
        .then(() => {
          this.toast.create({ message: 'Dungeon removed succesfully.', duration: 3000 }).present();
        })
        .catch(() => {
          this.toast.create({ message: 'Error removing dungeon.', duration: 3000 }).present();
        });
    }
  }


}
