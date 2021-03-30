import { charityapi } from '../../models/charityapi';
import { ElementRef, NgModule, ViewChild } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { CharityAPIService } from '../../services/charity-api.service';
import { CharityRESTService } from '../../services/charity-rest.service';
import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { donation } from '../../models/donatin';
import { charity } from '../../models/charity';

interface Claim {
  claim: string;
  value: string;
}

@Component({
  selector: 'app-profile-donation-history',
  templateUrl: './profile-donation-history.component.html',
  styleUrls: ['./profile-donation-history.component.css']
})
export class ProfileDonationHistoryComponent implements OnInit {

  email: string;
  donation: donation;
  userDons: donation[] = [];
  charity: charity;
  constructor(public oktaAuth: OktaAuthService,private router: Router, private route: ActivatedRoute, private charityRESTService: CharityRESTService) {

  }

  async ngOnInit() {
    const userClaims = await this.oktaAuth.getUser();
    this.userName = userClaims.name;
    
  }

}
