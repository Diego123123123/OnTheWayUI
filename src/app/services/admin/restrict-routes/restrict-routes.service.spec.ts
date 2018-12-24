import { TestBed, inject } from '@angular/core/testing';

import { RestrictRoutesService } from './restrict-routes.service';
import { AuthenticationService } from '../../authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('RestrictRoutesService', () => {
  let service: RestrictRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule, HttpModule, RouterTestingModule],
      providers: [RestrictRoutesService, AuthenticationService]
    });
  });

  it('should be created', inject([RestrictRoutesService], (service: RestrictRoutesService) => {
    expect(service).toBeTruthy();
  }));
});
