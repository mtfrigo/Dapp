import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';


import { Observable } from 'rxjs/Observable';
import { DungeonsProvider } from '../../providers/dungeons/dungeons';
import { RaidsProvider } from '../../providers/raids/raids';
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
    private raidsProvider: RaidsProvider,
    private toast: ToastController) {

    this.dungeons = this.dungeonsProvider.getAll();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DungeonsPage');
  }

  newDungeon() {
    this.navCtrl.push('DungeonEditPage');
  }

  viewDungeon(dungeon) {
    this.navCtrl.push('DungeonDetailPage',  { dungeon: dungeon});
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

  endRaid(dungeon)
  {

    this.raidsProvider.get(dungeon.raidKey)
      .subscribe((raid) => {
        raid['end'] = this.getNowTime();
        raid['active'] = false;

        this.raidsProvider.save(raid);

        dungeon.active = false;
        dungeon.raidKey = 'none';

        if(raid['bunchOfKeys'])
          dungeon.lastRaid = raid['begin'];

        this.dungeonsProvider.save(dungeon);

      });
  }

  getNowTime()
  {
    var date = new Date();
    let datetext = date.toTimeString();
    datetext = datetext.split(' ')[0];

    return date.getDate() + '/' + (date.getMonth()  + 1) + '/' +  date.getFullYear() +" "+ datetext;
  }

  getLastRaid(dungeon)
  {
    if(dungeon.lastRaid && dungeon.lastRaid != "none")
      return dungeon.lastRaid
  }

  convertToDateDefault(date)
  {

    let splitedRaw = date.split(' ');
    let splitedDate = splitedRaw[0].split('/');

    return splitedDate[2] + "/" + splitedDate[1] + "/" + splitedDate[0] + " " + splitedRaw[1];
  }

  bunchOfKeysUnlocked(dungeon)
  {

    if(!dungeon.lastRaid || dungeon.lastRaid == "none")
      return true;

    //LAST RAID TIME
    let formatedDate = this.convertToDateDefault(dungeon.lastRaid);

    //NOW TIME
    let formatedDateNow = this.convertToDateDefault(this.getNowTime());

    let now = new Date(formatedDateNow);

    //NEXT WEEK TIME
    var firstDay = new Date(formatedDate);
    var nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);

    return now >= nextWeek;

  }

  getBunchUnlockDate(dungeon)
  {

    //LAST RAID TIME
    let formatedDate = this.convertToDateDefault(dungeon.lastRaid);

    //NEXT WEEK TIME
    var firstDay = new Date(formatedDate);
    var nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);

    let datetext = nextWeek.toTimeString();
    datetext = datetext.split(' ')[0];

    return nextWeek.getDate() + '/' + (nextWeek.getMonth()  + 1) + '/' +  nextWeek.getFullYear() +" "+ datetext;

  }
}
