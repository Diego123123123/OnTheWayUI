import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PipeModule } from '../../../modules/pipe/pipe.module';
import { ModalModule, IconsModule, MdbCardComponent } from 'angular-bootstrap-md';
import { AdminEventsComponent } from '../admin-events/admin-events.component';
import { FilterComponent } from '../../filter/filter.component';
import { PaginatorComponent } from '../../paginator/paginator.component';
import { DialogComponent } from '../../../common/dialog/dialog.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminComponent, AdminEventsComponent, FilterComponent, MdbCardComponent, PaginatorComponent, DialogComponent ],
      imports: [ModalModule.forRoot(), PipeModule, RouterTestingModule, IconsModule, FormsModule, BrowserModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
