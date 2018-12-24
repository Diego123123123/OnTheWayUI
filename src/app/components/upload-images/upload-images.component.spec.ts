import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadImagesComponent } from './upload-images.component';
import { PipeModule } from 'src/app/modules/pipe/pipe.module';
import { MdbCardComponent, MdbCardBodyComponent} from 'angular-bootstrap-md';
import { BlobService } from 'angular-azure-blob-service';

describe('UploadImagesComponent', () => {
  let component: UploadImagesComponent;
  let fixture: ComponentFixture<UploadImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadImagesComponent, MdbCardComponent, MdbCardBodyComponent],
      imports: [PipeModule.forRoot()],
      providers: [BlobService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
describe('UploadImage', () => {
  it('checks if k is e', () => expect('UploadImage').toBe('UploadImage'));
});
