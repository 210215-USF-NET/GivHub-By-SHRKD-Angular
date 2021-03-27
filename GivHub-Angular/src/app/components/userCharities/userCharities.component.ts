import { charityapi } from './../../models/charityapi';
import { subscription } from './../../models/subscription';
import { charity } from './../../models/charity';
import { OktaAuthService } from '@okta/okta-angular';
import { Router } from '@angular/router';
import { CharityRESTService } from './../../services/charity-rest.service';
import { Component, OnInit } from '@angular/core';
import {location } from '../../models/location';

@Component({
  selector: 'app-userCharities',
  templateUrl: './userCharities.component.html',
  styleUrls: ['./userCharities.component.css']
})
export class UserCharitiesComponent implements OnInit {
  subscriptions:subscription[]=[];
  charities : charity[]=[];
  constructor(private oktaAuth: OktaAuthService, private charityService: CharityRESTService, private router:Router) { }
  email:string;
  async ngOnInit() {
    const userClaims =  await this.oktaAuth.getUser();
    this.email = userClaims.email;
    this.email= 'hans.mittig@revature.net'
    
    this.charityService.GetUserSubscription(this.email).subscribe(
    (result)=>{
     this.subscriptions= result;}
    );

    console.log(this.subscriptions);
    console.log(this.charities);
    this.subscriptions.forEach(function (element) {
      this.charities.push(this.charityService.GetCharityById(element.charityId));
    }); 
  }

  DisplayCharity(charityName: string){
    this.router.navigate(['hero-details'], { queryParams: { charity: charityName } });
  }
  

}
