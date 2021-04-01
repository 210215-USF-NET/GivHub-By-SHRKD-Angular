import { charityapi } from '../models/charityapi';
import { charity } from '../models/charity';
import { charityArray } from '../models/charityArray';
import { HttpHeaders, HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { charityClass } from '../models/charityClass';
import { location } from '../models/location';
import { CharityRESTService } from './charity-rest.service';

@Injectable({
  providedIn: 'root'
})
export class CharityAPIService {

  // {
  //   'Content-Type': 'application/json',
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Methods': 'OPTIONS, HEAD, GET, POST, PUT, PATCH, DELETE',
  //   'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding, X-Auth-Token, content-type',

  // }
  httpOptions = {
    
  }
  headers = new HttpHeaders()
  .set('Access-Control-Allow-Origin', '*')
  .set("Access-Control-Expose-Headers","Content-Encoding, Authorization")
  .set("Access-Control-Max-Age","700")
  .set('Content-Type','application/json')
  .set('Access-Control-Request-Method', 'OPTIONS,GET,PUT,POST,DELETE')
  .set('Access-Control-Allow-Headers','X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding, X-Auth-Token, content-type')
  .set("Access-Control-Request-Headers","Content-Type")
  .set("Access-Control-Allow-Credentials","true")
  requestOptions = {  headers: this.headers};  

  url: string = 'https://data.orghunter.com/v1/charitysearch?user_key=153f832c549a150e74121c7c7c40667e'

  constructor(private http: HttpClient, private charityRESTService: CharityRESTService) { }
  
  SearchCharities(searchTerm: string): charityapi[]{

    const proxyUrl = "https://cors.bridged.cc/"
    let result = this.http.get<charityArray>(`${proxyUrl}${this.url}&searchTerm=${searchTerm}`, this.requestOptions);
    var newCharityArray:charityapi[] = [];
    var ourCharityModelArray: charity[] = [];
    result.toPromise().then(data => {
      data.data.forEach(x => {
        newCharityArray.push(x);
        var tempCharity = new charityClass();
        tempCharity.id = 0;
        tempCharity.name = x.charityName;
        tempCharity.location = new location();
        tempCharity.location.state = x.state;
        tempCharity.location.city = x.city;
        tempCharity.location.zipcode = x.zipCode;
        tempCharity.location.charityid = 0;
        if(x.missionStatement){
          tempCharity.missionstatement = x.missionStatement;
        }else{
          tempCharity.missionstatement = "none";
        }
        if(x.url){
          tempCharity.website = x.url;
        }else{
          tempCharity.website = "none";
        }
        tempCharity.category = x.category;
        tempCharity.logourl = "none";
        tempCharity.eid = x.ein;
        

        ourCharityModelArray.push(tempCharity);
      });
      console.log(ourCharityModelArray);
      console.log(JSON.stringify(ourCharityModelArray));
      this.charityRESTService.AddCharity(ourCharityModelArray).subscribe(
        (sub) => {
          console.log(sub);
        }
      );
    })
    
    return newCharityArray;
  }



  GetSomeCharities():charityapi[] {
    let result = this.http.get<charityArray>(`${this.url}&searchTerm=fcancer`, {'headers':this.headers});
    var newCharityArray:charityapi[] = [];
    result.toPromise().then(data => {
      data.data.forEach(x => {
        newCharityArray.push(x);
      });
    })
    return newCharityArray;
  }
  SearchCharitiesByCategory(category: string): charityapi[]{
    const proxyUrl = "https://cors.bridged.cc/"
    let result = this.http.get<charityArray>(`${proxyUrl}${this.url}&category=${category}`, {'headers':this.headers});
    var newCharityArray:charityapi[] = [];
    var ourCharityModelArray: charity[] = [];
    result.toPromise().then(data => {
      data.data.forEach(x => {
        newCharityArray.push(x);
        var tempCharity = new charityClass();
        tempCharity.id = 0;
        tempCharity.name = x.charityName;
        tempCharity.location = new location();
        tempCharity.location.state = x.state;
        tempCharity.location.city = x.city;
        tempCharity.location.zipcode = x.zipCode;
        tempCharity.location.charityid = 0;
        if(x.missionStatement){
          tempCharity.missionstatement = x.missionStatement;
        }else{
          tempCharity.missionstatement = "none";
        }
        if(x.url){
          tempCharity.website = x.url;
        }else{
          tempCharity.website = "none";
        }
        tempCharity.category = x.category;
        tempCharity.logourl = "none";
        tempCharity.eid = x.ein;
        

        ourCharityModelArray.push(tempCharity);
      });
      console.log(ourCharityModelArray);
      console.log(JSON.stringify(ourCharityModelArray));
      this.charityRESTService.AddCharity(ourCharityModelArray).subscribe(
        (sub) => {
          console.log(sub);
        }
      );
    
  })
  return newCharityArray;
}  
  // TODO: FIXME
  GetCharityById(ein: number): charityapi[] {
    let result = this.http.get<charityArray>(`${this.url}&ein=${ein}`, {'headers':this.headers});
    var newCharityArray:charityapi[]=[];
    result.toPromise().then(data => {
      data.data.forEach(x => {
        newCharityArray.push(x);
      });
    })
    return newCharityArray;
  }
}
