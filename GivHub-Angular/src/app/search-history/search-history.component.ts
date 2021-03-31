import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { searchHistory } from '../models/searchHistory';
import { CharityAPIService } from '../services/charity-api.service';
import { CharityRESTService } from '../services/charity-rest.service';

interface Claim {
  claim: string;
  value: string;
}

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent implements OnInit {
  email: string;
  searchHistory: searchHistory;
  usersh: searchHistory[] = [];
  constructor(public oktaAuth: OktaAuthService, private router: Router, 
    private route: ActivatedRoute,private charityRESTService: CharityRESTService) { }

  async ngOnInit() {

    const userClaims = await this.oktaAuth.getUser();
    this.email = userClaims.email;
    console.log(this.email);
    this.charityRESTService.GetUserSearchHistory(this.email).subscribe(
      (result) => {
        this.usersh = result;
      }
    )
  }

}
