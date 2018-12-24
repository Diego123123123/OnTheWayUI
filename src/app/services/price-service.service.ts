import { Injectable } from '@angular/core';
import { OnTheWayService } from './on-the-way.service';
import { HttpClient } from '@angular/common/http';
import { IPrice } from '../models/price-model';
import { IPatch } from '../models/patch.model';

@Injectable({
  providedIn: 'root'
})

export class PriceService extends OnTheWayService {

    constructor(public http: HttpClient) {
        super('prices', http);
    }
    public createPrice(price: IPrice) {
        return this.post(price);
    }

    public patchPrice(identifier: any, patch: any) {
        return this.patch(identifier, patch);
    }

    public removePrice(identifier: any) {
        return this.delete(identifier);
    }
}
