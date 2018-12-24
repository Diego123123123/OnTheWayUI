import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventsComponent } from './admin-events.component';
import { AdminEventsService } from '../../../services/admin-events.service';
import { FilterService } from '../../filter/filter.service';
import { PaginatorService } from '../../paginator/paginator.service';
import { UsersForEventsService } from '../../../services/users-for-events.service';
import { DialogService } from '../../../common/dialog/dialog.service';
import { FilterComponent } from '../../filter/filter.component';
import { PipeModule } from '../../../modules/pipe/pipe.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MdbModule } from '../../../modules/mdb-bootstrap/mdb-bootstrap.module';
import { IconsModule, MdbCardComponent, ModalModule } from 'angular-bootstrap-md';
import { PaginatorComponent } from '../../paginator/paginator.component';
import { DialogComponent } from '../../../common/dialog/dialog.component';
import { FormsModule } from '@angular/forms';

describe('AdminEventsComponent', () => {
  let component: AdminEventsComponent;
  let fixture: ComponentFixture<AdminEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEventsComponent, FilterComponent, MdbCardComponent, PaginatorComponent, DialogComponent ],
      imports: [PipeModule, RouterTestingModule, MdbModule, IconsModule, FormsModule, ModalModule.forRoot()],
      providers:[AdminEventsService, FilterService, PaginatorService, UsersForEventsService, DialogService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
