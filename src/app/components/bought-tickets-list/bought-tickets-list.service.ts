import { Injectable } from '@angular/core';
import { ITicketEvent } from 'src/app/models/TicketEvent';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoughtTicketsListService {

  private boughtTickets: Array<ITicketEvent>;
  private boughtTicketsSubject = new Subject<Array<ITicketEvent>>();
  public boughtTicketsSubject$ = this.boughtTicketsSubject.asObservable();

  constructor() { }

  set BoughtTickets( boughtTickets: Array<ITicketEvent> ) {
    this.boughtTickets = [...boughtTickets];
    this.boughtTicketsSubject.next(this.boughtTickets);
  }

  get BoughtTickets(): Array<ITicketEvent> {
    return this.boughtTickets;
  }
}
