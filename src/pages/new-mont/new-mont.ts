import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JsonsProvider } from '../../providers/jsons/jsons';
import { MontsProvider } from '../../providers/monts/monts';
import { UtilsProvider } from '../../providers/utils/utils';

/**
 * Generated class for the NewMontPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-mont',
  templateUrl: 'new-mont.html',
})
export class NewMontPage {

  monts: any;
  type: any = 1;
  numberOfCaps = 0;
  active = true;

  capabilities: any;

  purities: any;

  genders = [
    {name: "Femea", img: "assets/imgs/female.png", value: 1},
    {name: "Macho", img: "assets/imgs/male.png", value: 0},
  ]

  chars = [
    {name: "Panda", img: "assets/imgs/panda.png", value: 1},
    {name: "Roub", img: "assets/imgs/roub.png", value: 0},
    {name: "Zobal", img: "assets/imgs/zob.png", value: 0},
  ]

  mont: any;

  topMounts1 = [];
  topMounts2 = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public jsonsProvider: JsonsProvider,
    public montsProvider: MontsProvider, public utils: UtilsProvider) {

    this.mont = navParams.get('mont')

    if(this.mont != undefined)
    {
      this.type = this.mont.type;
      this.active = this.mont.active;
    }
  }

  ngOnInit() {

    if(this.mont != undefined)
    {
      this.genders.forEach((el) => {
        el.value = 0;
        if(el.name == this.mont.gender)
          el.value = 1;
      })

      this.chars.forEach((el) => {
        el.value = 0;
        if(el.name == this.mont.char)
          el.value = 1;
      })
    }

    this.jsonsProvider.getMonts()
    .subscribe(d=>{
      this.monts = d['items'][0]['items'];
    })

    this.jsonsProvider.getPurities()
    .subscribe(d=>{
      this.purities = d['items'][0]['items'];

      if(this.mont != undefined)
      {
        this.purities.forEach(el => {

          el.value = 0;

          if(el.name == this.mont.purity)
            el.value = 1;
        });
      }

    })

    this.montsProvider.getAll()
    .subscribe(d=>{

      if(this.mont == undefined)
        this.type = d[d.length-1]['type'];

      this.getTopMonts(d);

    })

    this.jsonsProvider.getCapabilities()
    .subscribe(d=>{
      this.capabilities = d['items'][0]['items'];

      if(this.mont != undefined)
      {

        if(this.mont.cap1 != "Nenhuma")
        {
          this.numberOfCaps++;

          this.capabilities.forEach(el => {
            if(el.name == this.mont.cap1)
              el.value = 1;
          });

        }

        if(this.mont.cap2 != "Nenhuma")
        {

          this.numberOfCaps++;

          this.capabilities.forEach(el => {
            if(el.name == this.mont.cap2)
            {
              if(el.value == 1)
                el.value = 2;
              else
                el.value = 1;
            }
          });

        }
      }
    })
  }


  selectCap(cap)
  {
    cap.value++;

    this.numberOfCaps++;

    if(this.numberOfCaps > 2)
    {
      this.resetCaps();
      this.numberOfCaps = 0;
    }

    if(cap.value > 2)
      cap.value = 0;

  }

  resetCaps()
  {
    this.capabilities.forEach((el) => {
      el.value = 0;
    })

  }

  getBackgroundColor(value)
  {
    if(value == 0)
    {
      return "white";
    }
    else if(value == 1)
    {
      return "yellow";
    }
    else if(value == 2)
    {
      return "red";
    }
  }

  getCapBackgroundColor(value)
  {
    if(value == 0)
    {
      return "white";
    }
    else if(value == 2)
    {
      return "red";
    }
  }

  getOpacity(value)
  {
    if(value == 0)
    {
      return 0.2;
    }
    else if(value == 1)
    {
      return 1;
    }
    else if(value == 2)
    {
      return 1;
    }
  }

  setType(id)
  {
    this.type = id;
  }

  saveMont()
  {

    let mont = {};
    mont['type'] = this.type;

    let capsSelected = this.capabilities.filter(this.filterByValue);

    let caps = [];

    capsSelected.forEach((cap) => {
      if(cap.value == 1)
      {
        caps.push(cap.name);
      }
      else if(cap.value == 2)
      {
        caps.push(cap.name);
        caps.push(cap.name);
      }
    })

    if(caps.length == 0)
    {
      mont['cap1'] = "Nenhuma";
      mont['cap2'] = "Nenhuma";
    }
    else if(caps.length == 1)
    {
      mont['cap1'] = caps[0];
      mont['cap2'] = "Nenhuma";
    }
    else {
      mont['cap1'] = caps[0];
      mont['cap2'] = caps[1];
    }

    let gender = this.genders.filter(this.filterByValue);
    mont['gender'] = gender[0].name;

    let purity = this.purities.filter(this.filterByValue);
    mont['purity'] = purity[0].name;

    let char = this.chars.filter(this.filterByValue);
    mont['char'] = char[0].name;

    mont['active'] = this.active;

    if(this.active)
      mont['trade'] = "None"
    else
      mont['trade'] = this.utils.getNowTime();

    if(this.mont != undefined)
    {
      mont['key'] = this.mont.key;
      mont['creation'] = this.mont.creation;
    }
    else
    {
      mont['creation'] = this.utils.getNowTime();
    }

    this.montsProvider.save(mont);

    this.navCtrl.pop();

  }


  filterByValue(obj) {
    if ('value' in obj && obj.value > 0) {
      return true;
    }
  }

  selectPurity(p)
  {
    this.purities.forEach((el) => {
      el.value = 0;
    })

    p.value = 1;
  }

  selectGender(g)
  {
    this.genders.forEach((el) => {
      el.value = 0;
    })

    g.value = 1;
  }

  selectChar(c)
  {
    this.chars.forEach((el) => {
      el.value = 0;
    })

    c.value = 1;
  }


  getTopMonts(monts)
  {
    console.log("montss")
    console.log(monts)
    this.topMounts1 = [];
    this.topMounts2 = [];
   /* let mountsCounter = {};

    if(monts){

    monts.forEach(mont => {
      if(mont.type in mountsCounter)
        mountsCounter[mont.type]++;
      else
        mountsCounter[mont.type] = 1;

    });

    let topMounts = [];


    for(let i = 0; i < 10; i++)
    {

      let quantity = 0, type = "0";

      for (var key in mountsCounter)
      {
        if(mountsCounter[key] > quantity && !this.utils.arrayInclude(topMounts, key))
        {
          quantity = mountsCounter[key];
          type = key;
        }
      }

      topMounts.push(type);
    }

    let count = 0;

    topMounts.forEach((type) => {
      this.monts.forEach(el => {

        if(el.id == type)
          if(count > 4)
            this.topMounts1.push(el);
          else
            this.topMounts2.push(el);

      });
      count++;

    })*/

    this.topMounts1 = [
      {id: 47, name: "Índigo", generation: 3, img: "indigo.png", scrollId: 6},
      {id: 63, name: "Ruivo", generation: 1, img: "ruivo.png", scrollId: 1},
      {id: 53, name: "Marfim", generation: 7, img: "marfim.png", scrollId: 8},
      {id: 15, name: "Amêndoa e Esmeralda", generation: 10, img: "amendoaeesmeralda.png", scrollId: 25},
      {id: 34, name: "Ébano e Esmeralda", generation: 10, img: "ebanoeesmeralda.png", scrollId: 5}
    ]

    this.topMounts2 = [
      {id: 65, name: "Turquesa", generation: 7, img: "turquesa.png", scrollId: 4},
      {id: 41, name: "Esmeralda", generation: 9, img: "esmeralda.png", scrollId: 13},
      {id: 12, name: "Amêndoa", generation: 1, img: "amendoa.png", scrollId: 1},
      {id: 1, name: "Ameixa", generation: 9, img: "ameixa.png", scrollId: 17},
      {id: 61, name: "Púrpura", generation: 5, img: "purpura.png", scrollId: 10}
    ]





  }

  getMountImg(mount)
  {
    return "assets/imgs/monts/" + mount;
  }
}
