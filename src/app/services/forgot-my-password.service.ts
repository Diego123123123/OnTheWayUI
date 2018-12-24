import { Injectable } from '@angular/core';
import { OnTheWayService } from './on-the-way.service';
import { HttpClient } from '@angular/common/http';
import { IForgot } from '../models/forgot-my-password.model';

@Injectable({
  providedIn: 'root'
})
export class ForgotMyPasswordService extends OnTheWayService {

  constructor(public http: HttpClient) {
    super('forgotmypassword', http);
  }

  public forgotMyPassword(user: IForgot) {
    return this.post(user);
  }
}
