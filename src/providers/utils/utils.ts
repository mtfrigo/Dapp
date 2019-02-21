import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsonsProvider } from '../jsons/jsons';

/*
  Generated class for the UtilsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilsProvider {

  types = [];
  scrolls = [];

  constructor(public http: HttpClient, public jsonsProvider: JsonsProvider) {
    this.jsonsProvider.getMonts()
    .subscribe(d=>{
      this.types = d['items'][0]['items'];
    })

    this.jsonsProvider.getScrolls()
    .subscribe(d=>{
      this.scrolls = d['items'][0]['items'];
    })
  }

  convertToDateDefault(date)
  {

    let splitedRaw = date.split(' ');
    let splitedDate = splitedRaw[0].split('/');

    return splitedDate[2] + "/" + splitedDate[1] + "/" + splitedDate[0] + " " + splitedRaw[1];
  }

  getNowTime()
  {
    var date = new Date();
    let datetext = date.toTimeString();
    datetext = datetext.split(' ')[0];

    return date.getDate() + '/' + (date.getMonth()  + 1) + '/' +  date.getFullYear() +" "+ datetext;
  }

  arrayInclude(array, value)
  {

    let found = false;
    array.forEach(el => {
      if(el == value)
        found = true;
    });

    return found;
  }

  getTypeById(id)
  {
    let found;
    this.types.forEach((el) => {
      if(el.id == parseInt(id))
        found = el;

    })

    return found;

  }

  getScrollById(id)
  {
    let found;
    this.scrolls.forEach((el) => {
      if(el.id == parseInt(id))
        found = el;
    })

    return found;

  }

}
