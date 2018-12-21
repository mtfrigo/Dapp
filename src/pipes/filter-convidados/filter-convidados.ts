import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FilterConvidadosPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'filterConvidados',
})
export class FilterConvidadosPipe implements PipeTransform {


  transform(value: any, convidado: any) {


    let convidados = value.filter(function (el) {
      return el.convidado == convidado;
    })

    return convidados;
  }
}
