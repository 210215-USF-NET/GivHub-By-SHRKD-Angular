import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

document.cookie = 'cookie2=value2; SameSite=None; Secure';
document.cookie = 'cookie1=value1; SameSite=Lax';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
