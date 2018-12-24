import { Injectable } from '@angular/core';
import { OnTheWayService } from './on-the-way.service';
import { HttpClient } from '@angular/common/http';
import { IPassword } from '../models/change-password.model';


@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService extends OnTheWayService {

  constructor(public http: HttpClient) {
    super('confirmpassword', http);
  }

  public changePassword(key: any, password: IPassword) {
    return this.patch(key, password);
  }
}
