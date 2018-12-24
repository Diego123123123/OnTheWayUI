import { AppRoutingModule } from './app-routing.module';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegisterFormComponent } from './components/user-register-form/user-register-form.component';
import { RecentEventsComponent } from './components/recent-events/recent-events.component';
import { LoginComponent } from './components/login/login.component'
import { AdminComponent } from './components/administrator/admin/admin.component';
import { ModuleWithProviders } from "@angular/core";
import { EventsListComponent } from './components/events-list/events-list.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { CreateEventComponent } from './components/administrator/create-event/create-event.component';
import { CreateAdminComponent } from './components/administrator/create-admin/create-admin.component';
import { ThemeComponent } from './components/theme/theme.component';
import { ThemesListComponent } from './components/themes-list/themes-list.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ChangePasswordComponent } from 'src/app/components/change-password/change-password.component';
import { ForgotMyPasswordComponent } from 'src/app/components/forgot-my-password/forgot-my-password.component';
import { UserComponent } from './components/user/user.component';
import { CreateFacebookEventComponent } from 'src/app/components/create-facebook-event/create-facebook-event.component';
import { DefinePasswordComponent } from './components/define-password/define-password.component';
import { TouristPlacesComponent } from './components/tourist-places/tourist-places.component';
import { CommentComponent } from './components/comment/comment.component';
import { CommentsListComponent } from './components/comments-list/comments-list.component';
import { EventRatingComponent } from './components/event-rating/event-rating.component';
import { PastEventsComponent } from './components/past-events/past-events.component';
import { SiteDetailComponent } from './components/site-detail/site-detail.component';
import { EditSiteComponent } from './components/administrator/edit-site/edit-site.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { createComponent } from '@angular/compiler/src/core';

describe('AppRoutingModule', () => {
  let appRoutingModule: AppRoutingModule;
  let fixture: ComponentFixture<AppRoutingModule>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppRoutingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [UserRegisterFormComponent, RecentEventsComponent, LoginComponent, AdminComponent, EventsListComponent,
      EventDetailComponent, CreateEventComponent, CreateAdminComponent, ThemeComponent, ThemesListComponent, CalendarComponent,
      ChangePasswordComponent, ForgotMyPasswordComponent, UserComponent, CreateFacebookEventComponent, DefinePasswordComponent,
      TouristPlacesComponent, CommentComponent, CommentsListComponent, EventRatingComponent, PastEventsComponent,
      SiteDetailComponent, EditSiteComponent, EditUserComponent, NgModule, Component, RouterModule]
    });
    
    fixture = TestBed.createComponent(AppRoutingModule);
    appRoutingModule = fixture.componentInstance;

    it('should create an instance', () => {
      expect(appRoutingModule).toBeTruthy();
    });
  });
});

