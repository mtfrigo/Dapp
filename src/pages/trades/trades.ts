import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { MontsProvider } from '../../providers/monts/monts';
import { JsonsProvider } from '../../providers/jsons/jsons';

/**
 * Generated class for the TradesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trades',
  templateUrl: 'trades.html',
})
export class TradesPage {

  monts = [];
  types: any;
  capabilities: any;
  scrolls: any;

  constructor(private menu: MenuController, public navCtrl: NavController, public navParams: NavParams, public montsProvider: MontsProvider,
    public jsonsProvider: JsonsProvider) {

      this.montsProvider.getAllInactives().subscribe(d=>{
        this.monts = d;
      });
  }

  ionViewDidEnter() {


    // Use the id to enable/disable the menus
    this.menu.enable(true, 'menu1');
    this.menu.enable(true, 'menu2');
  }

  ngOnInit() {

    this.jsonsProvider.getMonts()
    .subscribe(d=>{
      this.types = d['items'][0]['items'];
    })

    this.jsonsProvider.getCapabilities()
    .subscribe(d=>{
      this.capabilities = d['items'][0]['items'];
    })

    this.jsonsProvider.getScrolls()
    .subscribe(d=>{
      this.scrolls = d['items'][0]['items'];
    })

  }

  getMontImg(mont)
  {

    let found;

    this.types.forEach(el => {
      if(el.id == mont.type)
        found = el;
    });

    return "assets/imgs/monts/" + found.img;
  }

  getMontName(type)
  {
    let found;
    this.types.forEach(el => {
      if(el.id == type)
        found = el;
    });

    return found.name;
  }

  getScrollName(type)
  {

    let scrollId;
    this.types.forEach(el => {
      if(el.id == type)
        scrollId = el.scrollId;
    });

    let perg;

    this.scrolls.forEach(el => {
      if(el.id == scrollId)
        perg = el;
    });

    if(perg.id == 1)
      return perg.type;
    return perg.scale + " de " + perg.type;


  }

  getCapImg(cap)
  {
    let found;
    this.capabilities.forEach(el => {
      if(el.name == cap)
        found = el;
    });
    return found.img;
  }

  getScrollImg(type)
  {

    let scrollId;
    this.types.forEach(el => {
      if(el.id == type)
        scrollId = el.scrollId;
    });

    let perg;
    if(scrollId != 0)
    {
      this.scrolls.forEach(el => {
        if(el.id == scrollId)
          perg = el;
      });

      return "assets/imgs/pergs/" + perg.img;
    }

  }


  getPurity(p)
  {
    if(p == "Pure")
      return "P";
    if(p == "Semi")
      return "S";
    return p;
  }

  viewMont(mont)
  {
    console.log(mont)
  }

  editMont(mont)
  {
    this.navCtrl.push('NewMontPage',  { mont: mont});
  }

}
