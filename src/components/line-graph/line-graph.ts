import { Component } from '@angular/core';
import { MontsProvider } from '../../providers/monts/monts';
import { UtilsProvider } from '../../providers/utils/utils';

import * as d3 from "d3";
import * as d3Scale from "d3-scale";
import { JsonsProvider } from '../../providers/jsons/jsons';

/**
 * Generated class for the LineGraphComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'line-graph',
  templateUrl: 'line-graph.html'
})
export class LineGraphComponent {

  width  : number = window.innerWidth*0.9;;
  height : number = 600;

  margin : any;

  x: any;
  y: any;
  svg: any;
  g: any;
  linePath: any;

  data: any = [];

  minBarHeight = 1;

  dados = {key: [], value: []};

  keys: any = [];
  values: number[] = [];

  minValue: any;
  maxValue: any;

  linesHeight: any;
  linesWidth:any;

  yTicks: any;
  yTicksArray: number[];
  yTicksScale: any;

  keyMap = {};

  scrolls: any;
  types: any;

  constructor(public montsProvider: MontsProvider,public jsonsProvider: JsonsProvider, public utils: UtilsProvider) {
  }

  ngOnInit()
  {
    this.height = this.height * 0.8;

    this.margin = {top: 0, right: 20, bottom: 40, left: this.width*0.075};

    this.linesHeight = this.height - this.margin.top - this.margin.bottom;
    this.linesWidth = this.width - this.margin.left - this.margin.right;

    this.yTicks = 7;
    this.yTicksArray = [];

    for(var i = 0; i < this.yTicks; i++){
      this.yTicksArray.push(i);
    }

    this.getData();
  }

  getData(): void {

    this.montsProvider.getAllInactives()
      .subscribe(d => {
        this.parseData(d);
      })
  }

  parseData(data){

    let tradesCounter = {};

    data.forEach(mont => {

      let day = mont.creation.split(" ")[0];
      if(day in tradesCounter)
        tradesCounter[day] += this.utils.getScrollById(this.utils.getTypeById(mont.type)['scrollId'])['kamas'];
      else
      {
        tradesCounter[day] = this.utils.getScrollById(this.utils.getTypeById(mont.type)['scrollId'])['kamas'];
      }
    });

    let inactives = [];
    let keyCounter = 0;

    for (var key in tradesCounter)
    {
      this.keys.push(keyCounter);
      this.keyMap[keyCounter] = key;
      this.values.push(tradesCounter[key]);

      inactives.push({id: "Montaria", value: tradesCounter[key], day: keyCounter})

      keyCounter++;

    }

    this.data.push(inactives)

    console.log(this.data)

    var edgeValues = d3.extent(this.values);

    this.maxValue = edgeValues[1];
    this.minValue = 0;

    this.initAxis();

  }



  parseData2(data){

    let tradesCounter = {};

    data.forEach(mont => {

      let day = mont.creation.split(" ")[0];
      if(day in tradesCounter)
        tradesCounter[day]++;
      else
      {
        tradesCounter[day] = 1;
      }
    });

    let inactives = [];
    let keyCounter = 0;

    for (var key in tradesCounter)
    {
      this.keys.push(keyCounter);
      this.keyMap[keyCounter] = key;
      this.values.push(tradesCounter[key]);

      inactives.push({id: "Montaria", value: tradesCounter[key], day: keyCounter})

      keyCounter++;

    }

    this.data.push(inactives)

    var edgeValues = d3.extent(this.values);

    this.maxValue = edgeValues[1];
    this.minValue = 0;

    this.initAxis();

  }

  initAxis(){

    this.x = d3
      .scaleTime().range([0, this.linesWidth])
      .domain(d3.extent(this.keys));

    this.y = d3
      .scaleLinear().range([this.linesHeight, 0])
      .domain([this.minValue, this.maxValue]);

    this.yTicksScale = d3.scaleLinear()
    .range([this.y(this.minValue), this.y(this.maxValue)])
    .domain(d3.extent(this.yTicksArray)).nice();

    var x = this.x;
    var y = this.y;

    this.linePath = d3.line<any>()
    .x( (d)=>  x(d.day))
    .y( (d) => y(d.value)
    );
  }

  getLinesTransform()
  {
    return "translate(" + (this.margin.left+5) + "," + (this.margin.top+5) + ")";
  }

  getTickY(d, i){

    let yTickScale = this.yTicksScale;
    return 'translate(0, ' +  yTickScale(d) + ')';
  }

  getTickYValue(d,i)
  {

    var tickValue = d3Scale.scaleLinear()
      .domain([ 0, this.yTicksArray[this.yTicksArray.length-1]])
      .range([this.minValue, this.maxValue])(i);

    return  Math.round(tickValue);
  }

  getTickX(d){
    return 'translate('+ this.x(d) +', '+ this.linesHeight +')';
  }




}
