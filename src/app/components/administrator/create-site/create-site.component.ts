import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Site } from '../../../models/site';
import { SiteService } from './../../../services/site.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { ImageService } from 'src/app/services/image-service.service';
import { Image } from 'src/app/models/image';
import { PatchScheduleSite } from '../edit-site/patch-schedule-site';
import { DialogService } from 'src/app/common/dialog/dialog.service';
import { ScheduleSiteService } from 'src/app/services/schedule-site-service.service';
import { IPatch } from 'src/app/models/patch.model';
import { CreateSchedulelocation } from '../edit-site/create-schedule';
import {PatchSite} from '../edit-site/patch-site';
import { IDialog, TypeOfDialog, IconOfDialog } from '../../../common/dialog/dialog.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-site',
  templateUrl: './create-site.component.html',
  styleUrls: ['./create-site.component.scss']
})
export class CreateSiteComponent implements OnInit {
  isComplete: boolean = false;
  isCompleteSt: boolean = false;
  isCompleteEd: boolean = false;
  lat: number = -17.3895000;
  lng: number = -66.1568009;
  zoom: number = 10;
  siteName: string;
  siteId: any;
  newSite: boolean = false;
  cardForm: FormGroup;
  startTimeForm: FormGroup;
  endTimeForm: FormGroup;
  imageForm: FormGroup;
  startForm: FormGroup;
  endForm: FormGroup;
  markedLat: any;
  markedLng: any;
  checked = false;
  markedDraggable: any;
  label: any;
  descritionSite: any;
  site: any;
  isFree: boolean = false;
  readySite: boolean = false;
  nameImage: string;
  imageId: number;
  imageUrl: any = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgFJlk854udBnB_dtaHnsX7UJn-Zp2ep8vDIef_KAmcKN63bV6";
  image: boolean = false;
  patchSchedule: PatchScheduleSite;
  patchSiteInformation: PatchSite;
  validateHr: boolean = false;
  addSchedule: any;
  modal: any;
  dialogServ: DialogService;
  @Output('saveSite') saveSite: EventEmitter<Object> = new EventEmitter<Object>();
  
  constructor(private siteServices: SiteService, private fb: FormBuilder, private images: ImageService, private dialogService: DialogService
              , private scheduleService: ScheduleSiteService, private router: Router) { 
                this.dialogServ = dialogService;
              }

  createSite(){
    if (this.image == false) {
      let image: Image = {
        name: "ImageEventDefault",
        extension: 'jpg',
        urlImage:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgFJlk854udBnB_dtaHnsX7UJn-Zp2ep8vDIef_KAmcKN63bV6'
      }
      this.images.addImage(image).subscribe(response => {
        this.imageId = response['imageId'];
        this.postSite();
      });
    }
    this.postSite();
  }
    
  public postSite() {
    let site: Site = {
      name: this.label,
      description: this.descritionSite,
      latitude: this.markedLat,
      longitude: this.markedLng,
      imageId: this.imageId
    }
    this.siteServices.postSite(site).subscribe( response => {
      this.site = 'The Site was successfully uploaded, Site name: ' + this.label;
      this.siteId = response['siteId'];
      if(this.patchSchedule.haveSchedule){
        this.addSchedule.createScheduleNew(this.patchSchedule, this.siteId, this.modal);
      }
      else{
        this.addSchedule = new CreateSchedulelocation(this.scheduleService, this.dialogService, this.router);
        this.patchSchedule.selectedTimeStart = "00:00:00";
        this.patchSchedule.selectedTimeEnd = "00:00:00";
        this.addSchedule.createScheduleNew(this.patchSchedule, this.siteId, this.modal);
      }
      this.siteName = this.label;
      this.saveSite.emit(response);
      this.readySite = true;
      setTimeout( function (){
      },2000);
      this.router.navigate(['/site-detail/' + this.siteId]);
    }, error => {
      this.site = 'The site could not uploaded';
    });
    this.startTimeForm = this.fb.group({
      startTime: ['', [Validators.required]]
    });
    this.endTimeForm = this.fb.group({
      endTime: ['', [Validators.required]]
    });
  }

  mapClicked($event: MouseEvent) {
    this.markedLat = $event.coords.lat;
    this.markedLng = $event.coords.lng;
    this.isFree = true;
  }

  ngOnInit() {
    this.patchSchedule = new PatchScheduleSite(this.scheduleService, this.dialogService);
    this.patchSchedule.consumeScheduleSite(this.siteId);
    this.patchSchedule.checked = false;
    this.cardForm = this.fb.group({
      description: ['', [Validators.required, Validators.pattern('([A-Za-z0-9]+[ ]{0,1250})+')]],
    });
    this.cardForm = this.fb.group({
      eventName: ['', [Validators.required, Validators.pattern('([0-9A-Z][a-z0-9]+[ ]{0,15})+')]],
      siteName: ['', [Validators.required, Validators.pattern('([0-9A-Z][a-z0-9]*[.]?[ ]?)+')]],
      description: ['', [Validators.required, Validators.pattern('([A-Za-z0-9]+[ ]{0,1250})+')]],
    });
    this.image = false;
    this.imageForm = this.fb.group({
      path: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.pattern('([A-Za-z0-9]{1,2})+')]],
    });
    this.startTimeForm = this.fb.group({
      startTime: ['', [Validators.required]]
    });
    this.endTimeForm = this.fb.group({
      endTime: ['', [Validators.required]]
    });
  }
  onSubmit(imageForm, bM1): void {
    this.imageId = imageForm.imageId;
    this.imageUrl = imageForm.urlImage;
    bM1.hide();
    this.nameImage = imageForm.name;
    this.image = true;
  }
  openStart(time) {
    this.patchSchedule.selectedTimeStart = time;
    this.isCompleteSt = true;
  }

  openEnd(time) {
    this.patchSchedule.selectedTimeEnd = time;
    this.isCompleteEd = true;
  }
  validHour(){
    if(!this.patchSchedule.selectedTimeStart || !this.patchSchedule.selectedTimeEnd){
      return true;
    }
    var startTime = Date.parse('01/01/2011 '+ this.patchSchedule.selectedTimeStart);
    var endTime = Date.parse('01/01/2011 '+ this.patchSchedule.selectedTimeEnd);
    if (startTime >= endTime){
      return true;
    }
  return false
  }
  disabledInfo(name, desc){
    if(!/([0-9A-Z][a-z0-9]*[.]?[ ]?)+/.test(name) || !/([A-Za-z0-9]+[ ]{0,1250})+/.test(desc)){
      return true;
    }
  }

  public patchInformationOfSite() {
    var patchScheduleOperations = new Array<IPatch>();
  }

  public saveNewSchedule(modal) {
    let dialog: IDialog;
    console.log("saving schedule");
    this.modal = modal;
    this.modal.hide();
    this.addSchedule = new CreateSchedulelocation(this.scheduleService, this.dialogService, this.router);
    this.patchSchedule.haveSchedule = true;
  }

  disabled(){
    var dis = this.validHour();
    this.validateHr = dis;
    if(!this.patchSchedule.notConcurrencyCheckDays()){
      return true;
    }
    return dis;
  }

  disabledCreate(){
    if( this.label && this.descritionSite && this.markedLat && this.markedLng){
      return false;
    }
    return true;
  }
}
