import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ManagePage } from '../pages/manage/manage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';
import { MudaPrecoPage } from '../pages/muda-preco/muda-preco';
import { NovoItemPage } from '../pages/novo-item/novo-item';

import { PessoasProvider } from '../providers/pessoas/pessoas';
import { EventosProvider } from '../providers/eventos/eventos';
import { PipesModule } from '../pipes/pipes.module';
import { ComprasProvider } from '../providers/compras/compras';
import { DungeonsProvider } from '../providers/dungeons/dungeons';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    MudaPrecoPage,
    NovoItemPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    PipesModule,

    AngularFireModule.initializeApp({
      apiKey: "AIzaSyC78TrhyDu2zvMmaWhBdfUXzOFChzXFLdk",
    authDomain: "dapp-1407.firebaseapp.com",
    databaseURL: "https://dapp-1407.firebaseio.com",
    projectId: "dapp-1407",
    storageBucket: "dapp-1407.appspot.com",
    messagingSenderId: "1064341481713"
    }),
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    MudaPrecoPage,
    NovoItemPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PessoasProvider,
    EventosProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EventosProvider,
    ComprasProvider,
    DungeonsProvider,
  ]
})
export class AppModule {}
