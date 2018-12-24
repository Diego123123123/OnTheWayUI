import { TestBed, inject } from '@angular/core/testing';

import { ThemesService } from './themes.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

describe('ThemesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemesService],
      imports: [HttpModule, HttpClientModule]
    });
  });

  it('should be created', inject([ThemesService], (service: ThemesService) => {
    expect(service).toBeTruthy();
  }));
});
