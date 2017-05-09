import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CookieXSRFStrategy, HttpModule, XSRFStrategy} from "@angular/http";
//ng new  nazwa
// ng build --base-href /game/ --prod --aot
// import { AppComponent } from './app.component';
import {StructureComponent} from "./structure/structure.component";
import {GameState} from "./gamestate/gamestate";
import {OnionComponent} from "./onion/onion.component";
import {UpgradeComponent} from "./upgrade/upgrade.component";
import { StatisticsComponent } from './statistics/statistics.component';
import { AchievementsComponent } from './achievements/achievements.component';

export function xsrfFactory() {
  return new CookieXSRFStrategy('_csrf', 'XSRF-TOKEN');
}

@NgModule({
  declarations: [
    StructureComponent,
    OnionComponent,
    UpgradeComponent,
    StatisticsComponent,
    AchievementsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [GameState, {
    provide: XSRFStrategy,
    useFactory: xsrfFactory
  }],
  bootstrap: [StructureComponent, OnionComponent, UpgradeComponent, StatisticsComponent]
})

export class AppModule {
}

