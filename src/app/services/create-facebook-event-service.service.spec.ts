import { TestBed, inject } from '@angular/core/testing';

import { CreateFacebookEventService } from './create-facebook-event-service.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

describe('CreateFacebookEventServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateFacebookEventService],
      imports: [HttpModule, HttpClientModule]
    });
  });

  it('should be created', inject([CreateFacebookEventService], (service: CreateFacebookEventService) => {
    expect(service).toBeTruthy();
  }));
});
