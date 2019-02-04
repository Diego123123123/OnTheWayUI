import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITicketEvent } from 'src/app/models/TicketEvent';

@Component({
  selector: 'app-bought-ticket',
  templateUrl: './bought-ticket.component.html',
  styleUrls: ['./bought-ticket.component.scss']
})
export class BoughtTicketComponent implements OnInit {

  @Input('boughtTicket') boughtTicket: ITicketEvent;
  @Output() eventClick: EventEmitter<ITicketEvent> = new EventEmitter<ITicketEvent>();

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.eventClick.emit(this.boughtTicket);
  }
}
