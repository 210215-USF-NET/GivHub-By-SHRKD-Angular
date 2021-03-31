import { category } from './../../models/category';
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


  constructor(private charityService: CharityAPIService, private router: Router, 
    private route: ActivatedRoute, private oktaAuth: OktaAuthService, 
    private charityRESTService: CharityRESTService) {
    this.searchTerm = {
      searchTerm: ''
    }
    this.category = {
      category: ''
    }

  }

  async ngOnInit(){
    //get the value from the route/url
    // this.route.queryParams.subscribe(params => {
    //   this.searchTerm = params['searchTerm'];
    // });
    this.category =this.route.snapshot.params['category'];

    

    const userClaims = await this.oktaAuth.getUser();
    this.email = userClaims.email;

    //Get the user subs
    let userSubsObserable = this.charityRESTService.GetUserSubscription(this.email);
    userSubsObserable.toPromise().then(data => {
      data.forEach(x => {
        this.userSubs.push(x);
      });
    })
   
    //console.log(this.userSubs);
    //if searchterm isnt undefined then find charities
    this.searchCharities();
    
    if(this.category){
          this.charitiesapi = this.charityService.SearchCharitiesByCategory(this.category);
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
    while(this.charitiesapi.length == 0){
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  searchCharities(){
    this.searchTerm = this.route.snapshot.params['searchTerm'];
    if(this.searchTerm && this.searchTerm !== ""){
      this.charitiesapi = this.charityService.SearchCharities(this.searchTerm);
    }
  }
  

  changeCategory(e) {
    console.log(e.target.value);
    this.category = e.target.value;
    this.router.navigate(['/searchCharity',{'category': this.category}]);

    console.log(this.category +" = catty");
  }

  
  

  validateId(charity: charityapi) {
    return this.userSubs.find(x => x.charityId == Number(charity.ein));
  }

  onSubmit(event: any): void{
    event.preventDefault();
    this.searchTerm = event.target['searchTerm'].value;
    this.router.navigate(['/searchCharity',{'searchTerm': this.searchTerm}])
    .then(() => {
      window.location.reload();
    });
  }
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
