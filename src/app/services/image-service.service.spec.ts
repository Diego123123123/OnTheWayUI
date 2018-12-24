import { TestBed, inject } from '@angular/core/testing';

import { ImageService } from './image-service.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

describe('ImageServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageService],
      imports: [HttpModule, HttpClientModule]
    });
  });

  it('should be created', inject([ImageService], (service: ImageService) => {
    expect(service).toBeTruthy();
  }));
});
