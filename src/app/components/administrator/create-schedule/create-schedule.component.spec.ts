import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateScheduleComponent } from './create-schedule.component';
import { DialogService } from '../../../common/dialog/dialog.service';
import { SchedulesService } from '../../../services/schedules.service';
import { MatCheckboxModule, MatCheckbox } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

describe('CreateScheduleComponent', () => {
  let component: CreateScheduleComponent;
  let fixture: ComponentFixture<CreateScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateScheduleComponent ],
      imports: [ FormsModule, MatFormFieldModule, ReactiveFormsModule, MatSelectModule, MatCheckboxModule, HttpClientModule, HttpModule],
      providers: [DialogService, SchedulesService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
