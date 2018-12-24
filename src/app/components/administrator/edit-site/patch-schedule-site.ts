import { IPatch } from '../../../models/patch.model';
import { DialogService } from '../../../common/dialog/dialog.service';
import { IDialog, TypeOfDialog, IconOfDialog } from '../../../common/dialog/dialog.model';
import { ScheduleSiteService } from '../../../services/schedule-site-service.service';
import { AppError } from '../../../common/errors/app-error';


export class PatchScheduleSite {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  selectedTimeStart: any = "00:00:00";
  selectedTimeEnd: any = "23:59:00";
  schedule: any;
  siteId: any;
  haveSchedule = false;
  checked = false;
  schedulesiteService: any;
  dialogService: DialogService;


  constructor(schedulesiteService, dialogService) {
    this.schedulesiteService = schedulesiteService;
    this.dialogService = dialogService;
  }

  consumeScheduleSite(siteId) {
    this.siteId = siteId;
    this.schedulesiteService.getScheduleSite(Number(siteId)).subscribe(response => {
      this.schedule = response;
      if (this.schedule !== null) {
        this.haveSchedule = this.schedule !== null ? true : false;
        this.constructTime(this.schedule.schedule.startDate);
        this.constructTimeEnd(this.schedule.schedule.finishDate);
        this.constructDays();
        this.checked = true;
      }
    }, (error: AppError) => {
      console.log("entro a esta section de error", error);
    });
  }

  constructDays() {
    this.monday = this.schedule.concurrency.monday;
    this.tuesday = this.schedule.concurrency.tuesday;
    this.wednesday = this.schedule.concurrency.wednesday;
    this.thursday = this.schedule.concurrency.thursday;
    this.friday = this.schedule.concurrency.friday;
    this.saturday = this.schedule.concurrency.saturday;
    this.sunday = this.schedule.concurrency.sunday;
  }

  checkDays() {
    return this.monday === this.schedule.concurrency.monday &&
      this.tuesday === this.schedule.concurrency.tuesday &&
      this.wednesday === this.schedule.concurrency.wednesday &&
      this.thursday === this.schedule.concurrency.thursday &&
      this.friday === this.schedule.concurrency.friday &&
      this.saturday === this.schedule.concurrency.saturday &&
      this.sunday === this.schedule.concurrency.sunday? true : false;
  }

  chackStart() {
    return this.selectedTimeStart === this.schedule.schedule.startDate.split('T')[1];
  }

  chackEnd() {
    return this.selectedTimeEnd === this.schedule.schedule.finishDate.split('T')[1]
  }

  notConcurrencyCheckDays() {
    return this.monday ||
      this.tuesday ||
      this.wednesday ||
      this.thursday ||
      this.friday ||
      this.saturday ||
      this.sunday? true : false;
  }

  constructTime(schedule) {
    let time = schedule.split('T')[1];
    this.selectedTimeStart = time;
  }

  constructTimeEnd(schedule) {
    let time = schedule.split('T')[1];
    this.selectedTimeEnd = time;
  }

  public patchAttentionDays(modal) {
    var patchScheduleOperations = new Array<IPatch>();
    if (this.monday !== this.schedule.concurrency.monday) {
      let patchDay: IPatch = {
        op: 'replace',
        path: '/monday',
        value: this.monday,
      };
      patchScheduleOperations.push(patchDay);
    }
    if (this.tuesday !== this.schedule.concurrency.tuesday) {
      let patchDay: IPatch = {
        op: 'replace',
        path: '/tuesday',
        value: this.tuesday,
      };
      patchScheduleOperations.push(patchDay);
    }
    if (this.wednesday !== this.schedule.concurrency.wednesday) {
      let patchDay: IPatch = {
        op: 'replace',
        path: '/wednesday',
        value: this.wednesday,
      };
      patchScheduleOperations.push(patchDay);
    }
    if (this.thursday !== this.schedule.concurrency.thursday) {
      let patchDay: IPatch = {
        op: 'replace',
        path: '/thursday',
        value: this.thursday,
      };
      patchScheduleOperations.push(patchDay);
    }
    if (this.friday !== this.schedule.concurrency.friday) {
      let patchDay: IPatch = {
        op: 'replace',
        path: '/friday',
        value: this.friday,
      };
      patchScheduleOperations.push(patchDay);
    }
    if (this.saturday !== this.schedule.concurrency.saturday) {
      let patchDay: IPatch = {
        op: 'replace',
        path: '/saturday',
        value: this.saturday,
      };
      patchScheduleOperations.push(patchDay);
    }
    if (this.sunday !== this.schedule.concurrency.sunday) {
      let patchDay: IPatch = {
        op: 'replace',
        path: '/sunday',
        value: this.sunday,
      };
      patchScheduleOperations.push(patchDay);
    }
    if (this.selectedTimeStart !== this.schedule.schedule.startDate.split('T')[1]) {
      let patchTime: IPatch = {
        op: 'replace',
        path: '/startDate',
        value: this.selectedTimeStart,
      };
      patchScheduleOperations.push(patchTime);
    }
    if (this.selectedTimeEnd !== this.schedule.schedule.finishDate.split('T')[1]) {
      let patchTime: IPatch = {
        op: 'replace',
        path: '/finishDate',
        value: this.selectedTimeEnd,
      };
      patchScheduleOperations.push(patchTime);
    }
    this.checkPatchSchedule(patchScheduleOperations, modal);
  }

  private checkPatchSchedule(patchOperations, modal) {
    if (patchOperations.length > 0) {
      this.helpPatchConcurrency(patchOperations, modal);
      return;
    }
  }

  private helpPatchConcurrency(patchOperations, modal) {
    let dialog: IDialog;
    this.schedulesiteService.patchScheduleSite(this.schedule.notebookId, patchOperations).subscribe(response => {
      dialog = {
        title: 'Successful',
        description: 'Your Schedule has been edited',
        btnNo: 'Accept',
        type: TypeOfDialog.SUCCESS,
        icon: IconOfDialog.SUCCESS,
        ignoreBackdrop: true
      };
      modal.hide();
      this.consumeScheduleSite(this.siteId);
      this.dialogService.options(dialog);
    }, error => {
      dialog = {
        title: 'Error',
        description: 'Your Schedule wasn\'t edited',
        btnNo: 'Accept',
        type: TypeOfDialog.DANGER,
        icon: IconOfDialog.DANGER,
        keyboardEsc: true
      };
      this.dialogService.options(dialog);
    }, () => {
    });
  }
}
