import { Injectable } from "@angular/core";

@Injectable()
export class ScanDataModel {
    info: string;
    type: string;
    index: number;

    constructor(text: string, index: number) {
        this.type = undefined;
        this.index = index;
        this.info = text
        if(text.startsWith('http')) {
            this.type = 'http';
        }
    }
}