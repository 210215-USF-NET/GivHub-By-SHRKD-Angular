import { Router } from '@angular/router';
import { CharityRESTService } from './../../services/charity-rest.service';
import { Component, OnInit } from '@angular/core';
import {location } from '../../models/location'
@Component({
  selector: 'app-userCharities',
  templateUrl: './userCharities.component.html',
  styleUrls: ['./userCharities.component.css']
})
export class UserCharitiesComponent implements OnInit {
locations : location[] = [];
  constructor(private charityService: CharityRESTService, private router:Router) { }

  ngOnInit(): void {
    this.charityService.GetCharityLocations().subscribe(
      (result)=>{
        this.locations = result;
      }
    )
  }

}
