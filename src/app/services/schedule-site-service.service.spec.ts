import { TestBed, inject } from '@angular/core/testing';

import { ScheduleSiteService } from './schedule-site-service.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

describe('ScheduleSiteServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScheduleSiteService],
      imports: [HttpModule, HttpClientModule]
    });
  });

  it('should be created', inject([ScheduleSiteService], (service: ScheduleSiteService) => {
    expect(service).toBeTruthy();
  }));
});
