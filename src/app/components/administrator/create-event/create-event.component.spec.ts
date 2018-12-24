import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventComponent } from './create-event.component';
import { FilterComponent } from '../../filter/filter.component';
import { IconsModule, ModalModule, MDBBootstrapModule, ModalBackdropComponent, MDBRootModule, MDBModalService, MdbInputDirective, WavesModule } from 'angular-bootstrap-md';
import { PaginatorComponent } from '../../paginator/paginator.component';
import { DialogComponent } from '../../../common/dialog/dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MdbModule } from '../../../modules/mdb-bootstrap/mdb-bootstrap.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from '../../../modules/pipe/pipe.module';
import { DialogService } from '../../../common/dialog/dialog.service';
import { CategoriesService } from '../../../services/categories.service';
import { MatSelectModule } from '@angular/material/select';
import { CreateSiteComponent } from '../create-site/create-site.component';
import { CreateScheduleComponent } from '../create-schedule/create-schedule.component';
import { UploadImagesComponent } from '../../upload-images/upload-images.component';
import { AgmCoreModule } from '@agm/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateEventComponent', () => {
  let component: CreateEventComponent;
  let fixture: ComponentFixture<CreateEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEventComponent, FilterComponent,  PaginatorComponent, DialogComponent, 
       CreateSiteComponent, CreateScheduleComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
       imports: [AgmCoreModule.forRoot(), PipeModule, RouterTestingModule, MdbModule, IconsModule, FormsModule, ModalModule.forRoot(), ReactiveFormsModule,
      MatSelectModule, MatCheckboxModule, MDBBootstrapModule, WavesModule, BrowserAnimationsModule],
      providers: [DialogService, CategoriesService, MDBModalService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be site id', async( () => {
    component.viewSite("Felix capriles", 1);
    expect(component.siteId).toEqual(1);
  }));

  it('should be site name', async( () => {
    component.onSubmitSite({siteId: 1, name: "Felix capriles"});
    expect(component.siteName).toEqual('Felix capriles');
  }));

  it('should be image id', async( () => {
    component.image == true;
    component.createEvent();
    expect(component.imageId).toEqual(undefined);
  }));
});
