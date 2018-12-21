import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Dungeons } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-dungeon-detail',
  templateUrl: 'dungeon-detail.html'
})
export class DungeonDetailPage {
  dungeon: any;

  constructor(public navCtrl: NavController, navParams: NavParams, dungeons: Dungeons) {
    this.dungeon = navParams.get('dungeon') || dungeons.defaultItem;
  }

}
