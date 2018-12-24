import { Component, OnInit } from '@angular/core';
import { EventsCalendarService } from '../../services/events-calendar.service';
import { IParams } from '../../models/params.model';
import { IEventsCalendar } from '../../models/events-calendar.model';

@Component({
  selector: 'app-past-events',
  templateUrl: './past-events.component.html',
  styleUrls: ['./past-events.component.scss']
})
export class PastEventsComponent implements OnInit {
  pastEvents: IEventsCalendar[];

  constructor(private eventsPreferedService: EventsCalendarService) { }

  ngOnInit() {
    var params: Array<IParams> = [{key: 'past', value: true}]
    this.eventsPreferedService.getEventsbyDate(params).subscribe((response : Array<IEventsCalendar>) => {
      this.pastEvents = [...response];
    });
  }

  starPaint(value: number) {
    var rate = [];
    for (let index = 0; index < 5; index++) {
      let val: boolean = false;
      if(index < /*this.comment.rate*/ value) {
        val = true;
      }
      rate = [...rate, val];
    }
    return rate;
  }

}
