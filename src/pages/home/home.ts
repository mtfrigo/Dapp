import { Component, ViewChild } from '@angular/core';
import { NavController, Nav, MenuController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any, openTab? : any}>;
  rootPage = 'IndexPage';

  logado : any;

  constructor(public navCtrl: NavController, private menu: MenuController) {
    this.pages = [
      { title: 'Dungeons', component: 'DungeonsPage'},
      { title: 'Raids History', component: 'RaidHistoryPage'},
      { title: 'Monts', component: 'MontsPage'},
    ];

  }

  ionViewDidEnter() {
    // Use the id to enable/disable the menus
    this.menu.enable(true, 'menu1');
    this.menu.enable(false, 'menu2');
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
