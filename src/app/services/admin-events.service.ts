import { Injectable } from '@angular/core';
import { OnTheWayService } from 'src/app/services/on-the-way.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IParams } from '../models/params.model';


@Injectable({
  providedIn: 'root'
})
export class AdminEventsService extends OnTheWayService{

  constructor(private http: HttpClient ) {
    super("admininevents", http);
  }

  public getEvents(params?: Array<IParams>){
    if (params === undefined) {
      return this.getAll();
    }
    let _params = new HttpParams();
    params.forEach(element => {
      _params = _params.set(element.key, element.value);
    });
    return this.getAll(_params);
  }

  public deleteEvent(identifier: number) {
    return this.delete(identifier);
  }
}
