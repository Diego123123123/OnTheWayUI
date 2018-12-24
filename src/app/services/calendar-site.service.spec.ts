import { TestBed, inject } from '@angular/core/testing';

import { CalendarSiteService } from './calendar-site.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

describe('CalendarSiteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarSiteService],
      imports: [HttpModule, HttpClientModule]
    });
  });

  it('should be created', inject([CalendarSiteService], (service: CalendarSiteService) => {
    expect(service).toBeTruthy();
  }));
});
