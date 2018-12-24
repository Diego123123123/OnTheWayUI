import { TestBed, inject } from '@angular/core/testing';

import { ChangePasswordService } from './change-password-service.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

describe('ChangePasswordServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChangePasswordService],
      imports: [HttpModule, HttpClientModule]
    });
  });

  it('should be created', inject([ChangePasswordService], (service: ChangePasswordService) => {
    expect(service).toBeTruthy();
  }));
});
