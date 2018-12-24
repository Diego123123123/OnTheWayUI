import { TestBed, inject } from '@angular/core/testing';

import { CommentsService } from './comments.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

describe('CommentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommentsService],
      imports: [HttpModule, HttpClientModule]
    });
  });

  it('should be created', inject([CommentsService], (service: CommentsService) => {
    expect(service).toBeTruthy();
  }));
});
