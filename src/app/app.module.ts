import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, Injectable } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NavbarModule, WavesModule, ButtonsModule, CollapseModule } from 'angular-bootstrap-md';
import { CardsFreeModule } from 'angular-bootstrap-md'

import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'angular-calendar';
import { BlobModule } from 'angular-azure-blob-service';

// Components
import { UserRegisterFormComponent } from './components/user-register-form/user-register-form.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { RecentEventsComponent } from './components/recent-events/recent-events.component';
import { AdminComponent } from './components/administrator/admin/admin.component';
import { EventComponent } from './components/event/event.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { FilterComponent } from './components/filter/filter.component';
import { CreateEventComponent } from './components/administrator/create-event/create-event.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgotMyPasswordComponent } from './components/forgot-my-password/forgot-my-password.component';
import { CreateFacebookEventComponent } from './components/create-facebook-event/create-facebook-event.component';
import { DefinePasswordComponent } from './components/define-password/define-password.component';
import { AdminEventsComponent } from './components/administrator/admin-events/admin-events.component';
import { CreateSiteComponent } from './components/administrator/create-site/create-site.component';
import { CreateScheduleComponent } from './components/administrator/create-schedule/create-schedule.component';
import { SiteDetailComponent } from './components/site-detail/site-detail.component';

// Angular Forms Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './common/dialog/dialog.component';
import { CompareValidatorDirective } from './common/directives/compare-validator.directive';
import { DateValidatorDirective } from './common/directives/date-validator.directive';
import { EditSiteComponent } from './components/administrator/edit-site/edit-site.component';

// Services
import { DialogService } from './common/dialog/dialog.service';
import { OnTheWayService } from './services/on-the-way.service';
import { CategoriesService } from './services/categories.service';
import { RecentEventsService } from './services/recent-events.service';
import { UserService } from './services/user.service';
import { EventsListComponent } from './components/events-list/events-list.component';
import { EventsService } from './services/events.service';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { ChangePasswordService } from './services/change-password-service.service';
import { ForgotMyPasswordService } from './services/forgot-my-password.service';
import { SchedulesService } from './services/schedules.service';
import { SiteService } from './services/site.service';
import { ConfirmUserRegistrationService } from './services/confirm-user-registration.service';
import { ImageService } from './services/image-service.service';
import { CreateFacebookEventService } from './services/create-facebook-event-service.service';
import { PriceService } from './services/price-service.service';
import { AdminEventsService } from './services/admin-events.service';
import { ScheduleSiteService } from './services/schedule-site-service.service';
import { EventsInSiteService } from './services/events-in-site-service.service';
import { PricesSiteService } from './services/prices-site-service.service';
import { EventsCalendarService } from './services/events-calendar.service';
import { CalendarSiteService } from './services/calendar-site.service';
import { UsersForEventsService } from './services/users-for-events.service';

//map
import { AgmCoreModule} from '@agm/core';
import { AuthenticationService } from './services/authentication.service';
import { ThemeComponent } from './components/theme/theme.component';
import { ThemesListComponent } from './components/themes-list/themes-list.component';
import { ThemesListService } from './components/themes-list/themes-list.service';
import { ThemePipe } from './pipes/theme.pipe';
import { CalendarComponent } from './components/calendar/calendar.component';
import { UserComponent } from './components/user/user.component';
import * as jwt_decode from "jwt-decode";
import { CreateAdminComponent } from './components/administrator/create-admin/create-admin.component';
import { UploadImagesComponent } from './components/upload-images/upload-images.component';
import { SiteComponent } from './components/site/site.component';
import { SitesListComponent } from './components/sites-list/sites-list.component';
import { TouristPlacesComponent } from './components/tourist-places/tourist-places.component';
import { MapDialogComponent } from './common/map-dialog/map-dialog.component';
import { PriceTableComponent } from './common/price-table/price-table.component';

