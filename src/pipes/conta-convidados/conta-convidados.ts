import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ContaConvidadosPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'contaConvidados',
})
export class ContaConvidadosPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, convidado: any) {

    let convidados = value.filter(function (el) {
      return el.convidado == convidado;
    })

    return convidados.length;
  }
}
