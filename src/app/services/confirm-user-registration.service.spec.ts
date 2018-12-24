import { TestBed, inject } from '@angular/core/testing';

import { ConfirmUserRegistrationService } from './confirm-user-registration.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

describe('ConfirmUserRegistrationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfirmUserRegistrationService],
      imports: [HttpModule, HttpClientModule]
    });
  });

  it('should be created', inject([ConfirmUserRegistrationService], (service: ConfirmUserRegistrationService) => {
    expect(service).toBeTruthy();
  }));
});
