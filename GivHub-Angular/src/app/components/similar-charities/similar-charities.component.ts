import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { subscription } from '../../models/subscription';
import { charityapi } from '../../models/charityapi';
import { CharityAPIService } from '../../services/charity-api.service';
import { charity } from '../../models/charity';
import { CharityRESTService } from '../../services/charity-rest.service';

@Component({
  selector: 'app-similar-charities',
  templateUrl: './similar-charities.component.html',
  styleUrls: ['./similar-charities.component.css']
})
export class SimilarCharitiesComponent implements OnInit {
  category: any;
  charitiesapi: charityapi[] =[];
  userSubs: subscription[] = [];
  email: string;
  subscription: subscription;
  indexedArray: {[key: string]:string} = {
    'foo': "bar",
    'boo': "thang",
    'Arts, Culture and Humanities': "A",
    'Educational Institutions and Related Activities':"B",
    "Environmental Quality, Protection and Beautification":"C",
    "Animal-Related":"D",
    "Health - General and Rehabilitative":"E",
    "Mental Health, Crisis Intervention":"F",
    "Diseases, Disorders, Medical Disciplines":"G",
    "Medical Research":"H",
    "Crime, Legal-Related":"I",
    "Employment, Job-Related":"J",
    "Food, Agriculture and Nutrition":"K",
    "Housing, Shelter":"L",
    "Public Safety, Disaster Preparedness and Relief":"M",
    "Recreation, Sports, Leisure, Athletics":"N",
    "Youth Development":"O",
    "Human Services - Multipurpose and Other":"P",
    "International, Foreign Affairs and National Security":"Q",
    "Civil Rights, Social Action, Advocacy":"R",
    "Community Improvement, Capacity Building":"S",
    "Philanthropy, Voluntarism and Grantmaking Foundations":"T",
    "Science and Technology Research Institutes, Services":"U",
    "Social Science Research Institutes, Services":"V",
    "Public, Society Benefit - Multipurpose and Other":"W",
    "Religion-Related, Spiritual Development":"X",
    "Mutual\/Membership Benefit Organizations, Other":"Y",
    "Unknown":"Z"
  }

  constructor(private charityService: CharityAPIService, private router: Router, 
    private route: ActivatedRoute, private oktaAuth: OktaAuthService, 
    private charityRESTService: CharityRESTService) {
      this.category = {
        category: ''
      }
    }

  async ngOnInit() {
    const userClaims = await this.oktaAuth.getUser();
    this.email = userClaims.email;
    this.category =this.route.snapshot.params['category'];
    this.category = this.indexedArray[this.category]
    console.log(this.category);
    this.charitiesapi = this.charityService.SearchCharitiesByCategory(this.category);
  console.log(this.charitiesapi);
  }
  validateId(charity: charityapi) {
    return this.userSubs.find(x => x.charityId == Number(charity.ein));
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
