import { Injectable } from '@angular/core';
import { OnTheWayService } from 'src/app/services/on-the-way.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventDetailService extends OnTheWayService{

  constructor(private http: HttpClient ) {
    super("events", http);
  }

  public getEventDetail(eventId: number){
    return this.getOne(eventId);
  }

  public getAllEventsFilter(data: any = null){
    return this.getAll(data);
  }

  public getFilterEventsPaginate(data: any = null){
    return this.getAll(data);
  }

  public postEvent(data){
    return this.post(data);
  }
}
