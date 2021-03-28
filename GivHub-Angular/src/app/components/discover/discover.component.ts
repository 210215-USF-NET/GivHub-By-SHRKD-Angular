import { category } from './../../models/category';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharityAPIService } from '../../services/charity-api.service';
import { charityapi } from '../../models/charityapi';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {
  category: any;
  charitiesapi: charityapi[] =[];
  
  constructor(private charityService: CharityAPIService, private router: Router, private route: ActivatedRoute) { 

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.category = params['category'];
    });
    console.log(this.category)
    if(this.category){
      this.charitiesapi = this.charityService.SearchCharitiesByCategory(this.category);
    }
  }

}
