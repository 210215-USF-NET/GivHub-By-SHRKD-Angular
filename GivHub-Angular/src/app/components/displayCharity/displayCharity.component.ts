import { Component, OnInit } from '@angular/core';
import { charity } from 'src/app/models/charity';
import { CharityRESTService } from 'src/app/services/charity-rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-displayCharity',
  templateUrl: './displayCharity.component.html',
  styleUrls: ['./displayCharity.component.css']
})
export class DisplayCharityComponent implements OnInit {
  charity: charity;
  constructor(private charityService : CharityRESTService, private route : ActivatedRoute, private router : Router) { 
    this.charity = {
      name: "",
      missionstatement: "",
      website: "",
      category: "",
      logourl: "",
      eid: "",
      location: {
        state: "",
        city: "",
        zipcode: "",
        charityid: 0
      }
    }

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.charityService.GetCharity(params.charity).subscribe(
          foundCharity => {
            this.charity = foundCharity;
          }
        )
      }
    )

  }

}
