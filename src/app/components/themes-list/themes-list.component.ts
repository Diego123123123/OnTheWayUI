import { Component, OnInit } from '@angular/core';
import { ITheme } from '../../models/theme.model';
import { ThemesListService } from './themes-list.service';
import { ThemesService } from '../../services/themes.service';
import { UserService } from '../../services/user.service';
import { IUserPatch } from '../../models/user.model';
import { IAlert, IconOfAlert, ColorOfAlert } from 'src/app/common/alert/alerts.model';
import { AlertService } from 'src/app/common/alert/alert.service';

@Component({
  selector: 'app-themes-list',
  templateUrl: './themes-list.component.html',
  styleUrls: ['./themes-list.component.scss']
})
export class ThemesListComponent implements OnInit {

  themes: Array<ITheme>;
  constructor( private themeListService: ThemesListService, private usersService: UserService, private alertService: AlertService ) { }

  ngOnInit() {
    this.themeListService.getAllThemes().then((themes: any) => {
      this.themes = themes.filter(theme => theme.themeId !== this.themeListService.Theme.themeId);
    });
  }

  showTheme(theme: ITheme) {
    console.log(theme);
    let alertOptions: IAlert;
    this.themeListService.getAllThemes().then((themes: any) => {
      this.themeListService.Theme = theme;
      this.themes = themes.filter(theme => theme.themeId !== this.themeListService.Theme.themeId);
      sessionStorage.setItem('themeId', String(theme.themeId));
      let userId = sessionStorage.getItem('userId');
      let data: Array<IUserPatch> = [{
        op: 'replace',
        path: '/themeId',
        value: theme.themeId
      }];
      this.usersService.patchUser(data).subscribe(response => {
        console.log('changeTheme patch', response);
        alertOptions = {
          icon: IconOfAlert.SUCCESS,
          color: ColorOfAlert.SUCCESS,
          title: 'SUCCESSFUL!',
          message: 'You theme has been changed',
          durationTime: 5000
        };
        this.alertService.Options = alertOptions;
      }, error => {
        alertOptions = {
          icon: IconOfAlert.DANGER,
          color: ColorOfAlert.DANGER,
          title: 'ERROR!',
          message: `Has been an error: ${error}`,
          durationTime: 5000
        };
        this.alertService.Options = alertOptions;
        console.log('error', error);
      });
    });
  }
}
