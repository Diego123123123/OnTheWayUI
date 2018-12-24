import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotExistEventsComponent } from './not-exist-events.component';

describe('NotExistEventsComponent', () => {
  let component: NotExistEventsComponent;
  let fixture: ComponentFixture<NotExistEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotExistEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotExistEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
