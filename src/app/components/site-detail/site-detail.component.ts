import { Component, OnInit } from '@angular/core';
import { Event, ISingleEvent } from '../../models/event';
import { IEvent } from '../../models/event.model';
import { IPatch } from '../../models/patch.model';
import { IPrice } from '../../models/price-model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AppError } from '../../common/errors/app-error';
import { SiteService } from '../../services/site.service';
import { PricesSiteService } from '../../services/prices-site-service.service';
import { ScheduleSiteService } from '../../services/schedule-site-service.service';
import { EventsInSiteService } from '../../services/events-in-site-service.service';
import { MessageService } from '../../services/message.service';
import { Subscription } from 'rxjs';
import { DialogService } from '../../common/dialog/dialog.service';
import { TypeOfDialog, IDialog, IconOfDialog, IMapDialog, IPriceDialog } from '../../common/dialog/dialog.model';
import { MapDialogService } from '../../common/map-dialog/map-dialog.service';
import { PriceServiceDialogService } from '../../common/price-table/price-table.component.service';



@Component({
  selector: 'app-site-detail',
  templateUrl: './site-detail.component.html',
  styleUrls: ['./site-detail.component.scss']
})
export class SiteDetailComponent implements OnInit {

  private enable: boolean
  private subscription: Subscription;
  private site: any;
  private notebook: any;
  private prices: Array<any>;
  private havePrices: boolean;
  private startDate: any;
  private finishDate: any;
  private open: boolean = false;
  private concurrencyDays: string = "";
  private haveSchedule: boolean = false;
  private schedule: any;
  private siteId: String;
  private events: any;
  private amount: number;
  validData: boolean = false;
  isAdmin: boolean = false;
  private mapDialog: IMapDialog;
  private priceDialog: IPriceDialog;

  constructor(private route: ActivatedRoute, private eventOnSite: EventsInSiteService, private siteService: SiteService, private messageService: MessageService,
    private pricesSiteService: PricesSiteService, private dialogService: DialogService, private schedulesiteService: ScheduleSiteService,
    private mapService: MapDialogService, private priceDialogService: PriceServiceDialogService) {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      this.enable = true;
      //console.log("cambio enable a true?")for some reason it is not being notified of a change
    });
  }

  ngOnInit() {
    this.siteId = this.route.snapshot.paramMap.get('siteId');
    this.siteService.getSiteDetail(Number(this.siteId)).subscribe(response => {
      console.log(response, "site detail");
      this.site = response;
      this.prices = response["prices"];
      this.ConstructHavesData();
      console.log(this.prices, "prices");
    }, (error: AppError) => {
    console.log("entro a esta section de error", error);
      });
    this.schedulesiteService.getScheduleSite(Number(this.siteId)).subscribe(response => {
      console.log(response, "site schedule");
      this.schedule = response;
      this.ConstructDays();
      this.ConstructHavesData();
    }, (error: AppError) => {
      console.log("entro a esta section de error", error);
      });
    this.eventOnSite.getEventInSite(Number(this.siteId)).subscribe(response => {
      console.log(response, "events on site");
      this.events = response;
      this.ConstructHavesData();
    }, (error: AppError) => {
      console.log("entro a esta section de error", error);
    });
  }

  ConstructHavesData() {
    let role = sessionStorage.getItem('role');
    if ((role === '1') || (role === '2')) {
      this.isAdmin = true;
      console.log(role, 'is admin', this.isAdmin);
    }
      this.haveSchedule = this.site.schedule;
      this.open = this.schedule.openStatus;
      this.havePrices = this.prices.length > 0 ? true : false;
    }

  ConstructDays() {
      let concurrency = this.schedule.concurrency;
      if (concurrency.monday) {
          this.concurrencyDays += " Monday, ";
      }
      if (concurrency.tuesday) {
          this.concurrencyDays += " Tuesday, ";
      }
      if (concurrency.wednesday) {
          this.concurrencyDays +=  " Wednesday, ";
      }
      if (concurrency.thursday) {
          this.concurrencyDays += " Thursday, ";
      }
      if (concurrency.friday) {
          this.concurrencyDays += " Friday, ";
      }
      if (concurrency.saturday) {
          this.concurrencyDays += " Saturday, ";
      }
      if (concurrency.sunday) {
          this.concurrencyDays += " Sunday ";
      }
      let start = this.schedule.schedule.startDate;
      let end = this.schedule.schedule.finishDate;
      this.startDate = start.split("T")[1];
      this.finishDate = end.split("T")[1];
  }

  GoBackWithResfresh(event) {
    console.log("Deberia ir atras");
    window.history.back();
  }

  showMap() {
    console.log(this.site);
    this.mapDialog = {
      latitude: this.site.latitude,
      longitude: this.site.longitude,
      eventPlaceName: this.site.name,
      type: TypeOfDialog.INFO
    }
    this.mapService.showDialog(this.mapDialog);
  }

  showPrices() {
    this.priceDialog = {
      itemId: Number(this.siteId),
      prices: this.site.prices,
      type: TypeOfDialog.INFO,
      typePrice: "site",
      isAdmin: this.isAdmin
    }
    this.priceDialogService.showDialog(this.priceDialog);
  }
}
