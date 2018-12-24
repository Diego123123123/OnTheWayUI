import { Injectable, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ThemesService } from '../../services/themes.service';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {


  private userSelected: IUser = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    birthday: '',
    phone: 0,
    roleId: 0,
    imageUserUrl: '',
  };
  private userSubject: Subject<IUser> = new Subject<IUser>();
  public userSubject$: Observable<IUser> = this.userSubject.asObservable();

  constructor(private usersService: UserService) { }

  getUser(): Promise<IUser> {
    return new Promise<IUser>((resolve, reject) => {
      this.usersService.getOneUser().subscribe((response: IUser) => {
          resolve(response);
      }, error => {
        reject(error);
      });
    });
  }

  set User(user: IUser) {
    this.userSelected = user;
    this.userSubject.next(this.userSelected);
  }

  get User() {
    return this.userSelected;
  }

}
