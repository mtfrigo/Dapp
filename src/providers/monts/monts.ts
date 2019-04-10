import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/*
  Generated class for the MontsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MontsProvider {

  private PATH = 'monts/';

  constructor(private db: AngularFireDatabase) {
  }


  getAll() {
    return this.db.list(this.PATH, ref => ref)
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      )

  }

  getAllActives() {
    return this.db.list(this.PATH, ref => ref.orderByChild("active").equalTo(true))
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      )

  }

  getAllInactives() {
    return this.db.list(this.PATH, ref => ref.orderByChild("active").equalTo(false))
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

  save(mont: any) {
    return new Promise((resolve, reject) => {
      if (mont.key) {
        this.db.list(this.PATH)
          .update(mont.key, { type: mont.type,
            cap1: mont.cap1,
            cap2: mont.cap2,
            gender: mont.gender,
            purity: mont.purity,
            creation: mont.creation,
            trade: mont.trade,
            char: mont.char,
            active: mont.active })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({ type: mont.type,
            cap1: mont.cap1,
            cap2: mont.cap2,
            gender: mont.gender,
            trade: mont.trade,
            purity: mont.purity,
            char: mont.char,
            creation: mont.creation,
            active: mont.active })
          .then(() => resolve());
          //.then((result: any) => resolve(result.key));
      }
    })
  }

  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }

}
