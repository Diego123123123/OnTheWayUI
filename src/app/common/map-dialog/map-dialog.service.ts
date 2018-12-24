import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IMapDialog } from '../dialog/dialog.model';

@Injectable({
  providedIn: 'root'
})
export class MapDialogService {

  private mapDialogSubject = new Subject<IMapDialog>();
  public mapDialogSubject$ = this.mapDialogSubject.asObservable();
  private mapDialog: IMapDialog;

  constructor() { }

  public showDialog(mapdialog: IMapDialog): void{
    this.mapDialog = {...mapdialog};
    this.mapDialogSubject.next(this.mapDialog);
  }

  public getMapDialog(): IMapDialog {
    return this.mapDialog;
  }
}
