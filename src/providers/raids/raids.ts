import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class RaidsProvider {

  private PATH = 'raids/';

  constructor(private db: AngularFireDatabase) {
  }

  getAll() {
    return this.db.list(this.PATH, ref => ref.orderByChild('name'))
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

  save(raid: any) {
    return new Promise((resolve, reject) => {
      if (raid.key) {
        this.db.list(this.PATH)
          .update(raid.key, { name: raid.name, begin: raid.begin, end: raid.end, active: raid.active,
            bunchOfKeys: raid.bunchOfKeys })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({ name: raid.name, begin: raid.begin, end: "In progress", active: raid.active, bunchOfKeys: raid.bunchOfKeys  })
          //.then(() => resolve());
          .then((result: any) => resolve(result.key));
      }
    })
  }

  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }

}
