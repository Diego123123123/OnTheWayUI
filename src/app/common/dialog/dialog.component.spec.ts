import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';
import { DialogService } from './dialog.service';
import { ModalModule } from 'angular-bootstrap-md';
import { RouterTestingModule } from '@angular/router/testing';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogComponent ],
      imports:[ ModalModule.forRoot(), RouterTestingModule],
      providers: [DialogService]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(DialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
