import { charityapi } from '../../models/charityapi';
import { NgModule } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { CharityAPIService } from '../../services/charity-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchCharity',
  templateUrl: './searchCharity.component.html',
  styleUrls: ['./searchCharity.component.css']
})
export class SearchCharityComponent implements OnInit {
  searchTerm: any;
  charitiesapi: charityapi[] =[];

  constructor(private charityService: CharityAPIService, private router: Router, private route: ActivatedRoute) {
    this.searchTerm = {
      searchTerm: ''
    }

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['searchTerm'];
    });
    if(this.searchTerm === ""){
      this.charitiesapi = this.charityService.SearchCharities(this.searchTerm);
    }
    
    // console.log(this.charitiesapi);
  }
  onSubmit(event: any): void{}


}
