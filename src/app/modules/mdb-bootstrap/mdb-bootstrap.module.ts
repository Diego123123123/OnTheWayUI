import { NgModule } from '@angular/core';

import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md';

@NgModule({
  imports: [
    NavbarModule,
    WavesModule,
    ButtonsModule
  ],
  exports: [
    NavbarModule,
    WavesModule,
    ButtonsModule
  ],
})
export class MdbModule { }
