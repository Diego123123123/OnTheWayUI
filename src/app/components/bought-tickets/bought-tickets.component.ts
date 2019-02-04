import { Component, OnInit } from '@angular/core';
import { TicketsService } from 'src/app/services/admin/tickets/tickets.service';
import { BoughtTicketsListService } from '../bought-tickets-list/bought-tickets-list.service';
import { FilterService } from '../filter/filter.service';
import { PaginatorService } from '../paginator/paginator.service';
import { ITicketEvent } from 'src/app/models/TicketEvent';
import { IParams } from 'src/app/models/params.model';

@Component({
  selector: 'app-bought-tickets',
  templateUrl: './bought-tickets.component.html',
  styleUrls: ['./bought-tickets.component.scss']
})
export class BoughtTicketsComponent implements OnInit {

  constructor(private ticketsService: TicketsService, private boughtTicketListService: BoughtTicketsListService,
    private filterService: FilterService, private paginatorService: PaginatorService) {

  }

  getBoughtTickets() {
    this.filterService.Params = [this.paginatorService.PageSize, this.paginatorService.PageNumber, this.filterService.NameParam];
    this.ticketsService.getTicketsByUser(this.filterService.Params).subscribe((response) => {
      this.boughtTicketListService.BoughtTickets = [...response['results']];
      this.paginatorService.TotalElements = response['count'];
    });
  }

  ngOnInit() {
    this.refreshBoughtTickets();
  }
  refreshBoughtTickets(data?) {
    this.getBoughtTickets();
  }
}