import { Md5 } from 'ts-md5/dist/md5';
import { CommentComponent } from './components/comment/comment.component';
import { CommentsListComponent } from './components/comments-list/comments-list.component';
import { EventRatingComponent } from './components/event-rating/event-rating.component';
import { PastEventsComponent } from './components/past-events/past-events.component';
import { EditEventComponent } from './components/administrator/edit-event/edit-event.component';
import { CommentsService } from './services/comments.service';
import { AlertComponent } from './common/alert/alert.component';
import { AlertService } from './common/alert/alert.service';
import { CurrentUserService } from './components/user/current-user.service';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { PipeModule } from './modules/pipe/pipe.module';
import { PageNotFoundComponent } from './components/general/page-not-found/page-not-found.component';
import { FooterComponent } from './components/general/footer/footer.component';
import { HeaderComponent } from './components/general/header/header.component';
import { DeniedPageComponent } from './components/general/denied-page/denied-page.component';
import { NotExistEventsComponent } from './components/not-exist-events/not-exist-events.component';
import { EventsByCategoryComponent } from './components/events-by-category/events-by-category.component';
import { CreateQrcodeComponent } from './components/administrator/create-qrcode/create-qrcode.component';
import { QRCodeModule } from 'angularx-qrcode';
import { DeletedEventsComponent } from './components/administrator/deleted-events/deleted-events.component';
import { ValidateTicketComponent } from './components/administrator/create-qrcode/validate-ticket/validate-ticket.component';

@Injectable()

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserRegisterFormComponent,
    DialogComponent,
    CompareValidatorDirective,
    DateValidatorDirective,
    RecentEventsComponent,
    AdminComponent,
    EventComponent,
    EventsListComponent,
    EventDetailComponent,
    PaginatorComponent,
    FilterComponent,
    CreateEventComponent,
    ThemeComponent,
    ThemesListComponent,
    CalendarComponent,
    ChangePasswordComponent,
    ForgotMyPasswordComponent,
    UserComponent,
    CreateAdminComponent,
    UploadImagesComponent,
    CreateFacebookEventComponent,
    DefinePasswordComponent,
    AdminEventsComponent,
    SiteComponent,
    SitesListComponent,
    TouristPlacesComponent,
    MapDialogComponent,
    CommentComponent,
    CommentsListComponent,
    EventRatingComponent,
    PastEventsComponent,
    SiteDetailComponent,
    PriceTableComponent,
    MapDialogComponent,
    CreateSiteComponent,
    CreateScheduleComponent,
    EditSiteComponent,
    EditEventComponent,
    EditUserComponent,
    AlertComponent,
    PageNotFoundComponent,
    FooterComponent,
    HeaderComponent,
    DeniedPageComponent,
    NotExistEventsComponent,
    EventsByCategoryComponent,
    CreateQrcodeComponent,
    DeletedEventsComponent,
    ValidateTicketComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    MDBBootstrapModule.forRoot(),
    CollapseModule.forRoot(),
    NavbarModule,
    AppRoutingModule,
    WavesModule,
    ButtonsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatCheckboxModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAuj3cDQ1XRQS7BNNl7rxfloziL5iMkpSA'
    }),
    BrowserAnimationsModule,
    CalendarModule.forRoot(),
    NgbModule,
    BlobModule.forRoot(),
    PipeModule,
    QRCodeModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    DialogService,
    OnTheWayService,
    CategoriesService,
    UserService,
    EventsService,
    AuthenticationService,
    ThemesListService,
    EventsCalendarService,
    ChangePasswordService,
    ForgotMyPasswordService,
    SiteService,
    SchedulesService,
    ConfirmUserRegistrationService,
    ImageService,
    CreateFacebookEventService,
    PriceService,
    AdminEventsService,
    ScheduleSiteService,
    EventsInSiteService,
    PricesSiteService,
    CalendarSiteService,
    AdminEventsService,
    Md5,
    UsersForEventsService,
    CommentsService,
    AlertService,
    CurrentUserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
