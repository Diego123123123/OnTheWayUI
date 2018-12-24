import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceTableComponent } from './price-table.component';
import { DialogService } from '../dialog/dialog.service';
import { PriceServiceDialogService } from './price-table.component.service';
import { EventDetailService } from '../../services/event-detail.service';
import { PriceService } from '../../services/price-service.service';
import { SiteService } from '../../services/site.service';
import { PricesSiteService } from '../../services/prices-site-service.service';
import { ModalModule } from 'angular-bootstrap-md';
import { PipeModule } from '../../modules/pipe/pipe.module';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';


describe('PriceTableComponent', () => {
  let component: PriceTableComponent;
  let fixture: ComponentFixture<PriceTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceTableComponent ],
      imports: [ModalModule.forRoot(), PipeModule, FormsModule, BrowserModule, RouterTestingModule ],
      providers: [DialogService, PriceServiceDialogService, EventDetailService, PriceService, SiteService, PricesSiteService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
