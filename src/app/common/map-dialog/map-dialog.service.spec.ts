import { TestBed, inject } from '@angular/core/testing';

import { MapDialogService } from './map-dialog.service';

describe('MapDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapDialogService]
    });
  });

  it('should be created', inject([MapDialogService], (service: MapDialogService) => {
    expect(service).toBeTruthy();
  }));
});
