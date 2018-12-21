import { Injectable } from '@angular/core';

import { Dungeon } from '../../models/dungeon';
import { Api } from '../api/api';

@Injectable()
export class Dungeons {

  constructor(public api: Api) { }

  query(params?: any) {
    return this.api.get('/dungeons', params);
  }

  add(dungeon: Dungeon) {
  }

  delete(dungeon: Dungeon) {
  }

}
