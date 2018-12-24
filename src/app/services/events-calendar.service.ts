import { Injectable } from '@angular/core';
import { IParams } from '../models/params.model';
import { IEventsCalendar } from '../models/events-calendar.model';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { OnTheWayService } from './on-the-way.service';
import { IPatch } from '../models/patch.model';

@Injectable({
  providedIn: 'root'
})
export class EventsCalendarService extends OnTheWayService {

  constructor(private http: HttpClient) { 
    super('preferences', http);
  }

  getEventsbyDate(params?: Array<IParams>) {
    if (params === undefined) {
      return this.getAll();
    }
    let _params = new HttpParams();
    params.forEach(element => {
      _params = _params.set(element.key, element.value);
    });
    return this.getAll(_params);
  }

  patchRating(id: number, data: Array<IPatch> ) {
    return this.patch(id, data);
  }
}
