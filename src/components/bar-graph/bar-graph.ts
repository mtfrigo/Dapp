import { Component } from '@angular/core';
import { MontsProvider } from '../../providers/monts/monts';

import * as d3 from "d3";
import * as d3Scale from "d3-scale";
import { UtilsProvider } from '../../providers/utils/utils';


/**
 * Generated class for the BarGraphComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'bar-graph',
  templateUrl: 'bar-graph.html'
})
export class BarGraphComponent {


  width  : number = window.innerWidth;;
  height : number = 600;

  margin : any;

  x: any;
  y: any;
  svg: any;
  g: any;

  data: any = [];

  minBarHeight = 1;

  dados = {key: [], value: []};

  keys: any = [];
  values: number[] = [];

  minValue: any;
  maxValue: any;

  barsHeight: any;
  barsWidth:any;

  xTicks: any;
  xTicksArray: number[];
  xTicksScale: any;

  constructor(public montsProvider: MontsProvider, public utils: UtilsProvider) {
  }


  ngOnInit() {

    this.margin = {top: 5, right: 40, bottom: 50, left: 10};

    this.barsHeight = this.height - this.margin.top - this.margin.bottom;
    this.barsWidth = this.width - this.margin.left - this.margin.right;

    this.xTicks = 7;
    this.xTicksArray = [];

    for(var i = 0; i < this.xTicks; i++){
      this.xTicksArray.push(i);
    }

    this.getData();

  }

  getBarsTransform()
  {
    return "translate(" + (this.margin.left+5) + "," + (this.margin.top+5) + ")";
  }

  getData(): void {

    this.montsProvider.getAll()
      .subscribe(d => {
        this.parseData(d);
      })
  }


  parseData(data){

    let mountsCounter = {};

    data.forEach(mont => {
      if(mont.type in mountsCounter)
        mountsCounter[mont.type]++;
      else
      {
        mountsCounter[mont.type] = 1;
      }
    });

    for (var key in mountsCounter)
    {
      this.keys.push(key);
      this.values.push(mountsCounter[key]);

      this.data.push({id: key, value: mountsCounter[key]})
    }

    var edgeValues = d3.extent(this.values);

    this.maxValue = edgeValues[1];
    this.minValue = edgeValues[0];


    this.initAxis();

  }

  initAxis() {

    this.x = d3Scale.scaleLinear()
      .rangeRound([this.barsWidth, 0])
      .domain([this.minValue, this.maxValue]).nice();

    this.y = d3.scaleBand()
      .domain(this.keys)
      .rangeRound([0, this.barsHeight])
      .padding(0.1);

    this.xTicksScale = d3Scale.scaleLinear()
      .rangeRound([this.x(this.minValue), this.x(this.maxValue)])
      .domain(d3.extent(this.xTicksArray)).nice();

  }

  getBarX(d) {
    return this.x(d);
  }

  getBarWidth(d) {

    var barHeight = this.x(d);

    var zeroPosition = this.x(0);

    return Math.abs(barHeight - zeroPosition);
  }

  getBarColor(d)
  {
    return 'red';
  }

  getTickXValue(d,i)
  {
    return Math.floor(d3Scale.scaleLinear()
      .domain(d3.extent(this.xTicksArray))
      .range([this.maxValue, this.minValue])(i));
  }

  getTickX(d, i){
    return 'translate(0, ' +  this.xTicksScale(d) + ')';
  }

  getTickY(d, i){
    return 'translate('+ this.y(d.id) +', '+ this.barsHeight +')';
  }

  getTypeName(d)
  {
    let type = this.utils.getTypeById(d);
    return type['name']
  }


}
