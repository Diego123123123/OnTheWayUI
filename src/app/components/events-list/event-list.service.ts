import { Injectable } from '@angular/core';
import { RecentEventsService } from '../../services/recent-events.service';
import { ISingleEvent } from '../../models/event';
import { OnTheWayService } from '../../services/on-the-way.service';
import { Subject } from 'rxjs';
import { IParams } from '../../models/params.model';

@Injectable({
  providedIn: 'root'
})
export class EventListService {

  private events: Array<ISingleEvent>;
  private categoryName: string = null;
  private eventsSubject = new Subject<Array<ISingleEvent>>();
  public eventsSubject$ = this.eventsSubject.asObservable();
  private categoryNameSubject = new Subject<String>();
  public categoryNameSubject$ = this.categoryNameSubject.asObservable();
  
  constructor() { }

  set Events( events: Array<ISingleEvent> ) {
    this.events = [...events];
    this.eventsSubject.next(this.events);
  }

  get Events(): Array<ISingleEvent> {
    return this.events;
  }

  set CategoryName(name: string) {
    this.categoryName = name;
    this.categoryNameSubject.next(this.categoryName);
  }

  get CategoryName() {
    return this.categoryName;
  }
}
