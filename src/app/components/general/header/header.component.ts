import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { ThemesListService } from '../../themes-list/themes-list.service';
import { ModalDirective } from 'angular-bootstrap-md';
import { ITheme } from '../../../models/theme.model';
import { Subscription } from 'rxjs';
import { ICategory } from '../../../models/category.model';
import { ISingleEvent } from '../../../models/event';
import { IDialog, TypeOfDialog, IconOfDialog } from '../../../common/dialog/dialog.model';
import { IUser } from '../../../models/user.model';
import { CategoriesService } from '../../../services/categories.service';
import { EventListService } from '../../events-list/event-list.service';
import { MessageService } from '../../../services/message.service';
import { CurrentUserService } from '../../user/current-user.service';
import { AlertService } from '../../../common/alert/alert.service';
import { IAlert, IconOfAlert, ColorOfAlert } from '../../../common/alert/alerts.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('frame') frame: ModalDirective;
  private theme: ITheme;
  private themeRef: Subscription = null;
  private userRef: Subscription = null;
  private message:any;
  private subscription: Subscription;
  private preferedOption: boolean;
  private enable: boolean;
  public categories: Array<ICategory>;
  private events: Array<ISingleEvent>;
  private username: string;
  private userId: any;
  defaultProfileImg: String = "assets/images/default-user-icon.jpg";

  private dialogOptions: IDialog = {
    title: 'Log out',
    description: 'Are you sure you want to log out??',
    btnYes: 'Accept',
    btnNo: 'Cancel',
    type: TypeOfDialog.INFO,
    icon: IconOfDialog.INFO,
    keyboardEsc: true
  };

  private user: IUser;
  private userImage: string;
  constructor(private categoriesService: CategoriesService, private aRoute: ActivatedRoute, private router: Router,
    private eventsListService: EventListService, private messageService: MessageService,
    private themesListService: ThemesListService, private currentUserService: CurrentUserService, private alertService: AlertService) {
    this.preferedOption = false;
    this.enable = false;
    this.subscription = this.messageService.getMessage().subscribe(message =>{
      this.preferedOption = true;
      this.enable = true;
      this.username = sessionStorage.getItem('user');
      this.userId = sessionStorage.getItem('userId');
    });
  }

  public consumeCategories(){
    this.categoriesService.getCategories().subscribe(response => {
      this.categories = response['results'];
      this.categoriesService.Categories = this.categories;
      });
  }
  ngOnInit() {
    var themeId = sessionStorage.getItem('themeId');
    let _themeId = themeId ? Number(themeId): 1;
    this.username = sessionStorage.getItem('user');
    this.userId = sessionStorage.getItem('userId');
    var resgistered = this.username ? true : false;
    this.preferedOption = resgistered;
    this.enable = resgistered;
    this.consumeCategories();
    this.themeRef = this.themesListService.themeSubject$.subscribe(() => {
      this.theme = this.themesListService.Theme;
    });
    this.userRef = this.currentUserService.userSubject$.subscribe((newUser: IUser) => {
      this.user = newUser;
      this.userImage = this.user.imageUserUrl;
    });
    this.user = this.currentUserService.User;
    this.userImage = '';
    if (this.userId) {
      this.currentUserService.getUser().then((result: IUser) => { this.currentUserService.User = result; });
    }
    this.themesListService.getThemeById(_themeId).then(result => { this.themesListService.Theme = result; });
    this.theme = this.themesListService.Theme;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.themeRef.unsubscribe();
    this.userRef.unsubscribe();
}

  showEvents() {
    if((sessionStorage.getItem('role') === '1') || (sessionStorage.getItem('role') === '2')){
      this.router.navigate(['/admin-page']);
    }
    else{
    this.router.navigate(['/']);
    }
  }

  showEventsByCategory(category) {
    this.router.navigate(['/events-by-category',category.categoryName]);
  }
  /**
   * This method redirect to user-page for an user logged
  */
  showPreferredEvents(){
    this.router.navigate(['/user-page']);
  }

  /**
   * This method redirect to past events for an user logged 
  */
  showPastPreferredEvents() {
    this.router.navigate(['/past-event']);
  }

  /**
   * This method redirect to calendar of events for an anyone user
  */
  showCalendar() {
    this.router.navigate(['/calendar/prefer-event']);
  }

  /**
   * This method redirect to themes page for an user logged
  */
  showThemes(){
    this.router.navigate(['/themes']);
  }

  /**
   * This method redirect to sites component for anyone user
  */
  showSites(){
    this.router.navigate(['/sites']);
  }

  /**
   * This method delete datas in sessionStorage of an user logged 
  */
  logout(){
    this.themesListService.getThemeById(1).then(result => { this.themesListService.Theme = result; });
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('themeId');
    this.router.navigate(['/']);
    this.enable = false;
    this.preferedOption = false;
    this.frame.hide();
  }

  /**
   * This method show an alert if it activated unavailable option
   * Print in the web page an alert box
  */
  alertExample() {
    const alertOptions: IAlert = {
      icon: IconOfAlert.DANGER,
      color: ColorOfAlert.DANGER,
      title: 'ERROR!',
      message: 'This option is not available, yet',
      durationTime: 5000
    };
    this.alertService.Options = alertOptions;
  }

}
