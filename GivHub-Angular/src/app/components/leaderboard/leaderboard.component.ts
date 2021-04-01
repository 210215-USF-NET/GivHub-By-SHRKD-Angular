import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { donation } from '../../models/donatin';
import { follow } from '../../models/follow';
import { CharityRESTService } from '../../services/charity-rest.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  mostDonations: donation[] = [];
  email: string;
  newFollow: follow;
  userFollows: follow[] = [];
  constructor(private router: Router, private route: ActivatedRoute, private oktaAuth: OktaAuthService, 
  private charityRESTService: CharityRESTService) { }

  async ngOnInit() {
    //get the most donations
    let findMostDonations = this.charityRESTService.GetMostDonations().toPromise().then(data => {
      data.forEach(x => {
        this.mostDonations.push(x);
      });
      this.mostDonations.sort(function(a, b){return b.amount-a.amount}); 
    }) 
    //get user email
    const userClaims = await this.oktaAuth.getUser();
    this.email = userClaims.email;
    //get whos the user following
    let getUserFollowers = this.charityRESTService.GetFollowers(this.email).toPromise().then(data => {
      data.forEach(x => {
        this.userFollows.push(x);
      });
    }) 
  }

  //check if the user is already following
  validateId(findEmail: string) {
    return this.userFollows.find(x => x.followingEmail === findEmail);
  }

  onFollow(followEmail:string){
    this.newFollow = {
      followingEmail:followEmail,
      userEmail:this.email,
    }
    this.charityRESTService.FollowUser(this.newFollow).subscribe(
      (sub) => {

      }
    );
  }

}