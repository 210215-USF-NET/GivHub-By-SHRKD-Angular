import { charity } from '../../models/charity';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { CharityAPIService } from '../../services/charity-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchCharity',
  templateUrl: './searchCharity.component.html',
  styleUrls: ['./searchCharity.component.css']
})
export class SearchCharityComponent implements OnInit {
  searchTerm: any;
  charities: charity[] =[];
  constructor(private charityService: CharityAPIService, private router: Router) {
    this.searchTerm = {
      searchTerm: ''
    }

  }

  ngOnInit(): void {
    this.charityService.GetSomeCharities().subscribe(
      (result) =>{
        this.charities = result;
      }
    )
  }
  onSubmit(): void{
    this.charityService.SearchCharities(this.searchTerm);
    alert("search was made")
    
  }


}
