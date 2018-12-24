import { TestBed, inject } from '@angular/core/testing';

import { AdminEventsService } from './admin-events.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

describe('AdminEventsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminEventsService],
      imports: [HttpModule, HttpClientModule]
    });
  });

  it('should be created', inject([AdminEventsService], (service: AdminEventsService) => {
    expect(service).toBeTruthy();
  }));
});
