import { Injectable } from "@angular/core";

@Injectable()
export class ScanDataModel {
    info: string;
    type: string;
    index: number;
    allowedTypes: any[] = [
      { prefix: 'http', literalType: 'URL' },
      { prefix: 'geo', literalType: 'Map' },
    ]
    constructor(text: string, index: number) {
        this.index = index;
        this.info = text
        //getting the type of scann
        const { literalType } = this.allowedTypes.find(({ prefix }) => text.startsWith(prefix))
        this.type = literalType ? literalType : 'undefined';
    }
}