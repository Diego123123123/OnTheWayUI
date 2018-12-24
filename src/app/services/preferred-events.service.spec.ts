import { TestBed, inject } from '@angular/core/testing';

import { PreferredEventsService } from './preferred-events.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

describe('PreferredEventsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreferredEventsService],
      imports: [HttpModule, HttpClientModule]
    });
  });

  it('should be created', inject([PreferredEventsService], (service: PreferredEventsService) => {
    expect(service).toBeTruthy();
  }));
});
