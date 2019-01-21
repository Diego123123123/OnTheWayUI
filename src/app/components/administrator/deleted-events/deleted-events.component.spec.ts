import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedEventsComponent } from './deleted-events.component';

describe('DeletedEventsComponent', () => {
  let component: DeletedEventsComponent;
  let fixture: ComponentFixture<DeletedEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
