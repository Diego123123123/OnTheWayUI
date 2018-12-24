import { TestBed, inject } from '@angular/core/testing';

import { EventDetailService } from './event-detail.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

describe('EventDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventDetailService],
      imports: [HttpModule, HttpClientModule]
    });
  });

  it('should be created', inject([EventDetailService], (service: EventDetailService) => {
    expect(service).toBeTruthy();
  }));
});
