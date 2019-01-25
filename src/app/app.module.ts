import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {
  HomePage,
  MapPage,
  SavedPage,
  TabsPage
} from "../pages/pages.index";

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HistoryProvider } from '../providers/history/history';
import { AgmCoreModule } from '@agm/core';

//You can import it from the file you want
import { GOOGLE_MAPS_API_KEY } from "../../secret";
import { Contacts } from '@ionic-native/contacts';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    SavedPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: GOOGLE_MAPS_API_KEY
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPage,
    SavedPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    BarcodeScanner,
    HistoryProvider,
    Contacts
  ]
})
export class AppModule { }
