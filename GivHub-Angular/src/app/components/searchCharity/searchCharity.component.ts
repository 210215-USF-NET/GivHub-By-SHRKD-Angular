import { charityapi } from './../../models/charityapi';
import { ElementRef, NgModule, ViewChild } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { CharityAPIService } from '../../services/charity-api.service';
import { CharityRESTService } from '../../services/charity-rest.service';
import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { subscription } from '../../models/subscription';
import { charity } from '../../models/charity';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  userSubs: subscription[] = [];
  category:any;

  constructor(private charityService: CharityAPIService, private router: Router, private route: ActivatedRoute, private oktaAuth: OktaAuthService, private charityRESTService: CharityRESTService) {
    this.searchTerm = {
      searchTerm: ''
    }

  }

  async ngOnInit(){
    //get the value from the route/url
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['searchTerm'];
    });

    const userClaims = await this.oktaAuth.getUser();
    this.email = userClaims.email;

    //Get the user subs
    let userSubsObserable = this.charityRESTService.GetUserSubscription(this.email);
    userSubsObserable.toPromise().then(data => {
      data.forEach(x => {
        this.userSubs.push(x);
      });
    })
    // console.log(this.userSubs);
    //if searchterm isnt undefined then find charities
    if(this.searchTerm){
      this.charitiesapi = this.charityService.SearchCharities(this.searchTerm);
    }

  }

  
  //  SearchCategory(event:any){
  //   this.route.queryParams.subscribe(params => {
  //     this.category = params['category'];
  //   });
  //   this.category="A";
  //   console.log(this.category+"charity");
  //   if(this.category){
  //     this.charitiesapi = this.charityService.SearchCharitiesByCategory(this.category);
  //   }
  // }

  form = new FormGroup({
    categories: new FormControl('')
  });
  
  get f(){
    return this.form.controls;
  }
  
  submit(){
    if(this.category){
      this.charitiesapi = this.charityService.SearchCharitiesByCategory(this.form.value);
    }
  }
  changeCategory(e) {
    console.log(e.target.value); 
    if(this.category){
      this.charitiesapi = this.charityService.SearchCharitiesByCategory(e.target.value);
      console.log(this.charitiesapi);
    }
    }

  
  

  validateId(charity: charityapi) {
    return this.userSubs.find(x => x.charityId == Number(charity.ein));
  }

  onSubmit(event: any): void{}
  onSubscribe(eid: any, charityName: string, charity: charity): void{
    (<HTMLInputElement>document.getElementById(eid)).innerHTML = "Subscribed";
    (<HTMLInputElement>document.getElementById(eid)).classList.remove("btn-primary");
    (<HTMLInputElement>document.getElementById(eid)).classList.add("btn-success");
    this.subscription = {
      id: 0,
      email: this.email,
      charityId: Number(eid)
    }
    this.charityRESTService.UserSubscribe(this.subscription).subscribe(
      (sub) => {
        alert(`You subscribed to ${charityName}.`);
      }
    );
  }
}
