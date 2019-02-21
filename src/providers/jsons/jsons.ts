import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the JsonsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class JsonsProvider {

  constructor(public http: HttpClient) {
  }

  getMonts(){
    return this.http.get("assets/json/monts.json")
  }

  getScrolls(){
    return this.http.get("assets/json/scrolls.json")
  }

  getPurities(){
    return this.http.get("assets/json/purities.json")
  }

  getCapabilities(){
    return this.http.get("assets/json/capabilities.json")
  }

}
