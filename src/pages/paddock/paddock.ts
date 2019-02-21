import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { MontsProvider } from '../../providers/monts/monts';
import { JsonsProvider } from '../../providers/jsons/jsons';
import { UtilsProvider } from '../../providers/utils/utils';

/**
 * Generated class for the PaddockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paddock',
  templateUrl: 'paddock.html',
})
export class PaddockPage {

  monts = [];
  types: any;
  capabilities: any;
  purities: any;
  type = 0;
  montCounter: number = 0;

  chars = [
    {name: "Panda", img: "assets/imgs/panda.png", value: 0},
    {name: "Roub", img: "assets/imgs/roub.png", value: 0},
    {name: "Zob", img: "assets/imgs/zob.png", value: 0},
  ]


  filters = {
    type: 0,
    capability: [],
    gender: [],
    purity: [],
    char : [],
    time: "None",

  }

  rawMonts = [];


  constructor(private menu: MenuController, public navCtrl: NavController, public navParams: NavParams, public montsProvider: MontsProvider,
    public jsonsProvider: JsonsProvider, public utils: UtilsProvider) {

    this.montsProvider.getAllActives().subscribe(d=>{

      this.rawMonts = d;
      this.filterMonts(d);

    });
  }

  ionViewDidEnter() {


    // Use the id to enable/disable the menus
    this.menu.enable(true, 'menu1');
    this.menu.enable(true, 'menu2');
  }

  filterMonts(monts)
  {

    this.monts = [];

    monts.forEach((el) => {

      if(this.filter(el))
        this.monts.push(el)
    })
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

    this.jsonsProvider.getPurities()
    .subscribe(d=>{
      this.purities = d['items'][0]['items'];
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

  getCapImg(cap)
  {
    let found;
    this.capabilities.forEach(el => {
      if(el.name == cap)
        found = el;
    });
    return found.img;
  }

  getPurity(p)
  {
    if(p == "Pure")
      return "P";
    if(p == "Semi")
      return "S";
    return p;
  }

  editMont(mont)
  {
    this.navCtrl.push('NewMontPage',  { mont: mont});
  }



  applyFilter(filter, obj)
  {
    if(filter == "cap")
    {

      if(this.utils.arrayInclude(this.filters.capability, obj.name))
      {
        var index = this.filters.capability.indexOf(obj.name);
        if (index !== -1) this.filters.capability.splice(index, 1);
      }
      else
        this.filters.capability.push(obj.name);

    }

    if(filter == "purity")
    {
      if(this.utils.arrayInclude(this.filters.purity, obj.name))
      {
        var index = this.filters.purity.indexOf(obj.name);
        if (index !== -1) this.filters.purity.splice(index, 1);
      }
      else
        this.filters.purity.push(obj.name);

    }

    if(filter == "char")
    {
      if(this.utils.arrayInclude(this.filters.char, obj.name))
      {
        var index = this.filters.char.indexOf(obj.name);
        if (index !== -1) this.filters.char.splice(index, 1);
      }
      else
        this.filters.char.push(obj.name);

    }

    if(filter == "gender")
    {
      if(this.utils.arrayInclude(this.filters.gender, obj))
      {
        var index = this.filters.gender.indexOf(obj);
        if (index !== -1) this.filters.gender.splice(index, 1);
      }
      else
        this.filters.gender.push(obj);

    }

    if(filter == "time")
    {
      if(this.filters.time == obj)
        this.filters.time = "None";
      else
        this.filters.time = obj;
    }

    this.filterMonts(this.rawMonts);

  }

  getBackgroundColor(value)
  {
    for (var prop in this.filters) {
      if(prop != "type")
      {
        if(this.filters[prop].includes(value))
          return "yellow";
      }
    }

    return "white";
  }


  getOpacity(name, value)
  {
    if(this.filters[name].length == 0 || this.utils.arrayInclude(this.filters[name], value))
        return 1;

    return 0.3;
  }

  filter(mont)
  {

    let type = mont.type;

    let filterType = false;
    let filterCap = false;
    let filterGender = false;
    let filterPurity = false;
    let filterChar = false;
    let filterTime = false;

    if(this.filters.type == type || this.filters.type == 0)
      filterType = true;

    if(this.filters.time == "None")
      filterTime = true;
    else
      filterTime = this.filterTime(mont.creation);

    if(this.filters.capability.length == 0)
      filterCap = true;
    else
    {
      if(this.utils.arrayInclude(this.filters.capability, mont.cap1) || this.utils.arrayInclude(this.filters.capability, mont.cap2))


        filterCap = true;
    }

    if(this.filters.gender.length == 0)
      filterGender = true;
    else
      if(this.utils.arrayInclude(this.filters.gender, mont.gender))
        filterGender = true;

    if(this.filters.purity.length == 0)
      filterPurity = true;
    else
      if(this.utils.arrayInclude(this.filters.purity, mont.purity))
        filterPurity = true;

    if(this.filters.char.length == 0)
      filterChar = true;
    else
      if(this.utils.arrayInclude(this.filters.char, mont.char))
        filterChar = true;


    if(filterType && filterCap && filterGender && filterPurity && filterChar && filterTime)
    {
      this.montCounter++;
      return true;
    }
    else
      return false;
  }

  selectType(value)
  {
    this.filters.type = this.type;
    this.filterMonts(this.rawMonts);
  }

  resetFilter()
  {
    for (var prop in this.filters) {
      if(prop != "type")
        this.filters[prop] = [];
      else
        this.filters[prop] = 0;
    }

  }

  getCharImg(char)
  {
    console.log(char);

    switch(char)
    {
      case "Panda": return "assets/imgs/panda.png"; ;
      case "Roub" : return "assets/imgs/roub.png"; ;
      case "Zobal" : return "assets/imgs/zob.png"; ;
    }

  }

  getGenderColor(gender)
  {
    if(gender == "Femea")
      return "pink";
    else
      return "lightblue";

  }

  filterTime(creation)
  {

    let coef;

    switch(this.filters.time)
    {
      case "pastDay": coef = 1 * 24 * 60 * 60 * 1000; break;
      case "pastWeek" : coef = 7 * 24 * 60 * 60 * 1000; break;
      case "past2H" : coef = 1 * 2 * 60 * 60 * 1000; break;
    }


    let formatedCreation = this.utils.convertToDateDefault(creation);

    let formatedDateNow = this.utils.convertToDateDefault(this.utils.getNowTime());
    let nowDate = new Date(formatedDateNow);

    let creationDate = new Date(formatedCreation);

    let pastDayDate = new Date(nowDate.getTime() - coef);

    if(creationDate >= pastDayDate)
      return true;
    else
      return false;
  }

}
