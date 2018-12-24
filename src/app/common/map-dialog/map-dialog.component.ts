import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { Subscription } from 'rxjs';
import { MapDialogService } from './map-dialog.service';
import { ActivatedRoute } from '@angular/router';
import { EventDetailService } from '../../services/event-detail.service';
import { IMapDialog } from '../dialog/dialog.model';

@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.scss']
})
export class MapDialogComponent implements OnInit {

  @ViewChild('frame') frame: ModalDirective;
  private subscription : Subscription = null;
  private eventlat: number;
  private eventlng: number;
  private zoom: number = 16.5;
  private eventId: any;
  private event: any;
  private eventPlaceName: any;
  private mapDialog: IMapDialog = {
    latitude: 0,
    longitude: 0,
    type: '',
  };

  constructor(private mapDialogService: MapDialogService, private route: ActivatedRoute, private eventService: EventDetailService) { }

  ngOnInit() {
    this.subscription = this.mapDialogService.mapDialogSubject$.subscribe((dialog)=>{
      console.log("this is the dialog to be shown", dialog);
      this.mapDialog = dialog;
      this.eventlat = dialog.latitude;
      this.eventlng = dialog.longitude;
      this.eventPlaceName = dialog.eventPlaceName;
      this.frame.show();
      console.log(this.frame);
      this.eventPlaceName = dialog.eventPlaceName;
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
