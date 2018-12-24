import { TestBed, inject } from '@angular/core/testing';

import { CategoriesService } from './categories.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

describe('Services\categoriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoriesService],
      imports: [HttpModule, HttpClientModule]
    });
  });

  it('should be created', inject([CategoriesService], (service: CategoriesService) => {
    expect(service).toBeTruthy();
  }));
});
