import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';



bootstrapApplication(App, {
    ...appConfig, 
    providers: [
      ...(appConfig.providers || []),
      provideAnimations(),
      provideRouter(routes)
    ]
})
  .catch((err) => console.error(err));

  
  

