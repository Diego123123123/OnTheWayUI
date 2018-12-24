import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Site } from '../../models/site';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {

  @Input('site') site: Site;
  @Output() eventClick: EventEmitter<Site> = new EventEmitter<Site>();
 
  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.eventClick.emit(this.site);
  }

}
