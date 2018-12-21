import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ContaPagantesPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'contaPagantes',
})
export class ContaPagantesPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, convidado: any) {

    if(!value)
      return 0;

    let convidados = value.filter(function (el) {
      return (el.convidado == convidado && el.bebe == true);
    })

    return convidados.length;
  }
}
