import { TestBed, inject } from '@angular/core/testing';

import { ChangePasswordUserLoggedInService } from './change-password-user-logged-in.service';

describe('ChangePasswordUserLoggedInService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChangePasswordUserLoggedInService]
    });
  });

  it('should be created', inject([ChangePasswordUserLoggedInService], (service: ChangePasswordUserLoggedInService) => {
    expect(service).toBeTruthy();
  }));
});
