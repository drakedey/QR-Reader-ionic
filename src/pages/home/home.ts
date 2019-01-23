import { Component } from '@angular/core';
//Plugins
import { BarcodeScanner } from '@ionic-native/barcode-scanner'
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private barcodeScanner: BarcodeScanner, private toastCtrl: ToastController) {

  }

  async doScan() {
    try {
      const result = await this.barcodeScanner.scan();
      console.log(result);
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
