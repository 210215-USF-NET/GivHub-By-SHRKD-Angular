import { charityapi } from '../models/charityapi';
import { charity } from '../models/charity';
import { charityArray } from '../models/charityArray';
import { HttpHeaders, HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
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

  constructor(private http: HttpClient) { }
  
  SearchCharities(searchTerm: string): charityapi[]{

    const proxyUrl = "https://cors.bridged.cc/"
    let result = this.http.get<charityArray>(`${proxyUrl}${this.url}&searchTerm=${searchTerm}`, this.requestOptions);
    var newCharityArray:charityapi[] = [];
    result.toPromise().then(data => {
      data.data.forEach(x => {
        newCharityArray.push(x);
      });
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
    let result = this.http.get<charityArray>(`${this.url}&categoty=${category}`, {'headers':this.headers});
    var newCharityArray:charityapi[] = [];
    result.toPromise().then(data => {
      data.data.forEach(x => {
        newCharityArray.push(x);
      });
    })
    return newCharityArray;
  }
}
