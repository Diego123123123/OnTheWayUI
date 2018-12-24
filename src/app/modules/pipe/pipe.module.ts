import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemePipe } from '../../pipes/theme.pipe';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    HttpModule
  ],
  declarations: [
    ThemePipe
  ],
  exports: [ThemePipe]
})
export class PipeModule { 
  static forRoot() {
    return {
        ngModule: PipeModule,
        providers: [],
    };
  }
}
