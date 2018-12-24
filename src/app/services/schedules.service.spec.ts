import { TestBed, inject } from '@angular/core/testing';

import { SchedulesService } from './schedules.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

describe('SchedulesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchedulesService],
      imports: [HttpModule, HttpClientModule]
    });
  });

  it('should be created', inject([SchedulesService], (service: SchedulesService) => {
    expect(service).toBeTruthy();
  }));
});
