import { TestBed, inject } from '@angular/core/testing';

import { SitesListService } from './sites-list.service';

describe('SitesListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SitesListService]
    });
  });

  it('should be created', inject([SitesListService], (service: SitesListService) => {
    expect(service).toBeTruthy();
  }));
});
