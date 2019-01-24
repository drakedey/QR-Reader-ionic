import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, Tabs } from 'ionic-angular';
import { HistoryProvider } from '../../providers/history/history';
import { ScanDataModel } from '../../models/scan-data.models';
import { Subscription } from 'rxjs';

/**
 * Generated class for the SavedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-saved',
  templateUrl: 'saved.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavedPage {

  scanHistory: ScanDataModel[] = [];
  scanHistoryObservable: Subscription;

  constructor(
    private historyService: HistoryProvider,
    private tabs: Tabs,
    private cdr: ChangeDetectorRef
    ) {
    this.scanHistory = this.historyService.getHistory();
    console.log(this.scanHistory);
    this.setScannHistoryObservable();
  }

  inViewDidLeave() {
    this.scanHistoryObservable.unsubscribe();
  }

  openScan(index: number) {
    this.historyService.openScann(index);
    console.log(index);
  }

  setScannHistoryObservable() {
    this.scanHistoryObservable =
    this.historyService.
    getHistoryObservable().subscribe( history => {
      this.scanHistory = history;
      console.log(this.scanHistory);
      this.cdr.detectChanges();
    });
  }

  goToScan() {
    this.tabs.select(0);
  }



}
