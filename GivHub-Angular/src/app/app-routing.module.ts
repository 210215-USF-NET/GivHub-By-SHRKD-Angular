import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//This module gets scaffolded when you say to include routing in your angular app
//This property is where you define, which routes/routerLinks goes to certain components
// you need two things to define a route: path (endpoint) to go to, component that it is routing to
import {
    OKTA_CONFIG,
    OktaAuthGuard,
    OktaAuthModule,
    OktaCallbackComponent,
  } from '@okta/okta-angular';
  import config from './app.config';
const routes: Routes = [
    {
        path: 'callback',
        component: OktaCallbackComponent,
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: OKTA_CONFIG, useValue: config.oidc },
  ],
})
export class AppRoutingModule { }