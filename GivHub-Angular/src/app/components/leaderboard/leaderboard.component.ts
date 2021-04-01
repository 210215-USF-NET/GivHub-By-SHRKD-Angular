import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { donation } from '../../models/donatin';
import { CharityRESTService } from '../../services/charity-rest.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  mostDonations: donation[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private oktaAuth: OktaAuthService, 
  private charityRESTService: CharityRESTService) { }

  ngOnInit() {
    let findMostDonations = this.charityRESTService.GetMostDonations().toPromise().then(data => {
      data.forEach(x => {
        this.mostDonations.push(x);
      });
      this.mostDonations.sort(function(a, b){return b.amount-a.amount}); 
    }) 
  }
}