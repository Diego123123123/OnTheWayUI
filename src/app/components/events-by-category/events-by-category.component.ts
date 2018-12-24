import { Component, OnInit} from '@angular/core';
import { Event } from '../../models/event'
import { EventsService } from '../../services/events.service';
import { EventListService } from '../events-list/event-list.service';
import { FilterService } from '../filter/filter.service';
import { PaginatorService } from '../paginator/paginator.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-events-by-category',
  templateUrl: './events-by-category.component.html',
  styleUrls: ['./events-by-category.component.scss']
})
export class EventsByCategoryComponent implements OnInit {  
  filter: any;
  isAdmin: boolean = false;
  category: String = "";
  constructor(private eventsListService: EventListService, private eventsService: EventsService,
    private filterService: FilterService, private paginatorService: PaginatorService,
    private route: ActivatedRoute ) { 
  }

  public getCategoryEvents() {
    this.paginatorService.Categories = true;
    this.eventsListService.CategoryName = this.route.snapshot.paramMap.get('category');
    this.category = this.eventsListService.CategoryName;
    this.filterService.Params = [this.paginatorService.PageSize, this.paginatorService.PageNumber, this.filterService.NameParam, {key: 'nameCategory', value: this.eventsListService.CategoryName}];
    this.eventsService.getEvents(this.filterService.Params).subscribe((response: Array<Event>) => {
      this.eventsListService.Events = [...response['results']];
      this.paginatorService.TotalElements = response['count'];
      this.paginatorService.Categories = true;
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let newCategory = params['category'];
      if(newCategory != this.eventsListService.CategoryName)
        this.paginatorService.PageNumber.value = 1;
      this.getCategoryEvents();
    });
    let role = sessionStorage.getItem('role');
    if((role === '1')||(role === '2')){
      this.isAdmin = true;
    }
  }
}
