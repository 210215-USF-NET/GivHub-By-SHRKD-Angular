import { charityapi } from '../../models/charityapi';
import { ElementRef, NgModule, ViewChild } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { CharityAPIService } from '../../services/charity-api.service';
import { CharityRESTService } from '../../services/charity-rest.service';
import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { donation } from '../../models/donatin';
import { charity } from '../../models/charity';


@Component({
  selector: 'app-donation-new',
  templateUrl: './donation-new.component.html',
  styleUrls: ['./donation-new.component.css']
})
export class ProfileNewDonationComponent implements OnInit {
  userDons: donation[] = [];
  donation2Add: donation;
  email: string;
  amount: number;
  eid: any;
  constructor(public oktaAuth: OktaAuthService, private charityService: CharityRESTService, 
    private router: Router, private route: ActivatedRoute,) {
    this.donation2Add =
    {
      email: '',
      amount: 1,
      charityId: 0
  }
}

  async ngOnInit() {
    //get the value from the route/url
    this.eid = this.route.snapshot.params['charityein'];
    this.donation2Add.charityId = this.eid;

    const userClaims = await this.oktaAuth.getUser();
    this.donation2Add.email = userClaims.email;
//    console.log(this.email);
  }

  onSubmit(): void {
    if(this.donation2Add.amount >= 1){
      document.getElementById("amountError").style.display = "none";
      if(this.donation2Add.charityId > 0){
        document.getElementById("einError").style.display = "none";
        this.charityService.UserDonate(this.donation2Add).subscribe(
          (don) => {
            alert(`Donation was added!`);
            this.router.navigate(['/profile/donation-history'])
            .then(() => {
              window.location.reload();
            });
          }
        );
      }else{
        document.getElementById("einError").style.display = "block";
      }
    }else{
      document.getElementById("amountError").style.display = "block";
    }
    
  }
  // onSubmit(eid: any, amount: number): void {
  //   this.donation2Add = {
  //     email: this.email,
  //     charityId: Number(eid),
  //     amount: this.amount
  //   }
  //   console.log(this.donation2Add.email);
  //   console.log(this.donation2Add.charityId);
  //   console.log(this.donation2Add.amount);
  //   this.charityService.UserDonate(this.donation2Add).subscribe(
  //     (sub) => {
  //       alert(`Donation added to your record.`);
  //     }
  //   );
  // }
}
