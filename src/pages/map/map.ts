import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  styles: [`
    agm-map {
      height: 100%;
    }
  `],
})
export class MapPage {

  lat: number;
  lng: number;

  constructor(public navParams: NavParams, private viewCtrl: ViewController) {
    this.validateAndAssingValues();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

  validateAndAssingValues() {
    const lat = this.navParams.get('lat');
    const lng = this.navParams.get('lng');
    if(isNaN(lat) || isNaN(lng))
      this.closeModal({error: 'Invalid Coordinates'});
    else 
      this.lat = lat;
      this.lng = lng;
  }

  closeModal(data = {}) {
    this.viewCtrl.dismiss(data);
  }

}
