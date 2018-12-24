import { Injectable } from '@angular/core';
import { OnTheWayService } from './on-the-way.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService extends OnTheWayService{
  constructor(public http: HttpClient) {
    super('schedules', http);
  }
  public postSchedule(schedule){
    return this.post(schedule);
  }
}