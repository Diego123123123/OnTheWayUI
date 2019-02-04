import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoughtTicketsListComponent } from './bought-tickets-list.component';

describe('BoughtTicketsComponent', () => {
  let component: BoughtTicketsListComponent;
  let fixture: ComponentFixture<BoughtTicketsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoughtTicketsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoughtTicketsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
