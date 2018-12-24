import { Pipe, PipeTransform } from '@angular/core';
import { ThemesListService } from '../components/themes-list/themes-list.service';

@Pipe({
  name: 'theme',
  pure: false
})
export class ThemePipe implements PipeTransform {

  constructor(private themesListService: ThemesListService) {}

  transform(value: string, args?: any): any {
    var result: string;
    let color;
      switch (value) {
      case 'iconPrimaryStyle':
        result = '' + this.themesListService.Theme.iconStyleTheme;
        break;
      case 'buttonPrimaryStyle':
        result = 'waves-light btn btn-' + this.themesListService.Theme.buttonStyle;
        break;
      case 'headerPrimaryStyle':
        result = '' + this.themesListService.Theme.buttonStyle;
        break;
      case 'buttonSecondaryStyle':
        result = 'ml-auto btn btn-outline-' + this.themesListService.Theme.buttonStyle;
        break;
      case 'buttonBackground':
        result = ' nav-tabs tabs-3 ' + this.themesListService.Theme.buttonStyle;
        break;
      case 'color':
        color = this.themesListService.Theme.menuStyle === 'dark' ? 'white' : 'black';
        result =  color;
        break;
      default:
        result = '';
        break;
    }
    return result;
  }

}
