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

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
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
import { ProfileAccountComponent } from './components/profile-account/profile-account.component';
import { SearchCharityComponent } from './components/searchCharity/searchCharity.component';
import { DisplayCharityComponent} from './components/displayCharity/displayCharity.component';
import { ProfileDonationHistoryComponent } from './components/profile-donation-history/profile-donation-history.component';
import { ProfileNewDonationComponent } from './components/donation-new/donation-new.component';
import { environment } from '../environments/environment';
import { SimilarCharitiesComponent } from './components/similar-charities/similar-charities.component';
import { SearchHistoryComponent } from './components/search-history/search-history.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';

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
      children: [
        { 
          path: "account", 
          component: ProfileAccountComponent,
          canActivate: [ OktaAuthGuard ], 
        },
        { 
          path: "donation-history", 
          component: ProfileDonationHistoryComponent,
          canActivate: [ OktaAuthGuard ], 
          children: [
          { 
            path: "donation-new", 
            component: ProfileNewDonationComponent, 
            canActivate: [ OktaAuthGuard ], 
          },
        ]},
      ],
    },
    {
      path: 'userCharities',
      component: UserCharitiesComponent,
      canActivate: [ OktaAuthGuard ],
    
    },
    {
      path: 'similar-charities',
      component: SimilarCharitiesComponent,
      canActivate: [ OktaAuthGuard ],
    },
    {
      path: 'searchCharity',
      component: SearchCharityComponent,
      canActivate: [ OktaAuthGuard ],
    },
    {
      path: 'displayCharity',
      component: DisplayCharityComponent,
      canActivate: [OktaAuthGuard],
    },
    {
      path: 'searchHistory',
      component: SearchHistoryComponent,
      canActivate: [OktaAuthGuard],
    },
    {
      path: 'leaderboard',
      component: LeaderboardComponent,
      canActivate: [OktaAuthGuard],
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
    ProfileAccountComponent,
    ProfileDonationHistoryComponent,
    ProfileNewDonationComponent,
    SimilarCharitiesComponent,
    SearchHistoryComponent,
    LeaderboardComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    OktaAuthModule,
    RouterModule.forRoot(appRoutes),
    HttpClientJsonpModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: config.oidc },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
