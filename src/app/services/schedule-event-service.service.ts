import { Injectable } from '@angular/core';
import { IParams } from '../models/params.model';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { OnTheWayService } from './on-the-way.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleEventServiceService extends OnTheWayService {

  constructor(private http: HttpClient) {
    super('datesscheduleinevent', http);
  }

  getEventsbyDate(params?: Array<IParams>, siteId = null) {
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
