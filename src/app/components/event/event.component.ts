import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ISingleEvent } from '../../models/event';
import { CategoriesService } from 'src/app/services/categories.service';
import { element } from 'protractor';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  @Input('event') event: ISingleEvent;
  @Output() eventClick: EventEmitter<ISingleEvent> = new EventEmitter<ISingleEvent>();
  categoryIcon: String;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.categoryIcon = this.categoriesService.Categories.find(element => element.categoryName === this.event.nameCategory).iconName;
  }

  onClick() {
    this.eventClick.emit(this.event);
  }

}
