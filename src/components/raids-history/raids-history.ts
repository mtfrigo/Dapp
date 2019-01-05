import { Component, Input, OnInit} from '@angular/core';
import { RaidsProvider } from '../../providers/raids/raids';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the RaidsHistoryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'raids-history',
  templateUrl: 'raids-history.html'
})
export class RaidsHistoryComponent {

  @Input() name  : string;
  text: string;

  raids: Observable<any>;;

  constructor(private raidsProvider: RaidsProvider) {
    this.raids = raidsProvider.getAll();
  }

  ngOnInit() {


  }

  removeRaid(key: string) {
    if (key) {
      this.raidsProvider.remove(key);
    }
  }


  convertToDateDefault(date)
  {

    let splitedRaw = date.split(' ');
    let splitedDate = splitedRaw[0].split('/');

    return splitedDate[2] + "/" + splitedDate[1] + "/" + splitedDate[0] + " " + splitedRaw[1];
  }

  getDuration(raid)
  {


    let formatedBegin = raid.begin.split(" ")[1];
    let formatedEnd = raid.end.split(" ")[1];


    let splited = formatedBegin.split(":");

    let convertedH = parseInt(splited[0]);
    let convertedM = parseInt(splited[1]);
    let convertedS = parseInt(splited[2]);

    let beginSeconds = convertedH * 3600 + convertedM * 60 + convertedS;

    splited = formatedEnd.split(":");

    convertedH = parseInt(splited[0]);
    convertedM = parseInt(splited[1]);
    convertedS = parseInt(splited[2]);

    let endSeconds = convertedH * 3600 + convertedM * 60 + convertedS;

    let finalH, finalM, finalS;
    let duration = endSeconds - beginSeconds;

    finalH = Math.floor(duration / 3600);
    duration = duration % 3600;

    finalM = Math.floor(duration / 60);
    duration = duration % 60;

    finalS = duration;

    return finalH + "h " + finalM + "m " + finalS + "s";
  }

}
