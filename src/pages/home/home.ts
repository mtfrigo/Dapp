import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any, openTab? : any}>;
  rootPage = 'DungeonsPage';

  logado : any;

  constructor(public navCtrl: NavController) {
    this.pages = [
      { title: 'Festa', component: 'FestaTabsPage' },
      { title: 'Top', component: 'TopTabsPage'},
      { title: 'Administrção', component: 'AdmTabsPage'},
    ];

  }

  login()
  {
    this.navCtrl.push("LoginPage", { logado : this.logado })
  }

  openPage(page) {
    this.nav.setRoot(page.component, { openTab: page.openTab });
  }

  getLoginPhoto()
  {
  }
}
