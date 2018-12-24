import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';

import { AlertService } from './alert.service';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertComponent ],
      providers: [AlertService]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(AlertComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should be alertRef', async( () => {
    component.ngOnInit();
    expect(component.alert.nativeElement.style.display).toEqual('none');
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
