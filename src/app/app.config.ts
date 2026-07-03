import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { counterReducer } from './features/counter/state/counter.reducer';
import { cartReducer } from './features/cart/store/reducers/cart.reducer';
import { AuthInterceptor } from './core/interceptors/AuthInterceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    provideClientHydration(withEventReplay()),
    provideStore({ count: counterReducer, cart: cartReducer }),

   provideHttpClient(
    withFetch(),
    withInterceptorsFromDi()
   ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }

  ],
};
