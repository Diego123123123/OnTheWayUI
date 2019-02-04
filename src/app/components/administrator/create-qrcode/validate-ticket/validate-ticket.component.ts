import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PriceService } from '../../../../services/price-service.service';
import { TicketsService } from '../../../../services/admin/tickets/tickets.service';
import { EventDetailService } from '../../../../services/event-detail.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as jwt_decode from "jwt-decode";
import { MessageService } from 'src/app/services/message.service';
import { IPatch } from 'src/app/models/patch.model';
import { IDialog, TypeOfDialog, IconOfDialog } from 'src/app/common/dialog/dialog.model';
import { DialogService } from 'src/app/common/dialog/dialog.service';

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
  private userCanAccess: boolean = false;
  private userIsLogged: boolean = false;
  constructor(private route: ActivatedRoute, private price: PriceService, 
    private ticketService: TicketsService, private eventService: EventDetailService, 
    private authService: AuthenticationService, private messageService: MessageService,
    private dialogService: DialogService ) {
    this.ticketId = this.route.snapshot.paramMap.get('ticketId');
   }

  ngOnInit() {
    this.setUserIfExists();
    if(this.authService.isLogged()){
      this.userIsLogged = true;
      if(this.authService.getUser().role == '1' || this.authService.getUser().role == '2'){
        this.userCanAccess = true;
        this.saveUserCredentials();
      }
    }
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
    if(this.ticket.state === 1){
      let patchTicketOperations = new Array<IPatch>();
      let patchState: IPatch = {
        op: 'replace',
        path: '/state',
        value: 0,
      };
      patchTicketOperations.push(patchState);
      this.ticketService.patch(this.ticketId + '/state', patchTicketOperations).subscribe(() => {
        this.ticket.state = 0;
        let dialog: IDialog;
        dialog = {
          title: 'Successful',
          description: 'Ticket Successfully disabled',
          btnNo: 'Accept',
          type: TypeOfDialog.SUCCESS,
          icon: IconOfDialog.SUCCESS,
          ignoreBackdrop: true
        };
        this.dialogService.options(dialog);
      },
      () => {
        this.ticket.state = 1;
      });
    }
  }

  private saveUserCredentials(){
    if(sessionStorage.getItem('token'))
      localStorage.setItem('tokenOTW', sessionStorage.getItem('token'));
  }
  
  private setUserIfExists(){
    try {
      let decodedResult = jwt_decode(localStorage.getItem('tokenOTW'));
      sessionStorage.setItem('token', localStorage.getItem('tokenOTW'));
      sessionStorage.setItem('role', decodedResult['roles']);
      sessionStorage.setItem('userId', decodedResult['UserId']);
      sessionStorage.setItem('user', decodedResult['sub']);
      sessionStorage.setItem('themeId', decodedResult['ThemeId']);
      this.messageService.sendMessage(sessionStorage.getItem('user'));
    } catch {}
  }

}
