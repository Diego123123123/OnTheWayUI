import { IConcurrency } from '../../../models/concurrency-site.model';
import { DialogService } from '../../../common/dialog/dialog.service';
import { IDialog, TypeOfDialog, IconOfDialog } from '../../../common/dialog/dialog.model';
import { Router } from '@angular/router';

export class CreateSchedulelocation {

  schedulesiteService: any;
  dialogService: DialogService;
  router: any;
  siteId: any;

  constructor(schedulesiteService, dialogService, router) {
    this.schedulesiteService = schedulesiteService
    this.dialogService = dialogService;
    this.router = router;
  }

  public createNewPlace(siteId){

  }

  public createScheduleNew(schedule, siteId, modal){
    let createNotebook: IConcurrency = {
      monday: schedule.monday,
      tuesday: schedule.tuesday,
      wednesday: schedule.wednesday,
      thursday: schedule.thursday,
      friday: schedule.friday,
      saturday: schedule.saturday,
      sunday: schedule.sunday,
      startDate: schedule.selectedTimeStart,
      finishDate: schedule.selectedTimeEnd
    };
    this.schedulesiteService.postScheduleSite(siteId, createNotebook).subscribe(response => {
      this.siteId = siteId;
      let dialog: IDialog;
      dialog = {
        title: 'Successful',
        description: 'Tourist place added successfully',
        btnNo: 'Accept',
        type: TypeOfDialog.SUCCESS,
        icon: IconOfDialog.SUCCESS,
        ignoreBackdrop: true
      };
      this.dialogService.options(dialog);
    });
  }

  public createSchedule(schedule, siteId, modal) {
    let createNotebook: IConcurrency = {
      monday: schedule.monday,
      tuesday: schedule.tuesday,
      wednesday: schedule.wednesday,
      thursday: schedule.thursday,
      friday: schedule.friday,
      saturday: schedule.saturday,
      sunday: schedule.sunday,
      startDate: schedule.selectedTimeStart,
      finishDate: schedule.selectedTimeEnd
    };
    let dialog: IDialog;
    this.schedulesiteService.postScheduleSite(siteId, createNotebook).subscribe(response => {
      dialog = {
        title: 'Successful',
        description: 'Your Schedule has been added and the page reload in 3 seconds',
        btnNo: 'Accept',
        type: TypeOfDialog.SUCCESS,
        icon: IconOfDialog.SUCCESS,
        ignoreBackdrop: true
      };
      modal.hide();
      this.dialogService.options(dialog);
      setTimeout(function () {
        window.location.reload();
      }, 3000);
    }, error => {
      dialog = {
        title: 'Error',
        description: 'Your Schedule wasn\'t added',
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
