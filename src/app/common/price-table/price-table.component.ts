import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { Subscription } from 'rxjs';
import { IEvent } from '../../models/event.model';
import { IPatch } from '../../models/patch.model';
import { IPrice } from '../../models/price-model';
import { IPriceSite } from '../../models/price-site.model';
import { TypeOfDialog, IDialog, IconOfDialog, IMapDialog } from '../../common/dialog/dialog.model';
import { DialogService } from '../../common/dialog/dialog.service';
import { IPriceDialog } from '../dialog/dialog.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PriceServiceDialogService } from './price-table.component.service';
import { EventDetailService } from '../../services/event-detail.service';
import { PriceService } from '../../services/price-service.service';
import { SiteService } from '../../services/site.service';
import { PricesSiteService } from '../../services/prices-site-service.service';
import * as $ from 'jquery';
import { PatchTicket } from 'src/app/components/administrator/create-qrcode/patch-ticket';
import { TicketsService } from 'src/app/services/admin/tickets/tickets.service';

declare let paypal: any;

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
  addScript: boolean = false;
  paypalLoad: boolean = true;
  price: number;
  priceId: any;
  name: any;
  index: any;
  permitBuy: boolean = false;
  patchTicket: PatchTicket

  finalAmount: number = 1;
  private priceDialog: IPriceDialog = {
    itemId: 0,
    prices: null,
    type: "",
    typePrice: "",
    isAdmin: false
  };
  private ticketsAvailable: number;


  // tslint:disable-next-line:max-line-length
  constructor(private priceDialogService: PriceServiceDialogService, private route: ActivatedRoute, private eventService: EventDetailService, private siteService: SiteService,
    private pricesSiteService: PricesSiteService, private priceService: PriceService, private dialogService: DialogService, private ticketServ: TicketsService, private router: Router) {
      this.patchTicket = new PatchTicket(ticketServ, dialogService, router);
     }

  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'ARKSmrT7KABOhO9Svb2m8WOVZmdbE9uls1Iow_HvOJg7d520Pe0sAlBAvXxlzkaZb7PSempz4HK2ekrl'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.price, currency: 'USD' } }
          ]
        }
      });
    },
    onError: function (data, actions) {
      console.log('error');
    },
    onCancel: function (data, actions) {
      window.alert('Succesfully cancelled');
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        let nameinput = $('#customerName').val();
        this.name = nameinput;
        console.log('--*--');
        console.log(this.index);
        this.prices[this.index].ticketsAvailable = this.prices[this.index].ticketsAvailable - 1;
        this.pricesSiteService.buyTicket(this.priceId, this.prices[this.index]).subscribe((msg) => {
          this.patchTicket.createTicket(msg, nameinput);
        })
        window.alert('Thank you for your purchase!');

      }).catch((error) => {
        console.log(window.alert('sorry we could not complete your transaction'));
      });
    }
  };
  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn1');
        this.paypalLoad = false;
      })
    }
  }
  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    });
  }

  ngOnInit() {
    if(sessionStorage.getItem('role')){
      var role = sessionStorage.getItem('role');
      if(Number(role) == 3){this.permitBuy = true}
    }
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
      this.priceDialog = dialog;
      this.itemId = dialog.itemId;
      this.prices = dialog.prices;
      this.isAdmin = dialog.isAdmin;
      this.frame.show();
    });
  }

  showModal(modal, price, priceId, index) {
    modal.show();
    this.price = price;
    this.priceId = priceId;
    this.index = index;
  }

  addPrice() {
    let price: any;
    if (this.type === "event") {
      let newPrice: IPrice = {
        EventId: Number(this.itemId),
        Amount: Number(this.amount),
        NameSiteInEvent: this.namePlace,
        Money: "USD",
        TicketsAvailable: Number(this.ticketsAvailable),
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
      dialog = {
        title: 'Successful',
        description: 'Your Price has been created',
        btnNo: 'Accept',
        type: TypeOfDialog.SUCCESS,
        icon: IconOfDialog.SUCCESS,
        ignoreBackdrop: true
      };
      this.dialogService.options(dialog);
      setTimeout(function () {
        window.location.reload();
      }, 2000);
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
      this.amount = null;
      this.namePlace = null;
      this.money = null;
      this.ticketsAvailable = null;
    });
  }

  editPrice(identifier: any) {
    var namePlace = (document.getElementById(identifier + "name") as HTMLInputElement).value;
    var amount = (document.getElementById(identifier + "amount") as HTMLInputElement).value;
    var money = (document.getElementById(identifier + "money") as HTMLInputElement).value;
    var ticketsAvailable = (document.getElementById(identifier + "ticketsAvailable") as HTMLInputElement).value;
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
    let patchTicketsAvailable: IPatch = {
      op: 'replace',
      path: '/ticketsAvailable',
      value: ticketsAvailable,
    };
    let priceId: number;
    var patchOperations = [patchNamePlace, patchAmount, patchMoney, patchTicketsAvailable];
    let dialog: IDialog;
    this.service.patchPrice(identifier, patchOperations).subscribe(response => {
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
      setTimeout(function () {
        window.location.reload();
      }, 2000);
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
    });
  }

  deletePrice(priceId: any) {
    let dialog: IDialog;
    this.service.removePrice(priceId).subscribe(response => {
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
      setTimeout(function () {
        window.location.reload();
      }, 2000);
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
    });;
  }

  buyByPaypal(identifier: any) {
    console.log(identifier);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
