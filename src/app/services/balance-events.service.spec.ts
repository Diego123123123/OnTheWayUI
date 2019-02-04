import { TestBed, inject } from '@angular/core/testing';

import { BalanceEventsService } from './balance-events.service';

describe('BalanceEventsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BalanceEventsService]
    });
  });

  it('should be created', inject([BalanceEventsService], (service: BalanceEventsService) => {
    expect(service).toBeTruthy();
  }));
});
