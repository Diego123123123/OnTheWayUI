import { Injectable } from '@angular/core';
import { OnTheWayService } from 'src/app/services/on-the-way.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PricesSiteService extends OnTheWayService {

  constructor(private http: HttpClient) {
    super("pricesites", http);
  }

  public createPrice(price: any) {
    return this.post(price);
  }

  public patchPrice(identifier: any, patch: any) {
    return this.patch(identifier, patch);
  }

  public removePrice(identifier: any) {
    return this.delete(identifier);
  }
}
