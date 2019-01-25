import { Injectable } from '@angular/core';
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';


//Data models
import { ScanDataModel } from '../../models/scan-data.models';
import { Subject, Observable } from 'rxjs';
import { ModalController, Platform } from 'ionic-angular';
import { MapPage } from '../../pages/map/map';


@Injectable()
export class HistoryProvider {

  private _history: ScanDataModel[] = [];
  private historySubject = new Subject<ScanDataModel[]>();
  private notidicationSubject = new Subject<any>();

  constructor(
    private modaltCtrl: ModalController,
    private contacts: Contacts,
    private platform: Platform) {
  }

  getHistoryObservable(): Observable<ScanDataModel[]> {
    return this.historySubject.asObservable();
  }

  getErrorAsObservable(): Observable<any> {
    return this.notidicationSubject.asObservable();
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
          const { error } = data;
          if(error) {
            this.notidicationSubject.next({message: error});
          }
        })
        modal.present();
        break;
      case 'Contact':
        if(this.platform.is('cordova'))
          this.createContact(scanData.info);
        else
          this.notidicationSubject.next({message: 'Something is wrong with your device'});
        break;
      default:
        break;
    }
  }

  private createContact(info: string) {
    const campos = this.parseVcard(info);
    console.log(campos);
    let contact = this.contacts.create();
    const [ firstName, lastName ] = campos.fn.split(" ");
    contact.name = new ContactName(null, firstName, lastName);
    contact.phoneNumbers = campos.tel.map(tel => {
      console.log(tel);
      return new ContactField(tel.meta.TYPE.toLowerCase(), tel.value[0]);
    });
    contact.save().then(() => 
    this.notidicationSubject.next({message: 'Contact created'}),
    (err: any) => this.notidicationSubject.next({message: 'Something went wrong'}));
  }

  private parseVcard( input:string ): any {

    var Re1 = /^(version|fn|title|org):(.+)$/i;
    var Re2 = /^([^:;]+);([^:]+):(.+)$/;
    var ReKey = /item\d{1,2}\./;
    var fields = {};

    input.split(/\r\n|\r|\n/).forEach(function (line) {
        var results, key;

        if (Re1.test(line)) {
            results = line.match(Re1);
            key = results[1].toLowerCase();
            fields[key] = results[2];
        } else if (Re2.test(line)) {
            results = line.match(Re2);
            key = results[1].replace(ReKey, '').toLowerCase();

            var meta = {};
            results[2].split(';')
                .map(function (p, i) {
                var match = p.match(/([a-z]+)=(.*)/i);
                if (match) {
                    return [match[1], match[2]];
                } else {
                    return ["TYPE" + (i === 0 ? "" : i), p];
                }
            })
                .forEach(function (p) {
                meta[p[0]] = p[1];
            });

            if (!fields[key]) fields[key] = [];

            fields[key].push({
                meta: meta,
                value: results[3].split(';')
            })
        }
    });

    return fields;
};

  private parseCoords(info: string) {
    const coords = info.replace('geo:', '');
    const coordsArray = coords.split(',');
    const lat = Number(coordsArray[0]);
    const lng = Number(coordsArray[1]);
    return [lat, lng];
  }

}
