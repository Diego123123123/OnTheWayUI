import { TestBed, inject } from '@angular/core/testing';

import { EventsService } from './events.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

describe('EventsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventsService],
      imports: [HttpModule, HttpClientModule]
    });
  });

  it('should be created', inject([EventsService], (service: EventsService) => {
    expect(service).toBeTruthy();
  }));
});
