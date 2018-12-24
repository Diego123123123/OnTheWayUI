import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { DialogService } from './dialog.service';
import { Subscription } from 'node_modules/rxjs';
import { IDialog, TypeOfDialog } from './dialog.model';
import { Router } from '@angular/router';
import { ModalDirective } from '../../../../node_modules/angular-bootstrap-md';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, OnDestroy {

  @ViewChild('frame') frame: ModalDirective;
  private dialogRef: Subscription = null;
  private dialogOptions: IDialog = {
    title: '',
    description: '',
    type: '',
  };

  constructor(private dialogService: DialogService, private router: Router) { }

  ngOnInit() {
    this.dialogRef = this.dialogService.dialogSubject$.subscribe(() => {
      this.frame.show();
      console.log(this.frame);
      this.dialogOptions = <IDialog>this.dialogService.getOptions();
      this.frame.config.ignoreBackdropClick = this.dialogOptions.ignoreBackdrop ? true : false;
      this.frame.config.keyboard = this.dialogOptions.keyboardEsc ? true : false;
    });
  }

  onShow(event: any) {
    console.log(event);
  }

  redirectBtnYes(route: string) {
    this.router.navigate([route]);
  }

  ngOnDestroy() {
    this.dialogRef.unsubscribe();
  }

}
