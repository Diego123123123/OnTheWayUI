import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceEventsComponent } from './balance-events.component';

describe('BalanceEventsComponent', () => {
  let component: BalanceEventsComponent;
  let fixture: ComponentFixture<BalanceEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
