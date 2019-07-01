import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
// localStorage.setItem('url', 'https://api.ileapcloud.com/auth-center');
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
