import { TestBed, inject } from '@angular/core/testing';

import { BoughtTicketsListService } from './bought-tickets-list.service';

describe('BoughtTicketsListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoughtTicketsListService]
    });
  });

  it('should be created', inject([BoughtTicketsListService], (service: BoughtTicketsListService) => {
    expect(service).toBeTruthy();
  }));
});
