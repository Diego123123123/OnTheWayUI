import { TestBed, inject } from '@angular/core/testing';

import { EventsInSiteService } from './events-in-site-service.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

describe('EventsInSiteServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventsInSiteService],
      imports: [HttpModule, HttpClientModule]
    });
  });

  it('should be created', inject([EventsInSiteService], (service: EventsInSiteService) => {
    expect(service).toBeTruthy();
  }));
});
