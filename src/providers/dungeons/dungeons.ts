import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class DungeonsProvider {

  private PATH = 'dungeons/';

  constructor(private db: AngularFireDatabase) {
  }

  getAll() {
    return this.db.list(this.PATH, ref => ref.orderByChild('level'))
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      )

  }

  get(key: string) {
    return this.db.object(this.PATH + key).snapshotChanges()
      .pipe(
        map(c => {
        return { key: c.key, ...c.payload.val() };
        })
      );
  }

  save(dungeon: any) {
    return new Promise((resolve, reject) => {
      if (dungeon.key) {
        this.db.list(this.PATH)
          .update(dungeon.key, { name: dungeon.name,
            difficulty: dungeon.difficulty,
            level: dungeon.level,
            coord: dungeon.coord,
            pic: dungeon.pic,
            active: dungeon.active,
            raidKey: dungeon.raidKey ? dungeon.raidKey : 'none',
            lastRaid: dungeon.lastRaid ? dungeon.lastRaid : 'none' })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({ name: dungeon.name,
            difficulty: dungeon.difficulty,
            level: dungeon.level,
            coord: dungeon.coord,
            pic: dungeon.pic,
            active: dungeon.active})
          .then(() => resolve());
          //.then((result: any) => resolve(result.key));
      }
    })
  }

  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }

}
