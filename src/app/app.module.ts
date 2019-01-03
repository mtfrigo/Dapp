import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';

import { PipesModule } from '../pipes/pipes.module';
import { DungeonsProvider } from '../providers/dungeons/dungeons';
import { RaidsProvider } from '../providers/raids/raids';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
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
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DungeonsProvider,
    RaidsProvider,
  ]
})
export class AppModule {}
