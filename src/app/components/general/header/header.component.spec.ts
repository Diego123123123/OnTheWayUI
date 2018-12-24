import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { AlertComponent } from '../../../common/alert/alert.component';
import { FooterComponent } from '../footer/footer.component';
import { NavbarModule, ModalModule } from 'angular-bootstrap-md';
import { RouterModule } from '@angular/router';
import { PipeModule } from '../../../modules/pipe/pipe.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ThemesListService } from '../../themes-list/themes-list.service';
import { MessageService } from '../../../services/message.service';
import { EventsService } from '../../../services/events.service';
import { EventListService } from '../../events-list/event-list.service';
import { CategoriesService } from '../../../services/categories.service';
import { ThemesService } from '../../../services/themes.service';
import { AlertService } from '../../../common/alert/alert.service';
import { CurrentUserService } from '../../user/current-user.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, AlertComponent, HeaderComponent, FooterComponent],
      imports: [NavbarModule, RouterModule, ModalModule.forRoot(), PipeModule, RouterTestingModule],
      providers: [CategoriesService, EventListService, EventsService, ThemesListService, MessageService,
        ThemesService, AlertService, CurrentUserService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Frame not is show', async( () => {
    expect(component.frame.isShown).toEqual(false);
  }));

  it('Frame is show', async( () => {
    component.frame.show();
    expect(component.frame.isShown).toEqual(true);
  }));
});
