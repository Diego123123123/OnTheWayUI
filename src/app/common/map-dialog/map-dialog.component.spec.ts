import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDialogComponent } from './map-dialog.component';
import { MapDialogService } from './map-dialog.service';
import { EventDetailService } from '../../services/event-detail.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalModule } from 'angular-bootstrap-md';
import { AgmCoreModule } from '@agm/core';
import { ThemePipe } from '../../pipes/theme.pipe';
import { PipeModule } from '../../modules/pipe/pipe.module';

describe('MapDialogComponent', () => {
  let component: MapDialogComponent;
  let fixture: ComponentFixture<MapDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapDialogComponent],
      imports:[AgmCoreModule.forRoot(), ModalModule.forRoot(), PipeModule, RouterTestingModule],
      providers: [MapDialogService, EventDetailService]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(MapDialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
