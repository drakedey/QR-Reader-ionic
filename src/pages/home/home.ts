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

  notificationHistorySubscription: Subscription;

  constructor( 
    private barcodeScanner: BarcodeScanner,
    private toastCtrl: ToastController,
    private platform: Platform,
    private historyService: HistoryProvider
    ) {
      this.setNotificationObservable();
  }

  inViewDidLeave() {
    this.notificationHistorySubscription.unsubscribe();
  }

  async doScan() {
    if(!this.platform.is('cordova')) {
      console.log('here');
      // this.historyService.addHistory('geo:40.6971494,-73.94414320429689')
      // this.historyService.addHistory('http://www.google.com');
      this.historyService.addHistory( `BEGIN:VCARD
VERSION:2.1
N:Kent;Clark
FN:Clark Kent
ORG:
TEL;HOME;VOICE:12345
TEL;TYPE=cell:67890
ADR;TYPE=work:;;;
EMAIL:clark@superman.com
END:VCARD` );
      return;
    }
    try {
      const { cancelled, text } = await this.barcodeScanner.scan();
      if(!cancelled && text) {
        this.historyService.addHistory(text);
      }
    } catch (error) {
      this.showNotification(error);
    }
  }

  setNotificationObservable() {
    this.notificationHistorySubscription = 
    this.historyService.getErrorAsObservable().subscribe(({ message }) => this.showNotification(message));
  }

  showNotification(message: string) {
    const toastNotification = this.toastCtrl.create({
      message,
      duration: 3000
    })

    toastNotification.present();
  }

}
