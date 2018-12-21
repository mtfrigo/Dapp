import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';


import { Observable } from 'rxjs/Observable';
import { DungeonsProvider } from '../../providers/dungeons/dungeons';
/**
 * Generated class for the DungeonsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dungeons',
  templateUrl: 'dungeons.html',
})
export class DungeonsPage {

  dungeons: Observable<any>;

  constructor(public navCtrl: NavController,
    private dungeonsProvider: DungeonsProvider,
    private toast: ToastController) {

    this.dungeons = this.dungeonsProvider.getAll();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DungeonsPage');
  }

  newDungeon() {
    this.navCtrl.push('DungeonEditPage');
  }

  editDungeon(dungeon: any) {
    this.navCtrl.push('DungeonEditPage', { dungeon: dungeon, img:  this.getDungeonPic(dungeon)});
  }

  removeDungeon(key: string) {
    if (key) {
      this.dungeonsProvider.remove(key)
        .then(() => {
          this.toast.create({ message: 'Contato removido sucesso.', duration: 3000 }).present();
        })
        .catch(() => {
          this.toast.create({ message: 'Erro ao remover o contato.', duration: 3000 }).present();
        });
    }
  }

  getDungeonPic(dungeon)
  {
    let url = "https://s.ankama.com/www/static.ankama.com/dofus-touch/www/game/items/200/84238.png";
    return url;
  }

}
