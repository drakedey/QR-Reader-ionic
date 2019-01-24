import { Injectable } from '@angular/core';
import { InAppBrowser } from "@ionic-native/in-app-browser";

//Data models
import { ScanDataModel } from '../../models/scan-data.models';
import { Subject, Observable } from 'rxjs';


@Injectable()
export class HistoryProvider {

  private _history: ScanDataModel[] = [];
  public historySubject = new Subject<ScanDataModel[]>();

  constructor() {
  }

  getHistoryObservable(): Observable<ScanDataModel[]> {
    return this.historySubject.asObservable();
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
    switch (scanData.type) {
      case 'http':
        InAppBrowser.create(scanData.info);
        break;
    
      default:
        break;
    }
  }

}
