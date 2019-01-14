import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { timeValidator } from '../../../common/directives/time-validator.directive';
import { ElementRef } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { Image } from '../../../models/image';
import { IPatch } from '../../../models/patch.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AppError } from '../../../common/errors/app-error';
import { Scheduler } from 'rxjs/internal/Scheduler';
import { PatchSite } from '../edit-site/patch-site';
import { DialogService } from '../../../common/dialog/dialog.service';
import { IDialog, TypeOfDialog, IconOfDialog } from '../../../common/dialog/dialog.model';
import { SiteService } from './../../../services/site.service';
import { ScheduleSiteService } from '../../../services/schedule-site-service.service';
import { PatchScheduleSite } from './patch-schedule-site';
import { CreateSchedulelocation } from './create-schedule';

@Component({
  selector: 'app-edit-site',
  templateUrl: './edit-site.component.html',
  styleUrls: ['./edit-site.component.scss']
})

export class EditSiteComponent implements OnInit {
  private sites: any;
  path: any;
  imageForm: FormGroup;
  cardForm: FormGroup;
  startForm: FormGroup;
  endForm: FormGroup;
  startTimeForm: FormGroup;
  endTimeForm: FormGroup;
  isComplete: boolean = false;
  isCompleteSt: boolean = false;
  isCompleteEd: boolean = false;
  checked = false;
  zoom: number = 16;
  isFree: boolean = false;
  siteId: any;
  nameImage: string;
  image: boolean;
  patchSiteInformation: PatchSite;
  patchSchedule: PatchScheduleSite;
  validateHr: boolean = false;
  
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private dialogService: DialogService,
    private siteService: SiteService, private scheduleService: ScheduleSiteService, private router: Router) {
  }

  disabledInfo(name, desc){
    if(!/([0-9A-Z][a-z0-9]*[.]?[ ]?)+/.test(name) || !/([A-Za-z0-9]+[ ]{0,1250})+/.test(desc)){
      return true;
    }
  }

  disabled(){
    var dis = this.validHour();
    this.validateHr = dis;
    if(!this.patchSchedule.notConcurrencyCheckDays()){
      return true;
    }
    return dis;
   }

  validHour(){
    var startTime = Date.parse('01/01/2011 '+ this.patchSchedule.selectedTimeStart);
    var endTime = Date.parse('01/01/2011 '+ this.patchSchedule.selectedTimeEnd);
    if (startTime >= endTime){
      return true;
    }
    return false;
  }

  openStart(time) {
    this.patchSchedule.selectedTimeStart = time;
    this.isCompleteSt = true;
  }

  openEnd(time) {
    this.patchSchedule.selectedTimeEnd = time;
    this.isCompleteEd = true;
   }
 
  mapClicked($event: MouseEvent) {
    this.patchSiteInformation.markedLat = $event.coords.lat;
    this.patchSiteInformation.markedLng = $event.coords.lng;
    this.isFree = true;
  }

  patchLocationCoordinates(modal) {
    this.patchSiteInformation.patchLocationSite(modal);
  }

  patchScheduleLocation(modal) {
    this.patchSchedule.patchAttentionDays(modal);
  }

  configurePlace(modal: any, name, desc) {
    this.patchSiteInformation.patchInformationOfSite(modal, name, desc);
    this.isComplete = true;
    this.patchSiteInformation.nameSite = name;
    this.patchSiteInformation.descriptionSite = desc;

  }

  ngOnInit() {
    this.siteId = this.route.snapshot.paramMap.get('siteId');
    this.patchSiteInformation = new PatchSite(this.siteService, this.dialogService);
    this.patchSiteInformation.consumeSite(this.siteId);
    this.patchSchedule = new PatchScheduleSite(this.scheduleService, this.dialogService);
    this.patchSchedule.consumeScheduleSite(this.siteId);
    this.patchSchedule.checked = false;
    this.imageForm = this.fb.group({
      path: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.pattern('([A-Za-z0-9]{1,2})+')]],
    })
    this.cardForm = this.fb.group({
      siteName: ['', [Validators.required, Validators.pattern('([0-9A-Z][a-z0-9]*[.]?[ ]*)+')]],
      description: ['', [Validators.required, Validators.pattern('([A-Za-z0-9]+[ ]{0,1250})+')]],
    });
    this.startTimeForm = this.fb.group({
      startTime: ['', [Validators.required]]
    })
    this.endTimeForm = this.fb.group({
      endTime: ['', [Validators.required]]
    })
  }

  onSubmit(imageForm, bM1): void {
    this.patchSiteInformation.imageId = imageForm.imageId;
    this.patchSiteInformation.imageUrl = imageForm.urlImage;
    this.nameImage = imageForm.name;
    this.image = true;
    this.isComplete = true;
    this.patchSiteInformation.PatchImageOfSite(bM1);
  }

  public patchInformationOfSite() {
    var patchScheduleOperations = new Array<IPatch>();
  }

  public saveNewSchedule(modal) {
    var addSchedule = new CreateSchedulelocation(this.scheduleService, this.dialogService, this.router);
    addSchedule.createSchedule(this.patchSchedule, this.siteId, modal);
  }
}
