import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from '../../../../node_modules/rxjs';
import { IDialog, TypeOfDialog, IconOfDialog } from './dialog.model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private dialogSubject = new Subject<IDialog>();
  public dialogSubject$ = this.dialogSubject.asObservable();
  private dialog: IDialog;

  constructor() { }

  public options( dialog: IDialog ): void {
    this.dialog = {...dialog};
    this.dialogSubject.next(this.dialog);
  }

  public getOptions(): IDialog {
    return this.dialog;
  }
}
