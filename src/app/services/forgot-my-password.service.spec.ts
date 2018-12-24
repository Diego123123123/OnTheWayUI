import { TestBed, inject } from '@angular/core/testing';

import { ForgotMyPasswordService } from './forgot-my-password.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

describe('ForgotMyPasswordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForgotMyPasswordService],
      imports: [HttpModule, HttpClientModule]
    });
  });

  it('should be created', inject([ForgotMyPasswordService], (service: ForgotMyPasswordService) => {
    expect(service).toBeTruthy();
  }));
});
