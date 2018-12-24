import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { EventDetailService } from '../../services/event-detail.service';
import { EventListService } from '../events-list/event-list.service';
import { IParams } from '../../models/params.model';
import { FilterService } from './filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  private timeout = null;
  filterName: any;
  //filterDate: any;
  events: any;
  private category: string;
  @Output('filter') sendPageArg = new EventEmitter<any>();
  constructor(private service: EventDetailService, private filterService: FilterService) {
    this.filterService.NameParam = {key: 'name', value: ''}
   }
  public applyFilter() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout( () =>{
      let params: Array<IParams> = [{key: 'name', value: this.filterName}];
      this.filterService.NameParam = {key: 'name', value: this.filterName};
      this.sendPageArg.emit(params);
    },400);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    clearTimeout(this.timeout);
  }

}
