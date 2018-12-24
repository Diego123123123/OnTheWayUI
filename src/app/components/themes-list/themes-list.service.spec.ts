import { TestBed, inject } from '@angular/core/testing';

import { ThemesListService } from './themes-list.service';

describe('ThemesListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemesListService]
    });
  });

  it('should be created', inject([ThemesListService], (service: ThemesListService) => {
    expect(service).toBeTruthy();
  }));
});
