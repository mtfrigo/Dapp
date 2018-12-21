import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the ComprasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ComprasProvider {

  private PATH = 'compras/';

  constructor(private db: AngularFireDatabase) {
  }

  getAll() {
    return this.db.list(this.PATH, ref => ref.orderByChild('nome'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }

  get(key: string) {
    return this.db.object(this.PATH + key).snapshotChanges()
      .map(c => {
        return { key: c.key, ...c.payload.val() };
      });
  }

  save(item: any) {
    console.log(item)
    return new Promise((resolve, reject) => {
      if (item.key) {
        this.db.list(this.PATH)
          .update(item.key, { nome: item.nome, imagem: item.imagem, categoria: item.categoria, preco: item.preco, unidade: item.unidade})
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({ nome: item.nome, imagem: item.imagem, categoria: item.categoria, preco: item.preco, unidade: item.unidade})
          .then(() => resolve());
          //.then((result: any) => resolve(result.key));
      }
    })
  }

  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }

}
