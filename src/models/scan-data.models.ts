import { Injectable } from "@angular/core";

@Injectable()
export class ScanDataModel {
    info: string;
    type: string;

    constructor(type: string) {
        this.type = type;
    }
}