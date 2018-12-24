import { Component, OnInit} from '@angular/core';
import { RecentEventsService } from '../../services/recent-events.service';
import { ISingleEvent } from '../../models/event'
import { EventsService } from '../../services/events.service';
import { EventListService } from '../events-list/event-list.service';
import { IParams } from '../../models/params.model';
import { FilterService } from '../filter/filter.service';
import { PaginatorService } from '../paginator/paginator.service';

@Component({
  selector: 'app-recent-events',
  templateUrl: './recent-events.component.html',
  styleUrls: ['./recent-events.component.scss']
})
export class RecentEventsComponent implements OnInit {
  isFilter: boolean;
  filter: any;
  isAdmin: boolean = false;
  notEvents = false;
  constructor(private recentEventsService: RecentEventsService, private eventsListService: EventListService, private eventsService: EventsService,
    private filterService: FilterService, private paginatorService: PaginatorService) {
  }

  public getRecentEvents() {
    this.filterService.Params = [this.paginatorService.PageSize, this.paginatorService.PageNumber, this.filterService.NameParam];
    if (this.filterService.Params[2].value === '') {
      this.recentEventsService.getRecentEvents(this.filterService.Params).subscribe((response: Array<ISingleEvent>) => {
        if ([...response['results']].length == 0) {
          this.notEvents = true;
        }
        else {
          this.eventsListService.Events = [...response['results']];
          this.paginatorService.TotalElements = response['count'];
        }
      });
    }
    else {
      this.filterService.Params = [this.paginatorService.PageSize, this.paginatorService.PageNumber, this.filterService.NameParam];
      this.eventsService.getEvents(this.filterService.Params).subscribe((response: Array<ISingleEvent>) => {
        if ([...response['results']].length == 0) {
          this.notEvents = true;
        }
        else {
          this.eventsListService.Events = [...response['results']];
          this.paginatorService.TotalElements = response['count'];
        }
      });
    }
  }


  ngOnInit() {
    this.getRecentEvents();
    let role = sessionStorage.getItem('role');
    if ((role === '1') || (role === '2')) {
      this.isAdmin = true;
    }
  }

  refreshEvents(data?: Array<IParams>) {
      this.getRecentEvents();
  }
}
