import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventListService } from '../events-list/event-list.service';
import { IParams } from '../../models/params.model';
import { PreferredEventsService } from '../../services/preferred-events.service';
import { FilterService } from '../filter/filter.service';
import { PaginatorService } from '../paginator/paginator.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  private eventsRef: Subscription = null;

  constructor(private eventsListService: EventListService, private preferredEventsService: PreferredEventsService,
    private filterService: FilterService, private paginatorService: PaginatorService) { }
  //EventPreferredService

  ngOnInit() {
    this.paginatorService.PageNumber.value = 1;
    this.eventsListService.CategoryName = null;
    this.getPreferredEvents();
  }

  public getPreferredEvents() {
    console.log('preferred events');
    this.filterService.Params = [this.paginatorService.PageSize, this.paginatorService.PageNumber, this.filterService.NameParam];
    console.log('parametris', this.filterService.Params);
    //obtain the preferred events of the user
    this.preferredEventsService.getEvents(this.filterService.Params).subscribe((response: Array<Event>) => {
      this.eventsListService.Events = [...response['results']];
      this.paginatorService.TotalElements = response['count'];

      console.log(this.eventsListService.Events);
      console.log("eventos ya obtenidos");
    });
  }

  refreshEvents(data?: Array<IParams>) {
      this.getPreferredEvents();
  }
}
 
