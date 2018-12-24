import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { timeout } from 'q';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IAlert, IconOfAlert, ColorOfAlert } from './alerts.model';
import { AlertService } from './alert.service';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  @ViewChild('alert') alert: ElementRef;
  private alertRef: Subscription = null;
  private alertOptions: IAlert = {
    icon: IconOfAlert.SUCCESS,
    color: ColorOfAlert.SUCCESS,
    title: 'ERROR!',
    message: 'Have been an error asdadasdasdasdasdasdas adasdasd',
    durationTime: 5000
  };

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alert.nativeElement.style.display = 'none';
    this.alertRef = this.alertService.alertSubject$.subscribe((result) => {
      this.alertOptions = {...result};
      this.openAlert();
      setTimeout(() => {
        this.closeAlert();
      }, this.alertOptions.durationTime );
    });
  }

  ngOnDestroy() {
    this.alertRef.unsubscribe();
  }

  getAlertClass() {
    return `alert alert-${this.alertOptions.color} alert-dismissible fade text-center`;
  }

  openAlert() {
    this.alert.nativeElement.style.display = 'block';
    this.alert.nativeElement.classList.add('show');
  }

  closeAlert() {
    this.alert.nativeElement.style.display = 'none';
    this.alert.nativeElement.classList.remove('show');
  }

}
