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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private dungeonsProvider: DungeonsProvider,
    private toast: ToastController,
    private raidsProvider: RaidsProvider) {
    this.dungeon = navParams.get('dungeon')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DungeonDetailPage');
  }

  try(dungeon)
  {
    this.dungeon.active = !this.dungeon.active;

    if(this.dungeon.active == true)
      this.createRaid();
    else
      this.endRaid();

    this.dungeonsProvider.save(this.dungeon)
    // .then(() => {
    //   this.toast.create({ message: 'New try created!', duration: 3000}).present();
    //   //this.navCtrl.pop();
    // })
    // .catch((e) => {
    //   this.toast.create({ message: 'Error creating new try!', duration: 3000}).present();
    //   console.error(e);
    // })



  }

  getNowTime()
  {
    var date = new Date();
    let datetext = date.toTimeString();
    datetext = datetext.split(' ')[0];

    return date.getDate() + '/' + (date.getMonth()  + 1) + '/' +  date.getFullYear() +" "+ datetext;
  }

  createRaid()
  {

    let raid = {};

    raid['name'] = this.dungeon.name;
    raid['begin'] = this.getNowTime();
    raid['active'] = true;

    console.log(raid);
    this.raidsProvider.save(raid);
  }

  endRaid()
  {
    console.log("entrou end")
    let raids;
    let raid = {};


    this.raidsProvider.getAll()
      .subscribe(response => {

        console.log(response);

        response.forEach(el => {

          if((el['name'] ==  this.dungeon.name) && el['active'] == true)
            raid = el;

        });

        console.log(raid);

        //raid['end'] = this.getNowTime();
        //raid['active'] = false;

        //console.log(raid);


      });

  }

}
