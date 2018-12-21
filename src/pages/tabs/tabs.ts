import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ManagePage } from '../manage/manage';
import { FotoPage } from '../foto/foto';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FotoPage;
  tab2Root = ManagePage;

  constructor() {

  }
}
