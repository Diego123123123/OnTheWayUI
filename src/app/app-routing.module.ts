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
import { RestrictRoutesService } from './services/admin/restrict-routes/restrict-routes.service';
import { PageNotFoundComponent } from './components/general/page-not-found/page-not-found.component';
import { DeniedPageComponent } from './components/general/denied-page/denied-page.component';
import { CreateSiteComponent } from './components/administrator/create-site/create-site.component';
import { EventsByCategoryComponent } from './components/events-by-category/events-by-category.component';
import { CreateQrcodeComponent } from './components/administrator/create-qrcode/create-qrcode.component';
import { DeletedEventsComponent } from './components/administrator/deleted-events/deleted-events.component';
import { ValidateTicketComponent } from './components/administrator/create-qrcode/validate-ticket/validate-ticket.component';
import { BoughtTicketsComponent } from './components/bought-tickets/bought-tickets.component';
import { AdvancedSearchComponent } from './components/general/advanced-search/advanced-search.component';
import { BalanceEventsComponent } from './components/administrator/balance-events/balance-events.component';


const routes: Routes = [
  { path: '', component: AdvancedSearchComponent },
  { path: 'events-by-category/:category', component: EventsByCategoryComponent },
  { path: 'denied', component: DeniedPageComponent },
  { path: 'login-form', component: LoginComponent },
  { path: 'user-register-form', component: UserRegisterFormComponent },
  { path: 'sites', component: TouristPlacesComponent },
  { path: 'forgot-my-password', component: ForgotMyPasswordComponent },
  { path: 'event-detail/:eventId', component: EventDetailComponent },
  { path: 'site-detail/:siteId', component: SiteDetailComponent },
  { path: 'login-confirm/:key', component: LoginComponent },
  { path: 'change-password/:key', component: ChangePasswordComponent },
  { path: 'calendar/:detail', component: CalendarComponent },
  { path: 'calendar/:detail/:siteId', component: CalendarComponent },
  { path: 'define-password/:key', component: DefinePasswordComponent },
  { path: 'events/:nameCategory', component: EventsListComponent},
  { path: 'customer/:ticketId', component: ValidateTicketComponent},

  { path: 'deleted-events', component: DeletedEventsComponent, canActivate: [RestrictRoutesService], data: { expectedRole: ["1", "2"] } },
  { path: 'balance-event/:eventId', component: BalanceEventsComponent, canActivate: [RestrictRoutesService], data: { expectedRole: ["1", "2"] } },
  { path: 'create-admin', component: CreateAdminComponent, canActivate: [RestrictRoutesService], data: { expectedRole: ["1"] } },
  
  { path: 'create-facebook-event', component: CreateFacebookEventComponent, canActivate: [RestrictRoutesService], data: {expectedRole: ["1", "2"]}},
  { path: 'create-event', component: CreateEventComponent, canActivate: [RestrictRoutesService], data: {expectedRole: ["1", "2"]}},
  { path: 'create-site', component: CreateSiteComponent, canActivate: [RestrictRoutesService], data: {expectedRole: ["1", "2"]}},
  { path: 'admin-page', component: AdminComponent, canActivate: [RestrictRoutesService], data: {expectedRole: ["1", "2"]}},
  { path: 'edit-site/:siteId', component: EditSiteComponent, canActivate: [RestrictRoutesService], data: {expectedRole: ["1", "2"]} },
  
  { path: 'tickets/:ticketId', component: CreateQrcodeComponent, canActivate: [RestrictRoutesService], data: {expectedRole: ["1", "2", "3"]}},
  { path: 'themes', component: ThemesListComponent, canActivate: [RestrictRoutesService],data: {expectedRole: ["1", "2", "3"]}},
  { path: 'user', component: EditUserComponent, canActivate: [RestrictRoutesService],data: {expectedRole: ["1", "2", "3"]} },
  { path: 'user-page', component: UserComponent, canActivate: [RestrictRoutesService], data: {expectedRole: ["1", "2", "3"]}},
  { path: 'past-event', component: PastEventsComponent, canActivate: [RestrictRoutesService], data: {expectedRole: ["1", "2", "3"]}},
  { path: 'past-event/:preferenceId/:eventId', component: EventRatingComponent, canActivate: [RestrictRoutesService], data: {expectedRole: ["1", "2", "3"]}},
  { path: 'bought-tickets/userTicket', component: BoughtTicketsComponent, canActivate: [RestrictRoutesService], data: {expectedRole: ["3"]}},
  {path: '**', component: PageNotFoundComponent},
];

export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
