import { Component, OnInit } from '@angular/core';
import { UsersForEventsService } from '../../../services/users-for-events.service';
import { AdminEventsService } from '../../../services/admin-events.service';
import { FilterService } from '../../filter/filter.service';
import { PaginatorService } from '../../paginator/paginator.service';
import { PreferredEventsService } from '../../../services/preferred-events.service';
import { EventsService } from '../../../services/events.service';
import { IParams } from '../../../models/params.model';
import { StatusEvent } from '../../../models/status-event.model';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-deleted-events',
  templateUrl: './deleted-events.component.html',
  styleUrls: ['./deleted-events.component.scss']
})
export class DeletedEventsComponent implements OnInit {
  private events: any;

  constructor(private serviceUserByEvent: UsersForEventsService, private adminEventsservice: AdminEventsService,
    private filterService: FilterService, private paginatorService: PaginatorService, private preferences: PreferredEventsService,
    private eventsService: EventsService) {
    this.events = {};
  }

  
  ngOnInit() {
    this.adminEventsservice.getEvents().subscribe(response => {
      this.events = response['results'];
      for (let event of this.events) {
        this.preferences.getPopularity(event.eventId).subscribe(data => {
          event.popularidad = data;
        });
      }
      this.refreshEvents();
    });
  }

  getNumberUsersByEvent(event) {
    this.serviceUserByEvent.getUsers(this.events[event]['id']).subscribe(response => {
      this.events[event]['numberUsers'] = response['totalUsers'];
    });
  }

  refreshEvents(data?: Array<IParams>) {
    this.getDeletedEvents();
  }

  async getDeletedEvents() {
    this.filterService.Params = [this.paginatorService.PageSize, this.paginatorService.PageNumber, this.filterService.NameParam, { key: "StatusId", value: StatusEvent.Deleted }];
    if (this.filterService.Params[2].value === '') {
      this.adminEventsservice.getEvents(this.filterService.Params).subscribe(response => {
        this.events = response['results'];
        for (let event of this.events) {
          this.preferences.getPopularity(event.eventId).subscribe(data => {
            event.popularidad = data;
          });
        }
        this.paginatorService.TotalElements = response['count'];
        for (var _i = 0; _i < this.events.length; _i++) {
          this.getNumberUsersByEvent(_i);
        }
      });
    }
    else {
      this.filterService.Params = [this.paginatorService.PageSize, this.paginatorService.PageNumber, this.filterService.NameParam, { key: "StatusId", value: StatusEvent.Deleted }];
      this.adminEventsservice.getEvents(this.filterService.Params).subscribe(response => {
        this.events = response['results'];
        for (let event of this.events) {
          this.preferences.getPopularity(event.eventId).subscribe(data => {
            event.popularidad = data;
          });
        }
        this.paginatorService.TotalElements = response['count'];
        for (var _i = 0; _i < this.events.length; _i++) {
          this.getNumberUsersByEvent(_i);
        }
      });
    }
  }

}
