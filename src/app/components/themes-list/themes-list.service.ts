import { Injectable, OnInit } from '@angular/core';
import { ITheme } from '../../models/theme.model';
import { Subject, Observable } from 'rxjs';
import { ThemesService } from '../../services/themes.service';

@Injectable({
  providedIn: 'root'
})
export class ThemesListService {

  public themeSelected: ITheme = {
    'themeId': 1,
    'menuStyle': '',
    'imageUrl': '',
    'footerBackground': '',
    'buttonStyle': '',
    'iconStyleTheme': ''
  };
  private themeSubject: Subject<ITheme> = new Subject<ITheme>();
  public themeSubject$: Observable<ITheme> = this.themeSubject.asObservable();

  constructor(private themesService: ThemesService) { }

  getThemeById(id: number): Promise<ITheme> {
    return new Promise<ITheme>((resolve, reject) => {
      this.themesService.getThemeById(id).subscribe((response: ITheme) => {
          resolve(response);
      }, error => {
        reject(error);
      });
    });
  }

  getAllThemes(): Promise<ITheme> {
    return new Promise<ITheme>((resolve, reject) => {
      this.themesService.getThemes().subscribe((response: ITheme) => {
          resolve(response['results']);
      }, error => {
        reject(error);
      });
    });
  }

  set Theme(theme: ITheme) {
    this.themeSelected = theme;
    this.themeSubject.next(this.themeSelected);
  }

  get Theme() {
    return this.themeSelected;
  }

}
