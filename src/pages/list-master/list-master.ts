import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Dungeon } from '../../models/dungeon';
import { Items } from '../../providers';
import { Dungeons } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Item[];
  currentDungeons: Item[];

  constructor(public navCtrl: NavController, public items: Items, public dungeons: Dungeons, public modalCtrl: ModalController) {
    this.currentItems = this.items.query();
    this.currentDungeons = this.dungeons.query();
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addDungeon() {
    let addModal = this.modalCtrl.create('DungeonCreatePage');
    addModal.onDidDismiss(dungeon => {
      if (dungeon) {
        this.dungeons.add(dungeon);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteDungeon(dungeon) {
    this.dungeons.delete(dungeon);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openDungeon(dungeon: Dungeon) {
    this.navCtrl.push('DungeonDetailPage', {
      dungeon: dungeon
    });
  }
}
