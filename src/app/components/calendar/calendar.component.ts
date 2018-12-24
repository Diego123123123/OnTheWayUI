import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, startOfMonth, startOfWeek, endOfWeek, format } from 'date-fns';
import { Subject } from 'rxjs';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { IEventsCalendar } from '../../models/events-calendar.model';
import { IParams } from '../../models/params.model';
import { EventsCalendarService } from '../../services/events-calendar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarSiteService } from '../../services/calendar-site.service';
import { ScheduleEventServiceService } from '../../services/schedule-event-service.service';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  view: string = 'month';

    viewDate: Date;

  events$: Observable<Array<CalendarEvent<{ eventsCalendar: IEventsCalendar }>>>;

  activeDayIsOpen: boolean = false;

  itemId: any;
  detail: any;
  service: any;

  constructor(private eventsCalendarService: EventsCalendarService, private sitesCalendarService: CalendarSiteService, private eventCalendarService: ScheduleEventServiceService,
    private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('siteId');
    this.detail = this.route.snapshot.paramMap.get('detail');
    if (this.detail === "prefer-event") {
      this.service = this.eventsCalendarService;
      this.viewDate = new Date();
    }
    if (this.detail === "event") {
        this.service = this.eventCalendarService;
        let params: Array<IParams> = [{ key: 'eventId', value: this.itemId }];
        this.service.getEventsbyDate(params).subscribe(response => {
            console.log(response[0].startDate, "DATEEEE");
            this.viewDate = new Date(response[0].startDate);
        });
    }
    if (this.detail === "site") {
       this.service = this.sitesCalendarService;
       this.viewDate = new Date();
    }
   
    this.fetchEvents();
  }
    
  fetchEvents(): void {
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay
    }[this.view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay
    }[this.view];

    let params: Array<IParams> = [
      { key: 'startDate', value: format(getStart(this.viewDate), 'YYYY-MM-DD') },
      { key: 'endDate', value: format(getEnd(this.viewDate), 'YYYY-MM-DD') },
    ];
    if (this.detail === "site" ) {
      params.push({ key: 'siteId', value: this.itemId });
    }
    if (this.detail === "event") {
      params.push({ key: 'eventId', value: this.itemId });
    }
    console.log(params);
    console.log(this.service);
    this.events$ = this.service.getEventsbyDate(params)
      .pipe(
      map((results: IEventsCalendar[]) => {
        return results.map((eventsCalendar: IEventsCalendar) => {
          console.log({ eventsCalendar });
          return {
            title: this.detail === "prefer-event" || this.detail === "event" ? eventsCalendar.nameEvent : eventsCalendar.nameSite,
            start: new Date(eventsCalendar.startDate),
            end: new Date(eventsCalendar.endDate),
            color: colors.blue,
            meta: {
              eventsCalendar
            }
          };
        });
      })
    );
  }

  dayClicked({
    date,
    events
  }: {
    date: Date;
    events: Array<CalendarEvent<{ IEventsCalendar: IEventsCalendar }>>;
  }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventClicked(event: CalendarEvent<{ eventsCalendar: IEventsCalendar }>): void {
    if (this.detail === "prefer-event") {
      this.router.navigate(['/event-detail', event.meta.eventsCalendar.eventId]);
    }
    if (this.detail === "event") {
      this.router.navigate(['/event-detail', this.itemId]);
    }
    else {
      this.router.navigate(['/site-detail', this.itemId]);
    }
  }

  changeView(view: string) {
    this.view = view;
    this.fetchEvents();
  }

}
