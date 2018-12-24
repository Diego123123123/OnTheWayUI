import { Component, OnInit } from '@angular/core';
import { AdminEventsService } from '../../../services/admin-events.service';
import { FilterService } from '../../filter/filter.service';
import { PaginatorService } from '../../paginator/paginator.service';
import { IParams } from '../../../models/params.model';
import { UsersForEventsService } from '../../../services/users-for-events.service';
import { DialogService } from '../../../common/dialog/dialog.service';
import { IDialog, TypeOfDialog, IconOfDialog } from '../../../common/dialog/dialog.model';
import { PreferredEventsService } from '../../../services/preferred-events.service';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.scss']
})
export class AdminEventsComponent implements OnInit {
  private events: Array<any>;
  private dialogOptions: IDialog = {
    title: 'Delete event',
    description: 'Are you sure you want to delete this event?',
    btnYes: 'Accept',
    btnNo: 'Cancel',
    type: TypeOfDialog.INFO,
    icon: IconOfDialog.INFO,
    keyboardEsc: true
  };

  constructor(private dialogService: DialogService, private serviceUserByEvent: UsersForEventsService, private adminEventsservice: AdminEventsService, 
    private filterService: FilterService, private paginatorService: PaginatorService, private preferences: PreferredEventsService ) {
    this.events = [];
   }

   refreshEvents(data?: Array<IParams>) {
      this.getRecentEvents();
    }

   public getRecentEvents() {
    this.filterService.Params = [this.paginatorService.PageSize, this.paginatorService.PageNumber, this.filterService.NameParam];
    if (this.filterService.Params[2].value === ''){
    this.adminEventsservice.getEvents(this.filterService.Params).subscribe(response => {
      this.events = response['results'];
      for(let event of this.events){
        this.preferences.getPopularity(event.eventId).subscribe(data => {
          event.popularidad = data;
          console.log(event);
        });
      }
      this.paginatorService.TotalElements = response['count'];
      for (var _i = 0; _i < this.events.length; _i++) {
        this.verifeCantPersons(_i);
      }
    });}
    else{
      this.filterService.Params = [this.paginatorService.PageSize, this.paginatorService.PageNumber, this.filterService.NameParam];
      this.adminEventsservice.getEvents(this.filterService.Params).subscribe(response => {
        this.events = response['results'];
        for(let event of this.events){
          this.preferences.getPopularity(event.eventId).subscribe(data => {
            event.popularidad = data;
            console.log(event);
          });
        }
        this.paginatorService.TotalElements = response['count'];
        for (var _i = 0; _i < this.events.length; _i++) {
          this.verifeCantPersons(_i);
        }
      });
    }
  }

  verifeCantPersons(event){
    this.serviceUserByEvent.getUsers(this.events[event]['id']).subscribe(response => {
      this.events[event]['cant'] = response['totalUsers'];
      console.log('response', response);
    });
  }

  ngOnInit() {
    this.adminEventsservice.getEvents().subscribe(response => {
      this.events = response['results'];
      for(let event of this.events){
        this.preferences.getPopularity(event.eventId).subscribe(data => {
          event.popularidad = data;
          console.log(event);
        });
      }
    });
    this.refreshEvents();
  }

  deleteEvent(eventId) {
    let dialog: IDialog;
    this.adminEventsservice.deleteEvent(eventId).subscribe( response => {
      dialog = {
        title: 'Successful',
        description: 'You deleted the event successfully.',
        btnYes: 'Accept',
        type: TypeOfDialog.SUCCESS,
        icon: IconOfDialog.SUCCESS,
        redirectBtnYes: '/admin-page',
        ignoreBackdrop: true
      };
      window.location.reload();
      this.dialogService.options(dialog);
    }, error => {
      dialog = {
        title: 'Error',
        description: 'The event could not be deleted, try again.',
        btnNo: 'Accept',
        type: TypeOfDialog.DANGER,
        icon: IconOfDialog.DANGER,
        keyboardEsc: true
      };
      this.dialogService.options(dialog);
    }, () => {
      console.log('finish');
    });
  }

}
