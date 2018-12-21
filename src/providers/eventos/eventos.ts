import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the EventosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class EventosProvider {

  private PATH = 'eventos/';

  convidados: any = [];

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

  save(evento: any) {
    return new Promise((resolve, reject) => {
      if (evento.key) {
        this.db.list(this.PATH)
          .update(evento.key, {
            nome: evento.nome,
            dia: evento.dia,
            descricao: evento.descricao,
            hora: evento.hora,
            pessoas: evento.pessoas ? evento.pessoas : {},
            totalCompras: evento.compras ? evento.totalCompras : 0,
            compras: evento.compras ? evento.compras : {},
          })
          .then(() =>resolve())

          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({
            nome: evento.nome,
            dia: evento.dia,
            descricao: evento.descricao,
            hora: evento.hora,
            total: 0,
            pessoas: evento.pessoas ? evento.pessoas : {},
          })
          .then(() => resolve());
          //.then((result: any) => resolve(result.key));
      }
    })
  }

  saveListaConvidados(evento: any) {
    return new Promise((resolve, reject) => {
      this.db.object(this.PATH + "/" + evento.key)
        .update({
          convidados: evento.convidados
        })
        .then(() => resolve())
        .catch((e) => reject(e));
    })
  }


  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }

}
