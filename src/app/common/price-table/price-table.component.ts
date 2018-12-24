import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { Subscription } from 'rxjs';
import { IEvent } from '../../models/event.model';
import { IPatch } from '../../models/patch.model';
import { IPrice } from '../../models/price-model';
import { IPriceSite } from '../../models/price-site.model';
import { TypeOfDialog, IDialog, IconOfDialog, IMapDialog } from '../../common/dialog/dialog.model';
import { DialogService } from '../../common/dialog/dialog.service';
import { IPriceDialog } from '../dialog/dialog.model';
import { ActivatedRoute } from '@angular/router';
import { PriceServiceDialogService } from './price-table.component.service';
import { EventDetailService } from '../../services/event-detail.service';
import { PriceService } from '../../services/price-service.service';
import { SiteService } from '../../services/site.service';
import { PricesSiteService } from '../../services/prices-site-service.service';


@Component({
  selector: 'app-price-table',
  templateUrl: './price-table.component.html',
  styleUrls: ['./price-table.component.scss']
})
export class PriceTableComponent implements OnInit {

  @ViewChild('priceModal') frame: ModalDirective;
  private subscription: Subscription = null;
  private itemId: any;
  private prices: Array<any>;
  private amount: number;
  private money: string;
  private type: string;
  private isEvent: boolean;
  private namePlace: string;
  private isAdmin: boolean;
  private service: any;
  private priceDialog: IPriceDialog = {
    itemId: 0,
    prices: null,
    type: "",
    typePrice: "",
    isAdmin: false
  };

  constructor(private priceDialogService: PriceServiceDialogService, private route: ActivatedRoute, private eventService: EventDetailService, private siteService: SiteService,
    private pricesSiteService: PricesSiteService, private priceService: PriceService, private dialogService: DialogService) { }

  ngOnInit() {
    this.subscription = this.priceDialogService.priceDialogSubject$.subscribe((dialog) => {
      this.type = dialog.typePrice;
      if (this.type === "site") {
        this.service = this.pricesSiteService;
        this.isEvent = false;
      }
      if (this.type === "event") {
        this.service = this.priceService;
        this.isEvent = true;
      }
      console.log("asd", this.isEvent);
      console.log("this is the dialog to be shown", dialog);
      this.priceDialog = dialog;
      this.itemId = dialog.itemId;
      this.prices = dialog.prices;
      this.isAdmin = dialog.isAdmin;
      console.log(this.itemId);
      console.log(this.prices);
      console.log(this.type);
      console.log(this.frame);
      this.frame.show();
    });
  }


  addPrice() {
    let price: any;
    if (this.type === "event") {
        let newPrice: IPrice = {
        EventId: Number(this.itemId),
        Amount: Number(this.amount),
        NameSiteInEvent: this.namePlace,
        Money: this.money
      }
      price = newPrice;
    }
    if (this.type === "site") {
        let newPrice: IPriceSite = {
        siteId: Number(this.itemId),
        amount: Number(this.amount),
        nameSiteInEvent: this.namePlace,
        money: this.money
      }
      price = newPrice;
    }

    let dialog: IDialog;
    this.service.createPrice(price).subscribe(response => {
      this.prices = [...this.prices, response];
      console.log('add', response);
      dialog = {
        title: 'Successful',
        description: 'Your Price has been created',
        btnNo: 'Accept',
        type: TypeOfDialog.SUCCESS,
        icon: IconOfDialog.SUCCESS,
        ignoreBackdrop: true
      };
      this.dialogService.options(dialog);
    }, error => {
      dialog = {
        title: 'Error',
        description: 'Your Price wasn\'t changed',
        btnNo: 'Accept',
        type: TypeOfDialog.DANGER,
        icon: IconOfDialog.DANGER,
        keyboardEsc: true
      };
      this.dialogService.options(dialog);
    }, () => {
      console.log('finish');
      this.amount = null;
      this.namePlace = null;
      this.money = null;
    });
  }

  editPrice(identifier: any) {
    console.log(identifier, "identifier");
    var namePlace = (document.getElementById(identifier + "name") as HTMLInputElement).value;
    var amount = (document.getElementById(identifier + "amount") as HTMLInputElement).value;
    var money = (document.getElementById(identifier + "money") as HTMLInputElement).value;
    console.log(namePlace);
    console.log(amount);
    console.log(money);
    let patchNamePlace: IPatch = {
      op: 'replace',
      path: '/nameSiteInEvent',
      value: namePlace,
    };

    let patchAmount: IPatch = {
      op: 'replace',
      path: '/amount',
      value: Number(amount),
    };

    let patchMoney: IPatch = {
      op: 'replace',
      path: '/money',
      value: money,
    };
    let priceId: number;
    var patchOperations = [patchNamePlace, patchAmount, patchMoney];
    let dialog: IDialog;
    this.service.patchPrice(identifier, patchOperations).subscribe(response => {
      console.log('edit', response);
      this.prices = this.prices.map(price => { return price.priceId === identifier ? response : price });
      dialog = {
        title: 'Successful',
        description: 'Your Price has been changed',
        btnNo: 'Accept',
        type: TypeOfDialog.SUCCESS,
        icon: IconOfDialog.SUCCESS,
        ignoreBackdrop: true
      };
      this.dialogService.options(dialog);
    }, error => {
      dialog = {
        title: 'Error',
        description: 'Your Price wasn\'t changed',
        btnNo: 'Accept',
        type: TypeOfDialog.DANGER,
        icon: IconOfDialog.DANGER,
        keyboardEsc: true
      };
      this.dialogService.options(dialog);
    }, () => {
      console.log('finish');
    });;
  }

  deletePrice(priceId: any) {
    let dialog: IDialog;
    this.service.removePrice(priceId).subscribe(response => {
      console.log('delete', response);
      this.prices = this.prices.filter(price => price.priceId !== priceId);
      dialog = {
        title: 'Successful',
        description: 'Your Price event has been removed',
        btnNo: 'Accept',
        type: TypeOfDialog.SUCCESS,
        icon: IconOfDialog.SUCCESS,
        ignoreBackdrop: true
      };
      this.dialogService.options(dialog);
    }, error => {
      dialog = {
        title: 'Error',
        description: 'Your Price Event wasn\'t removed',
        btnNo: 'Accept',
        type: TypeOfDialog.DANGER,
        icon: IconOfDialog.DANGER,
        keyboardEsc: true
      };
      this.dialogService.options(dialog);
    }, () => {
      console.log('finish');
    });;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
