import { async, TestBed, inject, ComponentFixture, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { OnTheWayService } from './on-the-way.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

describe('OnTheWayService', () => {
    let fixture: ComponentFixture<OnTheWayService>;
    let injector: TestBed;
    let service: OnTheWayService;
    let httpMock: HttpTestingController;
    
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule, HttpModule],
        providers: [OnTheWayService]
      });
      injector = getTestBed();
      service = injector.get(OnTheWayService);
      httpMock = injector.get(HttpTestingController);
    });

    it('should be created', inject([OnTheWayService], (service: OnTheWayService) => {
      expect(service).toBeTruthy();
    }));
  });