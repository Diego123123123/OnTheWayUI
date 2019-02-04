import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoughtTicketComponent } from './bought-ticket.component';

describe('BoughtTicketComponent', () => {
  let component: BoughtTicketComponent;
  let fixture: ComponentFixture<BoughtTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoughtTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoughtTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
