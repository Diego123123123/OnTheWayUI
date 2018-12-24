import { Injectable } from '@angular/core';
import { OnTheWayService } from 'src/app/services/on-the-way.service';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ScheduleSiteService extends OnTheWayService {

  constructor(private http: HttpClient) {
    super("scheduleconcurrency", http);
  }

  public getScheduleSite(siteId: number) {
    return this.getOne(siteId);
  }

  public patchScheduleSite(identifier: any, patch: any) {
    return this.patch(identifier, patch);
  }

  public postScheduleSite(siteId: number, data) {
    return this.postOne(siteId, data);
  }
}
