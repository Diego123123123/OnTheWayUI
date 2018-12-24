import { TestBed, inject } from '@angular/core/testing';

import { PricesSiteService } from './prices-site-service.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

describe('PricesSiteServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PricesSiteService],
      imports: [HttpModule, HttpClientModule]
    });
  });

  it('should be created', inject([PricesSiteService], (service: PricesSiteService) => {
    expect(service).toBeTruthy();
  }));
});
