import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IPriceDialog } from '../dialog/dialog.model';

@Injectable({
  providedIn: 'root'
})
export class PriceServiceDialogService {

  private priceDialogSubject = new Subject<IPriceDialog>();
  public priceDialogSubject$ = this.priceDialogSubject.asObservable();
  private priceDialog: IPriceDialog;

  constructor() { }

  public showDialog(pricedialog: IPriceDialog): void {
    this.priceDialog = { ...pricedialog };
    this.priceDialogSubject.next(this.priceDialog);
  }

  public getPriceDialog(): IPriceDialog {
    return this.priceDialog;
  }
}
