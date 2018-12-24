import { Injectable } from '@angular/core';
import { OnTheWayService } from './on-the-way.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IParams } from '../models/params.model';
import { forEach } from '@angular/router/src/utils/collection';
import { ISingleEvent } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class PreferredEventsService extends OnTheWayService {

  constructor(public http: HttpClient) {
    super('preferences/events', http);
   }

   public getEvents(params?: Array<IParams>){
     console.log("obteniendo los eventos preferidos")
    if (params === undefined) {
      return this.getAll();
    }
    let _params = new HttpParams();
    params.forEach(element => {
      _params = _params.set(element.key, element.value);
    });

    let events  = this.getAll(_params);
    console.log(events, "eventos obtenidos del get");
    
    return events;
  }

  public postPreferredEvent(data){
    let result = this.post(data);
    return result;
  }

  public deletePreferredEvent(eventId){
    return this.delete(eventId);
  }

  public getPopularity(id){
    return this.getOne(id);
  }
}
