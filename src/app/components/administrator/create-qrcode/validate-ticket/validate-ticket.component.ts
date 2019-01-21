import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PriceService } from '../../../../services/price-service.service';
import { TicketsService } from '../../../../services/admin/tickets/tickets.service';
import { EventDetailService } from '../../../../services/event-detail.service';

@Component({
  selector: 'app-validate-ticket',
  templateUrl: './validate-ticket.component.html',
  styleUrls: ['./validate-ticket.component.scss']
})
export class ValidateTicketComponent implements OnInit {

  public ticketId: any;
  public ticket: any = {};
  public priceTicket: any = {};
  public event: any = {};

  constructor(private route: ActivatedRoute, private price: PriceService, 
    private ticketService: TicketsService, private eventService: EventDetailService) {
    this.ticketId = this.route.snapshot.paramMap.get('ticketId');
   }

  ngOnInit() {
    this.ticketService.getTicketById(Number(this.ticketId)).subscribe(data => {
      this.ticket = data;
      this.eventService.getEventDetail(data['eventId']).subscribe(response => {
        this.event = response;
        this.price.getPrice(this.ticket.priceId).subscribe(priceResp => {
          this.priceTicket = priceResp;
        });
      });
    });
  }

  private changeState(){
    let tick = this.ticket;
    if(this.ticket.state === 1){
      tick.state = 0;
      this.ticketService.editTicket(this.ticketId, tick).subscribe(response => {
        console.log(response);
      });
    }
  }

  private getState(){
    let tick = this.ticket;
    if(this.ticket.state === 1){
      return "Enabled";
    }
    return "Disabled";
  }
}
