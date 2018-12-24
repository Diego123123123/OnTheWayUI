import { Injectable } from '@angular/core';
import { OnTheWayService } from './on-the-way.service';
import { HttpClient } from '@angular/common/http';
import { IUser, IUserPatch } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersForEventsService extends OnTheWayService {
  
  constructor(public http: HttpClient) {
    super('usersbyevents', http);
  }
  public getUsers(id: number){
    return this.getOne(id);
  }
}
