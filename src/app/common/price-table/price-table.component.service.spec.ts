import { TestBed, inject } from '@angular/core/testing';

import { PriceServiceDialogService } from './price-table.component.service';

describe('PriceServiceDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PriceServiceDialogService]
    });
  });

  it('should be created', inject([PriceServiceDialogService], (service: PriceServiceDialogService) => {
    expect(service).toBeTruthy();
  }));
});
