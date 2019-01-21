import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { dateValidator } from '../../../common/directives/date-validator.directive';
import { Schedule } from '../../../models/schedule';
import { IDialog, TypeOfDialog, IconOfDialog } from '../../../common/dialog/dialog.model';
import { SchedulesService } from '../../../services/schedules.service';
import { DialogService } from '../../../common/dialog/dialog.service';
@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.scss']
})
export class CreateScheduleComponent implements OnInit {
  checked: boolean = false;
  startForm: FormGroup;
  maxStart: Date = new Date();
  minStart: Date = new Date();
  startTimeForm: FormGroup;
  endTimeForm: FormGroup;
  selectedTimeStart : any = "00:00";
  selectedTimeEnd : any = "23:59";
  dateOficialStart: any;
  dateOficialEnd: any;
  dateStartShow: any;
  dateEndShow: any;
  dateEnd : any;
  dateEndValid: any;
  scheduleId: any;
  date: boolean;
  endForm: FormGroup;
  dateStart : any;
  newDate : any;
  disButton: boolean = false;
  @Output('saveSchedule') saveSchedule: EventEmitter<Object> = new EventEmitter<Object>();

  constructor(private fb: FormBuilder, private scheduleService: SchedulesService,  private dialogService: DialogService) {}

   disabled(){
    var validate = this.selectedTimeStart.split(':');
    var validateEnd = this.selectedTimeEnd.split(':');
    var dis = this.validHour();
    if (dis){
      if(this.checked){
        if(this.dateOficialStart){
          return false;
        }
      }
      else{
        if(this.dateStart && this.dateEnd){
          return false;
        }
      }
    }
    return true;
   }

  getToday(){
    var today = new Date();
    var day = String(today.getDate() + 1);
    var month = String(today.getMonth() + 1);
    var year = today.getFullYear();
    if(Number(month) < 10){
      month = '0' + month; 
    }
    if(Number(day) < 10){
      day = '0' + day; 
    }
    return (String(year) + "-" + month + "-" + day);
  }

  validHourForm(){
    var from_time = this.selectedTimeStart;
    var from = Date.parse('01/01/2011 '+ from_time);
    var to = Date.parse('01/01/2011 01:00');

    if (from < to){
      return true;
    } 
    var validate = this.selectedTimeStart.split(':');
    var validateEnd = this.selectedTimeEnd.split(':');
    var dis = this.validHour();
    return dis;
  }

  validHour(){
    var startTime = Date.parse('01/01/2011 '+ this.selectedTimeStart);
    var endTime = Date.parse('01/01/2011 '+ this.selectedTimeEnd);
    if (startTime < endTime){
      return true;
    }
    return false;
  }



  public verifeEnd(dateEnd: any){
    this.dateEnd = dateEnd.split('-');
  }

  public openStart(time) {
    this.selectedTimeStart = time;
  }

  public send(date: any){
    this.dateEndValid = date;
    this.dateStart = date;
    var parts = this.dateStart.split('-');
    this.newDate = date;
    this.dateOficialStart = new Date(parts[0], parts[1] - 1, parts[2] - 1);
    this.endForm = this.fb.group({
      endDate: ['', [Validators.required, dateValidator(this.dateOficialStart, this.maxStart)]],
    });
  }

  openEnd(time) {
    this.selectedTimeEnd = time;
  }

  createSchedule(){
    if(!this.checked){
      console.log('entro a unchecked');
      var hoursStart = this.selectedTimeStart.split(':');
      var hoursEnd = this.selectedTimeEnd.split(':');
      var parts = this.newDate.split('-');
      this.dateOficialStart = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]), hoursStart[0] - 4, hoursStart[1]);
      this.dateOficialEnd = new Date(this.dateEnd[0], this.dateEnd[1] - 1, this.dateEnd[2], hoursEnd[0] - 4, hoursEnd[1]);
      this.dateEndShow =  new Date(this.dateEnd[0], this.dateEnd[1] - 1, this.dateEnd[2], hoursEnd[0], hoursEnd[1]);
      this.dateStartShow = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]), hoursStart[0], hoursStart[1]);
      let schedule: Schedule = {
        startDate: this.dateOficialStart.toISOString(),
        finishDate: this.dateOficialEnd.toISOString()
      }
      let dialog: IDialog;
      this.scheduleService.postSchedule(schedule).subscribe( response => {
        this.scheduleId = response['scheduleId'];
        console.log('schedule', this.scheduleId); 
        this.saveSchedule.emit({id: response['scheduleId'], dateStartShow: this.dateStartShow, dateEndShow: this.dateEndShow});   
        dialog = {
          title: 'Successful',
          description: 'Your schedule was created successfuly',
          btnNo: 'Accept',
          type: TypeOfDialog.SUCCESS,
          icon: IconOfDialog.SUCCESS,
          ignoreBackdrop: true
        };
        this.dialogService.options(dialog);
        this.date = true;
      }, error => {
        dialog = {
          title: 'Error',
            description: 'Your schedule wasn\'t created',
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
    else{
        console.log('entro a checked');
        var hoursStart = this.selectedTimeStart.split(':');
        var hoursEnd = this.selectedTimeEnd.split(':');
        var parts = this.newDate.split('-');
        this.dateOficialStart = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]), hoursStart[0] - 4, hoursStart[1]);
        this.dateOficialEnd = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]), hoursEnd[0] - 4, hoursEnd[1]);
        this.dateEndShow =  new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]), hoursEnd[0], hoursEnd[1]);
        this.dateStartShow = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]), hoursStart[0], hoursStart[1]);
        let schedule: Schedule = {
          startDate: this.dateOficialStart.toISOString(),
          finishDate: this.dateOficialEnd.toISOString()
        }
        let dialog: IDialog;
        this.scheduleService.postSchedule(schedule).subscribe( response => {
          this.scheduleId = response['scheduleId'];
          console.log('schedule', this.scheduleId); 
          this.saveSchedule.emit({id: response['scheduleId'], dateStartShow: this.dateStartShow, dateEndShow: this.dateEndShow});  
          dialog = {
            title: 'Successful',
            description: 'Your schedule was created successfuly',
            btnNo: 'Accept',
            type: TypeOfDialog.SUCCESS,
            icon: IconOfDialog.SUCCESS,
            ignoreBackdrop: true
          };
          this.dialogService.options(dialog);
          this.date = true;
        }, error => {
          dialog = {
            title: 'Error',
              description: 'Your schedule wasn\'t created',
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
    this.disButton = true;
  }

  ngOnInit() {
    this.maxStart.setFullYear(this.minStart.getFullYear() + 1);
    this.minStart.toLocaleDateString();
    this.date = false;
    this.startForm = this.fb.group({
      startDate: ['', [Validators.required, dateValidator(this.minStart, this.maxStart)]],
    });
    this.endForm = this.fb.group({
      endDate: ['', [Validators.required, dateValidator(this.dateOficialStart, this.maxStart)]],
    });
    this.startTimeForm = this.fb.group({
      startTime: ['', Validators.required]
    })
    this.endTimeForm = this.fb.group({
      endTime: ['', [Validators.required]]
    })
  }

}
