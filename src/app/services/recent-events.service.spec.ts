import { TestBed, inject } from '@angular/core/testing';

import { RecentEventsService } from './recent-events.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

describe('RecentEventsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecentEventsService],
      imports: [HttpModule, HttpClientModule]
    });
  });

  it('should be created', inject([RecentEventsService], (service: RecentEventsService) => {
    expect(service).toBeTruthy();
  }));
});
