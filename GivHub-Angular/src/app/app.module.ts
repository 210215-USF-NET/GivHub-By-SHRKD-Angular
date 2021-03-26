/*!
 * Copyright (c) 2018, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */
//import {  } from "@angular/common/http";
//import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import {
  OKTA_CONFIG,
  OktaAuthGuard,
  OktaAuthModule,
  OktaCallbackComponent,
} from '@okta/okta-angular';

import config from './app.config';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { UserCharitiesComponent } from './components/userCharities/userCharities.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchCharityComponent } from './components/searchCharity/searchCharity.component';

import { environment } from '../environments/environment';
let appRoutes : Routes = [];
  appRoutes = [
    {
      path: '',
      component: HomeComponent,
    },
    {
      path: 'callback',
      component: OktaCallbackComponent,
    },
    {
      path: 'about-us',
      component: AboutUsComponent,
    },
    {
      path: 'profile',
      component: ProfileComponent,
      canActivate: [ OktaAuthGuard ],
    },
    {
      path: 'userCharities',
      component: UserCharitiesComponent,
      canActivate: [ OktaAuthGuard ],
    },
    {
      path: 'searchCharity',
      component: SearchCharityComponent,
      canActivate: [ OktaAuthGuard ],
    },
    {
      path: '**',
      redirectTo: ""
    },
  ];



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    UserCharitiesComponent,
    SearchCharityComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    OktaAuthModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: config.oidc },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
