import { Component, OnInit, OnDestroy, ViewChild  } from '@angular/core';
import { CategoriesService } from './services/categories.service';
import { LoginComponent } from './components/login/login.component'
import { Router, ActivatedRoute } from '@angular/router';
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
import { ModalDirective } from 'angular-bootstrap-md';
import { ICategory } from './models/category.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('frame') frame: ModalDirective;
  private theme: ITheme;
  private themeRef: Subscription = null;
  private userRef: Subscription = null;
  private message:any;
  private subscription: Subscription;
  private preferedOption: boolean;
  private enable: boolean;
  private categories: Array<ICategory>;
  private events: Array<ISingleEvent>;
  private username: string;
  private userId: any;
  private dialogOptions: IDialog = {
    title: 'Log out',
    description: 'Are you shure you want to log out??',
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
      console.log("estatus changed", message);
      this.username = sessionStorage.getItem('user');
      this.userId = sessionStorage.getItem('userId');
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
