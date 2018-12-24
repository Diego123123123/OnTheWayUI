import { Injectable } from '@angular/core';
import { OnTheWayService } from 'src/app/services/on-the-way.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventsInSiteService extends OnTheWayService {

  constructor(private http: HttpClient) {
    super("eventsinsite", http);
  }

  public getEventInSite(siteId: number) {
    return this.getOne(siteId);
  }
}
