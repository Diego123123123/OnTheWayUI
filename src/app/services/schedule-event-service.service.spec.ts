import { TestBed, inject } from '@angular/core/testing';

import { ScheduleEventServiceService } from './schedule-event-service.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

describe('ScheduleEventServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScheduleEventServiceService],
      imports: [HttpModule, HttpClientModule]
    });
  });

  it('should be created', inject([ScheduleEventServiceService], (service: ScheduleEventServiceService) => {
    expect(service).toBeTruthy();
  }));
});
