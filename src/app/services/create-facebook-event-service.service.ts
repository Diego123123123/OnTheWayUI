import { Injectable } from '@angular/core';
import { OnTheWayService } from './on-the-way.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreateFacebookEventService extends OnTheWayService {

  constructor(public http: HttpClient) {
    super('facebook', http);
  }
  public postFacebookEvent(facebookEvent) {
    return this.post(facebookEvent);
  }
}
