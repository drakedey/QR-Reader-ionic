import { Component } from '@angular/core';
//Plugins
import { BarcodeScanner } from '@ionic-native/barcode-scanner'
import { ToastController, Platform } from 'ionic-angular';
import { HistoryProvider } from '../../providers/history/history';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor( 
    private barcodeScanner: BarcodeScanner,
    private toastCtrl: ToastController,
    private platform: Platform,
    private historyService: HistoryProvider
    ) {

  }

  async doScan() {
    if(!this.platform.is('cordova')) {
      console.log('here');
      this.historyService.addHistory('http://www.google.com');
      return;
    }
    try {
      const { cancelled, text } = await this.barcodeScanner.scan();
      if(!cancelled && text) {
        this.historyService.addHistory(text);
      }
    } catch (error) {
      this.showError(error);
    }
  }

  showError(err: string) {
    const toastErr = this.toastCtrl.create({
      message: err,
      duration: 3000
    })

    toastErr.present();
  }

}
