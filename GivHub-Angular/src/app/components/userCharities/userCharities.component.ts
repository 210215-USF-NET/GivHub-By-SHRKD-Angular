import { category } from './../../models/category';
import { charityapi } from './../../models/charityapi';
import { subscription } from './../../models/subscription';
import { charity } from './../../models/charity';
import { OktaAuthService } from '@okta/okta-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { CharityRESTService } from './../../services/charity-rest.service';
import { Component, OnInit } from '@angular/core';
import {location } from '../../models/location';
import { CharityAPIService } from '../../services/charity-api.service';

@Component({
  selector: 'app-userCharities',
  templateUrl: './userCharities.component.html',
  styleUrls: ['./userCharities.component.css']
})
export class UserCharitiesComponent implements OnInit {
  subscriptions:subscription[]=[];
  subscription: subscription;
  charities : charity[]=[];
  category: any;
  charitiesapi: charityapi[] =[];
  flag:boolean = false;
  constructor(private oktaAuth: OktaAuthService, private charityRESTService: CharityRESTService,private charityService: CharityAPIService, private router:Router, private route: ActivatedRoute) {
    this.category = {
      category: ''
    },
    this.flag = false
  }
  anotherUser: boolean = true;
  email:string;
  async ngOnInit() {
    //check if theres an email in the route because we want to display another users charities
    this.email = this.route.snapshot.params['userEmail'];
    if(!this.email){
      this.anotherUser = false;
      const userClaims =  await this.oktaAuth.getUser();
      this.email = userClaims.email;
    }

    //this allows the page to be refreshed when the user is still on the same page here
    this.router.events.subscribe((val) => window.location.reload());
    
    //Get the user subs
    let userSubsObserable = this.charityRESTService.GetUserSubscription(this.email);
    userSubsObserable.toPromise().then(data => {
      data.forEach(x => {
        this.subscriptions.push(x);
      });
    })
    //hold up
    while(this.subscriptions.length == 0){
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    // console.log(this.subscriptions);
    // console.log(this.subscriptions.length);
    this.category =this.route.snapshot.queryParamMap.get("category");
    if(this.route.snapshot.queryParamMap.get("flag") == "true")
    {this.flag =true;
    }else {
      this.flag =false;
    }
    if( this.category !== "" &&this.flag){
      let getCharities = this.charityRESTService.GetCharityByCategory(this.category);
      getCharities.toPromise().then(data => {
      data.forEach(x => {
          this.charities.push(x);
      });
    })
    }else{
      let getUserCharities = this.charityRESTService.GetAllCharities();
      getUserCharities.toPromise().then(data => {
        data.forEach(x => {
          if(this.subscriptions.find(y => y.charityId.toString() === x.eid)){
            this.charities.push(x);
          }
        });
      })
    }
    // console.log(this.charities);
  }

  similar(){
    if(this.charities.length>0 ){
      this.category = this.charities[Math.floor(Math.random() * this.charities.length)].category;
      console.log(this.category);
    }
    this.router.navigate(['/similar-charities',{'category': this.category}]);
  }

  DisplayCharity(charityName: string){
    this.router.navigate(['displayCharity'], { queryParams: { charity: charityName } });
  }
  onSubmit(event: any): void{
    console.log("donate!!")
  }
  unSubscribe(eid: any, charityName: string, charity: charity): void{
    (<HTMLInputElement>document.getElementById(eid)).remove();
    this.subscription = {
      id: 0,
      email: this.email,
      charityId: Number(eid)
    }
    this.charityRESTService.UserUnSubscribe(this.email,Number(eid)).subscribe(
      (sub) => {
        alert(`You unsubscribed from ${charityName}.`);
      }
    );
  }

}
