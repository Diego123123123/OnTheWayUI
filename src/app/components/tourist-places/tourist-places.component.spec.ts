import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristPlacesComponent } from './tourist-places.component';

describe('TouristPlacesComponent', () => {
  let component: TouristPlacesComponent;
  let fixture: ComponentFixture<TouristPlacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TouristPlacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TouristPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
