import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '../../../common/dialog/dialog.service';
import { IDialog, TypeOfDialog, IconOfDialog } from '../../../common/dialog/dialog.model';
import { CategoriesService } from './../../../services/categories.service';
import { EventsService } from './../../../services/events.service';
import { Image } from '../../../models/image';
import { NewEvent } from '../../../models/event';
import { SiteService } from './../../../services/site.service';
import { ImageService } from '../../../services/image-service.service';


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  //category
  categoryId: any;
  private categories: any;
  //image
  imageForm: FormGroup;
  nameImage: string;
  imageId: number;
  image: boolean = false;
  //datas
  nameEvent: string;
  descriptionEvent: string;
  cardForm: FormGroup;
  //site
  siteId: number;
  site: boolean  = false;
  siteName: string;
  private sites: any;
  siteSelect: any;
  readySite: boolean = false;
  //schedule
  scheduleId: number;
  schedule: boolean  = false;
  dateStartShow: any;
  dateEndShow: any;
  //complete
  isComplete: boolean = false;
  

  constructor(private siteServices: SiteService, private eventService: EventsService, private categoriesService: CategoriesService, 
    private fb: FormBuilder, private dialogService: DialogService, private images: ImageService) {
    }

  public consumeCategories(){
    this.categoriesService.getCategories().subscribe(response => {
      this.categories = response['results'];
      });
  }

  public consumeSites(){
    this.siteServices.getAllSites().subscribe(response =>{
      this.sites = response['results'];
    })
  }

  public viewSite(name, id){
    this.siteSelect = 'Site name: ' + name;
    this.siteId = id;
    this.readySite = true;
    this.onSubmitSite({siteId: this.siteId, name: this.siteName});
  }

  onSubmit(imageForm, bM1): void {
    this.imageId = imageForm.imageId;
    bM1.hide();
    this.nameImage = imageForm.name;
    this.image = true;
  }
  onSubmitSite(site){
    this.siteId = site.siteId;
    this.siteName = site.name;
    this.siteSelect = 'Site name: ' + site.name;
    this.readySite = true;
    this.site = true;
  }

  onSubmitSchedule(schedule){
    this.scheduleId = schedule.id;
    this.dateStartShow = schedule.dateStartShow;
    this.dateEndShow = schedule.dateEndShow;
    this.schedule = true;
  }

  public createDates(cardForm){
    this.nameEvent = cardForm.value.name;
    this.descriptionEvent = cardForm.value.description;  
  }

  public viewCategory(name, id){
    this.categoryId =  id;
    this.isComplete = true;
  }

  ngOnInit() {
    this.consumeSites();
    this.consumeCategories();
    this.image = false;
    this.imageForm = this.fb.group({
      path: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.pattern('([A-Za-z0-9]{1,2})+')]],
    }) 
    this.cardForm = this.fb.group({
      eventName: ['', [Validators.required, Validators.pattern('([0-9A-Z][a-z0-9]+[ ]{0,15})+')]],
      description: ['', [Validators.required, Validators.pattern('([A-Za-z0-9]+[ ]{0,1250})+')]],
    });
  }

  public createEvent () {
    if (this.image == false) {
      let image: Image = {
        name: "ImageEventDefault",
        extension: 'jpg',
        urlImage:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgFJlk854udBnB_dtaHnsX7UJn-Zp2ep8vDIef_KAmcKN63bV6'
      }
      this.images.addImage(image).subscribe(response => {
        this.imageId = response['imageId'];
        this.postEvent();
      });
    }
    else {
      this.postEvent();
    }
  }

  public postEvent(){
    let event : NewEvent = {
      name: this.nameEvent,
      description: this.descriptionEvent,
      categoryId: this.categoryId,
      siteId: this.siteId,
      scheduleId: this.scheduleId,
      imageId: this.imageId
    }
    let dialog: IDialog;
    this.eventService.postEvent(event).subscribe( response => {
      dialog = {
        title: 'Successful',
        description: 'Your event was created successfuly',
        btnYes: 'Accept',
        type: TypeOfDialog.SUCCESS,
        icon: IconOfDialog.SUCCESS,
        redirectBtnYes: '/admin-page',
      };
      this.dialogService.options(dialog);
    }, error => {
      dialog = {
        title: 'Error',
        description: 'Your event wasn\'t created',
        btnNo: 'Accept',
        type: TypeOfDialog.DANGER,
        icon: IconOfDialog.DANGER,
        keyboardEsc: true
      };
      this.dialogService.options(dialog);
    });
  }

}
