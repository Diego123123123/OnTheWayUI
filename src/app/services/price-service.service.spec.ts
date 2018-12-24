import { TestBed, inject } from '@angular/core/testing';

import { PriceService } from './price-service.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

describe('PriceServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PriceService],
      imports: [HttpModule, HttpClientModule]
    });
  });

  it('should be created', inject([PriceService], (service: PriceService) => {
    expect(service).toBeTruthy();
  }));
});
