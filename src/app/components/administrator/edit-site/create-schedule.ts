import { IConcurrency } from '../../../models/concurrency-site.model';
import { DialogService } from '../../../common/dialog/dialog.service';
import { IDialog, TypeOfDialog, IconOfDialog } from '../../../common/dialog/dialog.model';

export class CreateSchedulelocation {

  schedulesiteService: any;
  dialogService: DialogService;

  constructor(schedulesiteService, dialogService) {
    this.schedulesiteService = schedulesiteService
    this.dialogService = dialogService;
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
