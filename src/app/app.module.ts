import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';



//import { AppComponent } from './app.component';
import { StructureComponent } from './structure/structure.component';
import { GameState } from './gamestate/gamestate';
import { OnionComponent } from './onion/onion.component';

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
  providers: [GameState],
  bootstrap: [StructureComponent, OnionComponent]
})
export class AppModule { }

