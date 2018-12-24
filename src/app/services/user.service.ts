import { Injectable } from '@angular/core';
import { OnTheWayService } from './on-the-way.service';
import { HttpClient } from '@angular/common/http';
import { IUser, IUserPatch } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends OnTheWayService {

  constructor(public http: HttpClient) {
    super('users', http);
  }

  public getUsers(){
      return this.getAll();
  }

  public addUser(user: IUser) {
    return this.post(user);
  }

  public getOneUser(){
    return this.getOne('personal');
  }

  public patchUser(data: Array<IUserPatch>) {
     return this.patch('', data);
  }
}
