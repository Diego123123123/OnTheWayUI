import { Component, OnInit } from '@angular/core';
import { ITheme } from '../../../models/theme.model';
import { Subscription } from 'rxjs';
import { ThemesListService } from '../../themes-list/themes-list.service';
import { IAlert, IconOfAlert, ColorOfAlert } from '../../../common/alert/alerts.model';
import { TypeOfDialog, IconOfDialog, IDialog } from '../../../common/dialog/dialog.model';
import { AlertService } from '../../../common/alert/alert.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  private theme: ITheme;
  private themeRef: Subscription = null;
  private userRef: Subscription = null;
  private subscription: Subscription;
  private preferedOption: boolean;

  constructor(private themesListService: ThemesListService, private alertService: AlertService) {}

    /**
   * This method get from backend the theme for a particular user
   * If the user is guest the theme is default
  */
  ngOnInit() {
    var themeId = sessionStorage.getItem('themeId');
    let _themeId = themeId ? Number(themeId): 1;
    this.themeRef = this.themesListService.themeSubject$.subscribe(() => {
      this.theme = this.themesListService.Theme;
    });
    this.themesListService.getThemeById(_themeId).then(result => { this.themesListService.Theme = result; });
    this.theme = this.themesListService.Theme;
  }

  /**
   * This method show an alert if it activated unavailable option
   * Print in the web page an alert box
  */
  infoContacts() {
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
