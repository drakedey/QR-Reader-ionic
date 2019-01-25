import { Component } from '@angular/core';
//Plugins
import { BarcodeScanner } from '@ionic-native/barcode-scanner'
import { ToastController, Platform, NavParams } from 'ionic-angular';
import { HistoryProvider } from '../../providers/history/history';
import { Subscription } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  errHistorySubscription: Subscription;

  constructor( 
    private barcodeScanner: BarcodeScanner,
    private toastCtrl: ToastController,
    private platform: Platform,
    private historyService: HistoryProvider
    ) {
      this.setErrorScanObservable();
  }

  inViewDidLeave() {
    this.errHistorySubscription.unsubscribe();
  }

  async doScan() {
    if(!this.platform.is('cordova')) {
      console.log('here');
      this.historyService.addHistory('geo:40.6971494,-73.94414320429689')
      // this.historyService.addHistory('http://www.google.com');
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

  setErrorScanObservable() {
    this.errHistorySubscription = 
    this.historyService.getErrorAsObservable().subscribe(err => this.showError(err));
  }

  showError(err: string) {
    const toastErr = this.toastCtrl.create({
      message: err,
      duration: 3000
    })

    toastErr.present();
  }

}
