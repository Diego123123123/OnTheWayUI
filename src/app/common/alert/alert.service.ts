import { Injectable } from '@angular/core';
import { IAlert } from './alerts.model';
import { BehaviorSubject, Subject } from '../../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertSubject = new Subject<IAlert>();
  public alertSubject$ = this.alertSubject.asObservable();
  private alert: IAlert;

  constructor() { }

  public set Options( alert: IAlert ) {
    this.alert = {...alert};
    this.alertSubject.next(this.alert);
  }

  public get Options(): IAlert {
    return this.alert;
  }
}
