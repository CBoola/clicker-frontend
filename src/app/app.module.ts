import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, XSRFStrategy, CookieXSRFStrategy } from '@angular/http';



//import { AppComponent } from './app.component';
import { StructureComponent } from './structure/structure.component';
import { GameState } from './gamestate/gamestate';
import { OnionComponent } from './onion/onion.component';

export function xsrfFactory() {
  return new CookieXSRFStrategy('_csrf', 'XSRF-TOKEN');
}

@NgModule({
  declarations: [
    StructureComponent,
    OnionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [GameState, {
      provide: XSRFStrategy,
      useFactory : xsrfFactory
  }],
  bootstrap: [StructureComponent, OnionComponent]
})
export class AppModule { }

