import { TicketsService } from "../../../services/admin/tickets/tickets.service";
import { DialogService } from "../../../common/dialog/dialog.service";
import { ITicket } from "../../../models/ticket.model";
import { Router } from "@angular/router";


export class PatchTicket {

  ticketService: TicketsService;
  dialogService: DialogService;
  router: Router;
  userId: any;

  constructor(ticketService, dialogService, router) {
    this.ticketService = ticketService; 
    this.dialogService = dialogService;
    this.router = router
    this.userId = sessionStorage.getItem('userId');
  }

  public createTicket(priceTicket, customerName){
    let tick: ITicket = {
      eventId: priceTicket.eventId,
      customerId: this.userId,
      customerName: customerName,
      imageId: 0,
      priceId: priceTicket.priceId,
      state: 1
    }
    this.ticketService.createTicket(tick).subscribe(response => {
      console.log(response);
      this.router.navigate(['tickets/' + response['ticketId']]);
    });
  }
}