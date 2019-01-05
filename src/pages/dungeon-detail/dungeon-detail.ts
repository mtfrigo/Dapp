import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DungeonsProvider } from '../../providers/dungeons/dungeons';
import { RaidsProvider } from '../../providers/raids/raids';

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
  raid: any = {};
  raidKey: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private dungeonsProvider: DungeonsProvider,
    private toast: ToastController,
    private raidsProvider: RaidsProvider) {
    this.dungeon = navParams.get('dungeon')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DungeonDetailPage');
  }

  getNowTime()
  {
    var date = new Date();
    let datetext = date.toTimeString();
    datetext = datetext.split(' ')[0];

    return date.getDate() + '/' + (date.getMonth()  + 1) + '/' +  date.getFullYear() +" "+ datetext;
  }

  createRaid(bunchOfKeys)
  {
    let raid = {};

    raid['name'] = this.dungeon.name;
    raid['begin'] = this.getNowTime();
    raid['active'] = true;
    raid['bunchOfKeys'] = bunchOfKeys;

    this.raidsProvider.save(raid).then((result: any) => {

      this.dungeon.active = true;
      this.dungeon.raidKey = result;

      this.dungeonsProvider.save(this.dungeon);

    });

  }

  endRaid()
  {

    this.raidsProvider.get(this.dungeon.raidKey)
      .subscribe((raid) => {
        raid['end'] = this.getNowTime();
        raid['active'] = false;

        this.raidsProvider.save(raid);

        this.dungeon.active = false;
        this.dungeon.raidKey = 'none';


        if(raid['bunchOfKeys'])
          this.dungeon.lastRaid = raid['begin'];

        this.dungeonsProvider.save(this.dungeon);

      });
  }

}
