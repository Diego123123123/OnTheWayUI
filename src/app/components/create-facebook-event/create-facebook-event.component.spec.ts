import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFacebookEventComponent } from './create-facebook-event.component';

describe('CreateFacebookEventComponent', () => {
  let component: CreateFacebookEventComponent;
  let fixture: ComponentFixture<CreateFacebookEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFacebookEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFacebookEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
