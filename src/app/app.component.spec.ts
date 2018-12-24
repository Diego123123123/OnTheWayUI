import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component, OnInit, OnDestroy, ViewChild  } from '@angular/core';
import { CategoriesService } from './services/categories.service';
import { LoginComponent } from './components/login/login.component'
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { EventListService } from './components/events-list/event-list.service';
import { EventsService } from './services/events.service';
import { ISingleEvent } from './models/event';
import { IParams } from './models/params.model';
import { ThemesListService } from './components/themes-list/themes-list.service';
import { ITheme } from './models/theme.model';
import { Subscription } from 'rxjs';
import { MessageService } from './services/message.service';
import { ThemesService } from './services/themes.service';
import { AlertService } from './common/alert/alert.service';
import { IAlert, IconOfAlert, ColorOfAlert } from './common/alert/alerts.model';
import { CurrentUserService } from './components/user/current-user.service';
import { IUser } from './models/user.model';
import { IDialog, TypeOfDialog, IconOfDialog } from './common/dialog/dialog.model';
import { ModalDirective, NavbarModule, ModalModule } from 'angular-bootstrap-md';
import { ICategory } from './models/category.model';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { AlertComponent } from './common/alert/alert.component';
import { PipeModule } from './modules/pipe/pipe.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './components/general/header/header.component';
import { FooterComponent } from './components/general/footer/footer.component';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, AlertComponent, HeaderComponent, FooterComponent],
      imports: [NavbarModule, RouterModule, ModalModule.forRoot(), PipeModule, RouterTestingModule],
      providers: [CategoriesService, EventListService, EventsService, ThemesListService, MessageService,
        ThemesService, AlertService, CurrentUserService]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
