import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordComponent } from './change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { PipeModule } from '../../modules/pipe/pipe.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MdbModule } from '../../modules/mdb-bootstrap/mdb-bootstrap.module';
import { IconsModule, ModalModule, WavesModule, MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from '../../common/dialog/dialog.component';
import { Md5 } from 'ts-md5';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePasswordComponent, DialogComponent ],
      imports: [AgmCoreModule.forRoot(), PipeModule, RouterTestingModule, MdbModule, IconsModule, FormsModule, ModalModule.forRoot(), ReactiveFormsModule,
        MatSelectModule, MatCheckboxModule, MDBBootstrapModule, WavesModule, BrowserAnimationsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
