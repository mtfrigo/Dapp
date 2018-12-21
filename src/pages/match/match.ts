import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map'
import { DomSanitizer } from '@angular/platform-browser';
import { PessoasProvider } from '../../providers/pessoas/pessoas';

/**
 * Generated class for the MatchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-match',
  templateUrl: 'match.html',
})
export class MatchPage {

  pessoas: any;
  match: any;
  first: any = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private pessoasProvider: PessoasProvider, private sanitizer : DomSanitizer) {

  }

  ngOnInit()
  {

    this.pessoasProvider.getAll().subscribe((res) => {
      this.pessoas = res;
      this.newMatch(this.pessoas);
    })


  }

  ionViewDidLoad() {
  }

  newMatch(pessoas)
  {
    let p1;
    let p2;

    let i1 = this.newIndex(9999);
    let i2 = this.newIndex(i1);

    p1 = pessoas[i1];
    p2 = pessoas[i2];

    this.match = [p1, p2];

  }

  newIndex(i)
  {
    let newIndex = Math.floor(Math.random() * this.pessoas.length)

    while(newIndex == i || newIndex < 0)
      newIndex = Math.floor(Math.random() * this.pessoas.length);

    return newIndex;
  }

  getPessoaPhoto(i)
  {
    let url = "http://graph.facebook.com/"+this.match[i].facebookId+"/picture?type=square";
    return url;
  }

}
