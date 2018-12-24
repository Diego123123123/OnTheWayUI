import { Injectable } from '@angular/core';
import { OnTheWayService } from './on-the-way.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IParams } from '../models/params.model';

@Injectable({
  providedIn: 'root'
})
export class RecentEventsService extends OnTheWayService {
  constructor(public http: HttpClient) {
    super('recent-events', http);
  }

  public getRecentEvents(params?: Array<IParams>){
    if (params === undefined) {
      return this.getAll();
    }
    let _params = new HttpParams();
    params.forEach(element => {
      _params = _params.set(element.key, element.value);
    });
    return this.getAll(_params);
  }
}