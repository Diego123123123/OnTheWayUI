import { Component, OnInit } from '@angular/core';
import { BalanceEventsService } from '../../../services/balance-events.service';
import { Balance, Ticket, UserTicket, Event } from '../../../models/balance';
import { ActivatedRoute } from '@angular/router';
import { AppError } from '../../../common/errors/app-error';

@Component({
  selector: 'app-balance-events',
  templateUrl: './balance-events.component.html',
  styleUrls: ['./balance-events.component.scss']
})
export class BalanceEventsComponent implements OnInit {
  eventId: number
  balance: Balance;
  event: Event;
  tickets: Ticket[];
  userTickets: UserTicket[];
  headTickets = ['Type', 'Price', 'Available', 'Sold', 'Remaining', 'Amount obtained'];
  headUserTickets = ['Nro', 'Owner', 'Customer', 'Purchase date', 'Price', 'Status'];

  constructor(private balanceService: BalanceEventsService, private route: ActivatedRoute) {
    this.eventId = Number(this.route.snapshot.paramMap.get('eventId'));
  }

  ngOnInit() {
    this.balanceService.getBalance(this.eventId).subscribe(response => {
      this.balance = response;
      this.event = this.balance.event;
      this.tickets = this.balance.tickets;
      this.userTickets = this.balance.userTickets;
    }, (error: AppError) => {
    });
  }

}
