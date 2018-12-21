import { Injectable } from '@angular/core';

import { Dungeon } from '../../models/dungeon';

@Injectable()
export class Dungeons {
  dungeons: Dungeon[] = [];

  defaultItem: any = {
    "name": "Rato de Brakmar",
    "pic": "assets/img/bosses/brakrat.png",
    "difficult": "Fácil",
  };


  constructor() {
    let dungeons = [
      {
        "name": "Rato de Brakmar",
        "pic": "assets/img/bosses/brakrat.png",
        "difficult": "Easy",
      },
      {
        "name": "Rato de Bonta",
        "pic": "assets/img/bosses/bontarat.png",
        "difficult": "Easy",
      }
    ];

    for (let dungeon of dungeons) {
      this.dungeons.push(new Dungeon(dungeon));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.dungeons;
    }

    return this.dungeons.filter((dungeon) => {
      for (let key in params) {
        let field = dungeon[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return dungeon;
        } else if (field == params[key]) {
          return dungeon;
        }
      }
      return null;
    });
  }

  add(dungeon: Dungeon) {
    this.dungeons.push(dungeon);
  }

  delete(dungeon: Dungeon) {
    this.dungeons.splice(this.dungeons.indexOf(dungeon), 1);
  }
}
