import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnTheWayService } from './on-the-way.service';


@Injectable({
  providedIn: 'root'
})
export class ConfirmUserRegistrationService extends OnTheWayService  {

  constructor(public http: HttpClient) {
      super('confirmuser', http);
  }

    public confirmUser(key: string) {
      return this.getOne(key);
    }
}
