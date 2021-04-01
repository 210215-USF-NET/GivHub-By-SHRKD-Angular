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

import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { charity } from '../../models/charity';
import { CharityRESTService } from '../../services/charity-rest.service';
import { NytApiService } from '../../services/nyt-api.service';
import { ClearbitApiService } from '../../services/clearbit-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { nytapiDocs } from '../../models/nytapiDocs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userName: string;
  isAuthenticated: boolean;
  error: Error;
  charities: charity[] = [];
  nytapiDocs: nytapiDocs[] = [];
 
  constructor(public oktaAuth: OktaAuthService, private charityService : CharityRESTService, private router : Router, private route: ActivatedRoute, private nytApiService: NytApiService, private clearbitApiService: ClearbitApiService) {
    this.oktaAuth.$authenticationState.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
  }

  async login() {
    try {
      await this.oktaAuth.login();
    } catch (err) {
      console.error(err);
      this.error = err;
    }
  }

  async ngOnInit() {

    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    if (this.isAuthenticated) {
      const userClaims = await this.oktaAuth.getUser();
      this.userName = userClaims.name;
    }

    this.nytapiDocs = this.nytApiService.GetTopArticles();
    console.log(this.nytapiDocs);
    
    

    //this is for trending charities
    this.charityService.GetMostPopularCharities().subscribe(
      (result) => {
        this.charities = result;
        //console.log(this.charities);
        this.charities.forEach(element => {
          let foundLogo = this.clearbitApiService.FindLogoFromName(element.name);
          foundLogo.toPromise().then(data => {
            //console.log(data.logo);
            element.website = data.logo;
          });
          
        });

      }
    );
  }

  DisplayCharity(charityName : string){
    this.router.navigate(['displayCharity'],{queryParams:{charity: charityName}});
  }
}
