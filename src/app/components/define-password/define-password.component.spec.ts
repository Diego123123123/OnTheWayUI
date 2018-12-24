import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinePasswordComponent } from './define-password.component';

describe('DefinePasswordComponent', () => {
  let component: DefinePasswordComponent;
  let fixture: ComponentFixture<DefinePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefinePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
