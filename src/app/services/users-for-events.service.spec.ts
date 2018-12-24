import { TestBed, inject } from '@angular/core/testing';

import { UsersForEventsService } from './users-for-events.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

describe('UsersForEventsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersForEventsService],
      imports: [HttpModule, HttpClientModule]
    });
  });

  it('should be created', inject([UsersForEventsService], (service: UsersForEventsService) => {
    expect(service).toBeTruthy();
  }));
});
