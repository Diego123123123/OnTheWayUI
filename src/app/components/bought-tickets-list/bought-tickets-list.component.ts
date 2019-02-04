import { Component, OnInit } from '@angular/core';
import { ITicketEvent } from 'src/app/models/TicketEvent';
import { Router } from '@angular/router';
import { BoughtTicketsListService } from './bought-tickets-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bought-tickets-list',
  templateUrl: './bought-tickets-list.component.html',
  styleUrls: ['./bought-tickets-list.component.scss']
})
export class BoughtTicketsListComponent implements OnInit {

  boughtTickets: Array<ITicketEvent>;
  private eventsRef: Subscription = null;

  constructor( private router: Router, private boughtTicketsListService: BoughtTicketsListService) {
    this.boughtTickets = [];
  }

  ngOnInit() {
    this.eventsRef = this.boughtTicketsListService.boughtTicketsSubject$.subscribe((response) => {
      this.boughtTickets = <Array<ITicketEvent>> this.boughtTicketsListService.BoughtTickets;
    });
  }

  ngOnDestroy() {
    this.eventsRef.unsubscribe();
  }

  showTicket(ticket) {
    this.router.navigate(['/tickets', ticket.ticketId]);
  }

}
