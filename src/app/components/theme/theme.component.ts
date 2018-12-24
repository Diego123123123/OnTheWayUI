import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITheme } from '../../models/theme.model';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  @Input('theme') theme: ITheme;
  @Output() themeClick: EventEmitter<ITheme> = new EventEmitter<ITheme>();

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.themeClick.emit(this.theme);
  }

}
