import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import 'js/index.js';



//bootstrap
/*
import 'bootstrap_css/bootstrap.css';
import 'bootstrap_css/bootstrap.css.map';
import 'bootstrap_css/bootstrap.min.css';
import 'bootstrap_css/bootstrap.min.css.map';
import 'bootstrap_css/bootstrap-theme.css';
import 'bootstrap_css/bootstrap-theme.css.map';
import 'bootstrap_css/bootstrap-theme.min.css';
import 'bootstrap_css/bootstrap-theme.min.css.map';
*/


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
