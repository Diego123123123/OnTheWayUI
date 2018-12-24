import { TestBed, inject } from '@angular/core/testing';

import { EventsCalendarService } from './events-calendar.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

describe('EventsCalendarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventsCalendarService],
      imports: [HttpModule, HttpClientModule]
    });
  });

  it('should be created', inject([EventsCalendarService], (service: EventsCalendarService) => {
    expect(service).toBeTruthy();
  }));
});
