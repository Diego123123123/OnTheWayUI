import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSiteComponent } from './create-site.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

describe('CreateSiteComponent', () => {
  let component: CreateSiteComponent;
  let fixture: ComponentFixture<CreateSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSiteComponent ],
      imports: [AgmCoreModule.forRoot(), FormsModule, MatFormFieldModule, ReactiveFormsModule, MatSelectModule, MatCheckboxModule, 
        HttpClientModule, HttpModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
