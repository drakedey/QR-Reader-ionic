import { Injectable } from '@angular/core';
import { InAppBrowser } from "@ionic-native/in-app-browser";

//Data models
import { ScanDataModel } from '../../models/scan-data.models';
import { Subject, Observable } from 'rxjs';
import { ModalController } from 'ionic-angular';
import { MapPage } from '../../pages/map/map';


@Injectable()
export class HistoryProvider {

  private _history: ScanDataModel[] = [];
  private historySubject = new Subject<ScanDataModel[]>();
  private errorHistorySubject = new Subject<string>();

  constructor(private modaltCtrl: ModalController) {
  }

  getHistoryObservable(): Observable<ScanDataModel[]> {
    return this.historySubject.asObservable();
  }

  getErrorAsObservable(): Observable<string> {
    return this.errorHistorySubject.asObservable();
  }

  getHistory():ScanDataModel[] {
    console.log(this._history);
    return this._history;
  }

  addHistory(text: string) {
    const data = new ScanDataModel(text, this._history.length);
    this._history.unshift(data);
    this.historySubject.next(this._history);
    this.openScann(0);
    this.getHistory();
  }

  openScann( index: number = 0) {
    const scanData = this._history[index];
    this._history.splice(index, 1);
    this._history.unshift(scanData);
    console.log(scanData);
    switch (scanData.type) {
      case 'URL':
        InAppBrowser.create(scanData.info);
        break;
      case 'Map':
        const [lat, lng] = this.parseCoords(scanData.info);
        const modal = this.modaltCtrl.create(MapPage, {lat, lng});
        modal.onDidDismiss(data => {
          if(data.error) {
            this.errorHistorySubject.next(data.error);
          }
        })
        modal.present();
        break;
    
      default:
        break;
    }
  }

  parseCoords(info: string) {
    const coords = info.replace('geo:', '');
    const coordsArray = coords.split(',');
    const lat = Number(coordsArray[0]);
    const lng = Number(coordsArray[1]);
    return [lat, lng];
  }

}
