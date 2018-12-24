import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { ISingleEvent, Event } from '../../models/event';
import { Router, ActivatedRoute } from '@angular/router';
import { IParams } from '../../models/params.model';
import { Subject, Subscription } from 'rxjs';
import { EventListService } from './event-list.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit, OnDestroy {

  events: Array<ISingleEvent>;
  private eventsRef: Subscription = null;

  constructor(private router: Router, private eventListService: EventListService) {
    this.events = [];
  }

  ngOnInit() {
    this.eventsRef = this.eventListService.eventsSubject$.subscribe(() => {
      this.events = <Array<ISingleEvent>> this.eventListService.Events;
      console.log("modificado eventos");
    });
  }

  showEvent(event: ISingleEvent) {
    this.router.navigate(['/event-detail', event.eventId]);
  }

  ngOnDestroy() {
    this.eventsRef.unsubscribe();
  }

}
