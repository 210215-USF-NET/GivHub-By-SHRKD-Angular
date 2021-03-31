import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

interface Claim {
  claim: string;
  value: string;
}

@Component({
  selector: 'app-profile-account',
  templateUrl: './profile-account.component.html',
  styleUrls: ['./profile-account.component.css']
})
export class ProfileAccountComponent implements OnInit {
  idToken;
  claims: Array<Claim>;
  userName: string;
  constructor(public oktaAuth: OktaAuthService) {

  }

  async ngOnInit() {
    const userClaims = await this.oktaAuth.getUser();
    this.userName = userClaims.name;
    this.claims = Object.entries(userClaims).map(entry => ({ claim: entry[0], value: entry[1] }));
  }

}
