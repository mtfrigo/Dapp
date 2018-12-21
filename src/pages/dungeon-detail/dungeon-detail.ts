import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DungeonsProvider } from '../../providers/dungeons/dungeons';

/**
 * Generated class for the DungeonDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dungeon-detail',
  templateUrl: 'dungeon-detail.html',
})
export class DungeonDetailPage {

  dungeon: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private dungeonsProvider: DungeonsProvider,
    private toast: ToastController) {
    this.dungeon = navParams.get('dungeon')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DungeonDetailPage');
  }

  try(dungeon)
  {
    this.dungeon.active = !this.dungeon.active;

    console.log(this.dungeon.active);

    this.dungeonsProvider.save(this.dungeon)
    .then(() => {
      this.toast.create({ message: 'New try created!', duration: 3000}).present();
      //this.navCtrl.pop();
    })
    .catch((e) => {
      this.toast.create({ message: 'Error creating new try!', duration: 3000}).present();
      console.error(e);
    })


  }

}
