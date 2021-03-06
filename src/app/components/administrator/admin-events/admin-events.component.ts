import { Component, OnInit, Input } from '@angular/core';
import { AdminEventsService } from '../../../services/admin-events.service';
import { FilterService } from '../../filter/filter.service';
import { PaginatorService } from '../../paginator/paginator.service';
import { IParams } from '../../../models/params.model';
import { UsersForEventsService } from '../../../services/users-for-events.service';
import { DialogService } from '../../../common/dialog/dialog.service';
import { IDialog, TypeOfDialog, IconOfDialog } from '../../../common/dialog/dialog.model';
import { PreferredEventsService } from '../../../services/preferred-events.service';
import { EventsService } from '../../../services/events.service';
import * as jsonPatch from 'fast-json-patch'

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.scss']
})
export class AdminEventsComponent implements OnInit {
  @Input() showDeleted: boolean;
  @Input() showRecents: boolean;

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
    private filterService: FilterService, private paginatorService: PaginatorService, private preferences: PreferredEventsService,
    private eventsService: EventsService) {
    this.events = [];
  }

  refreshEvents(data?: Array<IParams>) {
    this.getRecentEvents();
  }

  public getRecentEvents() {
    this.filterService.Params = [this.paginatorService.PageSize, this.paginatorService.PageNumber, this.filterService.NameParam, { key: "StatusId", value: 2 }];
    if (this.filterService.Params[2].value === '') {
      this.adminEventsservice.getEvents(this.filterService.Params).subscribe(response => {
        this.events = response['results'];
        for (let event of this.events) {
          this.preferences.getPopularity(event.eventId).subscribe(data => {
            event.popularidad = data;
          });
        }
        this.paginatorService.TotalElements = response['count'];
        for (var _i = 0; _i < this.events.length; _i++) {
          this.getNumberUsersByEvent(_i);
        }
      });
    }
    else {
      this.filterService.Params = [this.paginatorService.PageSize, this.paginatorService.PageNumber, this.filterService.NameParam, { key: "StatusId", value: 2 }];
      this.adminEventsservice.getEvents(this.filterService.Params).subscribe(response => {
        this.events = response['results'];
        for (let event of this.events) {
          this.preferences.getPopularity(event.eventId).subscribe(data => {
            event.popularidad = data;
          });
        }
        this.paginatorService.TotalElements = response['count'];
        for (var _i = 0; _i < this.events.length; _i++) {
          this.getNumberUsersByEvent(_i);
        }
      });
    }
  }

  getNumberUsersByEvent(event) {
    this.serviceUserByEvent.getUsers(this.events[event]['id']).subscribe(response => {
      this.events[event]['numberUsers'] = response['totalUsers'];
    });
  }

  ngOnInit() {
    this.adminEventsservice.getEvents().subscribe(response => {
      this.events = response['results'];
      for (let event of this.events) {
        this.preferences.getPopularity(event.eventId).subscribe(data => {
          event.popularidad = data;
        });
      }
    });
    this.refreshEvents();
  }

  deleteEvent(eventId) {
    let dialog: IDialog;
    var patch = [{ op: 'replace', path: '/StatusId', value: 5 }];
    this.eventsService.deleteEvent(eventId).subscribe(response => {
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
