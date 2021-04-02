import { charityapi } from '../../models/charityapi';
import { ElementRef, NgModule, ViewChild } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { CharityAPIService } from '../../services/charity-api.service';
import { CharityRESTService } from '../../services/charity-rest.service';
import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { donation } from '../../models/donatin';
import { charity } from '../../models/charity';

interface userDon {
  charityName: string;
  donation: donation
}

@Component({
  selector: 'app-profile-donation-history',
  templateUrl: './profile-donation-history.component.html',
  styleUrls: ['./profile-donation-history.component.css']
})
export class ProfileDonationHistoryComponent implements OnInit {
  email: string;
  donations: donation[];
  userDon: userDon;
  userDons: userDon[] = [];
  charity: charity;
  constructor(public oktaAuth: OktaAuthService,private router: Router, 
    private route: ActivatedRoute, private charityRESTService: CharityRESTService,
    private charityAPIService: CharityAPIService) {
      this.userDon = 
      {
        charityName: '',
        donation:
        {
          email: '',
          amount: 1,
          charityId: 0
        }
      }

  }


  async ngOnInit() {
    const userClaims = await this.oktaAuth.getUser();
    this.email = userClaims.email;
    let userDonsObservable = this.charityRESTService.GetUserDonations(this.email);
    this.charityRESTService.GetUserDonations(this.email).subscribe(
      (result) => {

        this.donations = result;
        this.donations.sort(function(a, b){return b.amount-a.amount}); 
        this.donations.forEach(x => {
            this.assignUserDon(x);
            this.pushUserDon(this.userDon);
            
            })
          })
          console.log(this.userDons);
      }
      //
      

  assignUserDon(x: donation) {
        
        let getCharity = this.charityRESTService.GetCharityById(x.charityId);
        getCharity.toPromise().then(y => {
          this.userDon.donation = x;
          this.userDon.charityName = y.name;
          console.log(x);
          console.log(y);
        });
}
  pushUserDon(userDon: userDon) {
    this.userDons.push(this.userDon);
  }

  // TODO: FIXME
  GetCharityById(ein: any) {
    return this.charityAPIService.GetCharityById(Number(ein));
  }

}
