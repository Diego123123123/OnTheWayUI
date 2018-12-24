import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { ModalModule } from 'angular-bootstrap-md';
import { PipeModule } from '../../../modules/pipe/pipe.module';
import { ThemesListService } from '../../themes-list/themes-list.service';
import { ThemesService } from '../../../services/themes.service';
import { AlertService } from '../../../common/alert/alert.service';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent, ],
      imports: [ModalModule.forRoot(), PipeModule],
      providers: [ThemesListService,ThemesService, AlertService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
