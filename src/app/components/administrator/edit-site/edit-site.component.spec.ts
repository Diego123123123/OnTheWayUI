import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSiteComponent } from './edit-site.component';
import { PipeModule } from '../../../modules/pipe/pipe.module';
import { ModalModule, MDBBootstrapModule, TooltipConfig } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UploadImagesComponent } from '../../upload-images/upload-images.component';
import { AgmCoreModule } from '@agm/core';
import { DialogService } from '../../../common/dialog/dialog.service';
import { SiteService } from '../../../services/site.service';
import { ScheduleEventServiceService } from '../../../services/schedule-event-service.service';
import { SchedulesService } from '../../../services/schedules.service';
import { ScheduleSiteService } from '../../../services/schedule-site-service.service';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogComponent } from 'src/app/common/dialog/dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BlobService } from 'angular-azure-blob-service';

describe('EditSiteComponent', () => {
  let component: EditSiteComponent;
  let fixture: ComponentFixture<EditSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSiteComponent, UploadImagesComponent, DialogComponent],
      imports: [AgmCoreModule.forRoot({}), PipeModule.forRoot(), ModalModule.forRoot(), FormsModule, MatFormFieldModule, MDBBootstrapModule.forRoot(), ReactiveFormsModule, 
      MatSelectModule, MatCheckboxModule, RouterTestingModule],
      providers: [DialogService, SiteService, ScheduleEventServiceService, SchedulesService, ScheduleSiteService, TooltipConfig, BlobService ],
      schemas: [ NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});