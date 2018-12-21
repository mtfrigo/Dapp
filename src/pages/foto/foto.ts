import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

/**
 * Generated class for the FotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-foto',
  templateUrl: 'foto.html',
})
export class FotoPage {

  fotosUrl: any;
  fotos: any;

  teste: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private sanitizer : DomSanitizer) {

    this.http.get('assets/json/fotos.json').subscribe((res) => {

      this.fotos = res.json().items[0];
      this.getOtherPhoto();

    });


  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad FotoPage');
  }

  getUrl()
  {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.fotosUrl);
  }

  getOtherPhoto()
  {
    this.fotosUrl = "https://drive.google.com/file/d/"+this.fotos.items[Math.floor(Math.random() * this.fotos.items.length-1)]+"/preview"
  }

}
