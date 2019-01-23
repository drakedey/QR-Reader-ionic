import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage, SavedPage } from "../pages.index";

@IonicPage()
@Component({
  template:`
    <ion-tabs color="primary">
      <ion-tab tabIcon="qr-scanner" tabTitle="Scann" [root]="homePage"></ion-tab>
      <ion-tab tabIcon="bookmark" tabTitle="History" [root]="savedPage"></ion-tab>
    </ion-tabs>
  `
})
export class TabsPage {

  homePage: any;
  savedPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.seTabPages();
  }

  seTabPages() {
    this.homePage = HomePage;
    this.savedPage = SavedPage;
  }

}
