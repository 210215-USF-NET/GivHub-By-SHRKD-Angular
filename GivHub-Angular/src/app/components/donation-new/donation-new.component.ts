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
  constructor(private charityService: CharityRESTService, private router: Router) {
    this.donation2Add =
    {
      email: '',
      amount: 0,
      charityId: 0
  }
}

  async ngOnInit() {
    
  }

  onSubmit(email: string, eid: any, amount: number): void {
    this.donation2Add = {
      email: this.email,
      charityId: Number(eid),
      amount: this.amount
    }
    this.charityService.UserDonate(this.donation2Add).subscribe(
      (sub) => {
        alert(`Donation added to your record.`);
      }
    );
  }
}
