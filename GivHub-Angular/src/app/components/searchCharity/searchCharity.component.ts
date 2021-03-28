import { charityapi } from '../../models/charityapi';
import { NgModule } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { CharityAPIService } from '../../services/charity-api.service';
import { CharityRESTService } from '../../services/charity-rest.service';
import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { subscription } from '../../models/subscription';
import { charity } from '../../models/charity';

@Component({
  selector: 'app-searchCharity',
  templateUrl: './searchCharity.component.html',
  styleUrls: ['./searchCharity.component.css']
})
export class SearchCharityComponent implements OnInit {
  searchTerm: any;
  charitiesapi: charityapi[] =[];
  email: string;
  subscription: subscription;
  userSubs: subscription[];
  constructor(private charityService: CharityAPIService, private router: Router, private route: ActivatedRoute, private oktaAuth: OktaAuthService, private charityRESTService: CharityRESTService) {
    this.searchTerm = {
      searchTerm: ''
    }

  }

  async ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['searchTerm'];
    });
    
    if(this.searchTerm){
      this.charitiesapi = this.charityService.SearchCharities(this.searchTerm);
    }
    
    const userClaims = await this.oktaAuth.getUser();
    this.email = userClaims.email;

    let userSubsObserable = this.charityRESTService.GetUserSubscription(this.email);
    userSubsObserable.toPromise().then(data => {
      data.forEach(x => {
        this.userSubs.push(x);
      });
    })
    // console.log(this.charitiesapi);
  }
  onSubmit(event: any): void{}
  onSubscribe(eid: any, charityName: string, charity: charity): void{
    this.subscription = {
      chairty: charity,
      email: this.email,
      charityId: eid
    }
    this.charityRESTService.UserSubscribe(this.subscription);
    alert(`You subscribed to ${charityName}.`);
  }

}
