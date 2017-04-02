import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';



//import { AppComponent } from './app.component';
import { StructureComponent } from './structure/structure.component';
import { GameState } from './gamestate/gamestate';

@NgModule({
  declarations: [
    StructureComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [StructureComponent]
})
export class AppModule { }

