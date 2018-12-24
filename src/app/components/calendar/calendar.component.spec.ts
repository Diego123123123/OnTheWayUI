import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';
import { AgmCoreModule } from '@agm/core';
import { PipeModule } from '../../modules/pipe/pipe.module';
import { ModalModule, MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { CalendarDayModule, CalendarCommonModule, CalendarMonthViewComponent, CalendarModule, CalendarDateFormatter } from 'angular-calendar';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarSiteService } from '../../services/calendar-site.service';
import { ScheduleEventServiceService } from '../../services/schedule-event-service.service';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarComponent, CalendarComponent],
      imports: [AgmCoreModule.forRoot({}), PipeModule.forRoot(), ModalModule.forRoot(), FormsModule, MatFormFieldModule, MDBBootstrapModule, ReactiveFormsModule, 
        MatSelectModule, MatCheckboxModule, HttpClientModule, HttpModule, CalendarCommonModule, CalendarModule.forRoot(), RouterTestingModule ],
      providers: [CalendarSiteService, ScheduleEventServiceService],
      })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
