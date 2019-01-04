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

}
