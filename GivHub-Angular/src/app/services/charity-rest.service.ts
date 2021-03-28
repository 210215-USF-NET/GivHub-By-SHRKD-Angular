import { charityapi } from './../models/charityapi';
import { searchHistory } from './../models/searchHistory';
import { donation } from './../models/donatin';
import { charity } from '../models/charity'
import { location, } from '../models/location';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { subscription } from '../models/subscription';


@Injectable({
  providedIn: 'root'
})
export class CharityRESTService {

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*/*',
        'Access-Control-Allow-Methods': 'OPTIONS, HEAD, GET, POST, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding, X-Auth-Token, content-type',

      }
    )
  }

  locationURL: string = 'https://localhost:44389/api/Location';
  charityURL: string = "https://localhost:44389/api/Charity";
  subscriptionURL: string = "https://localhost:44389/api/Subscription"
  constructor( private http: HttpClient){}

  location: Location;
  GetCharity(charityName: string): Observable<charity>{
    return this.http.get<charity>(`${this.charityURL}/${charityName}`,this.httpOptions);
  }
  GetUsersCharities(userEmail: string) : Observable<charity[]>{
    return this.http.get<charity[]>(`${this.subscriptionURL}/${userEmail}`,this.httpOptions);
  }
  GetCharityLocations() : Observable<location[]>{
    return this.http.get<location[]>(this.locationURL,this.httpOptions);
  }

  GetMostPopularCharities(): Observable<charity[]>{
    return this.http.get<charity[]>(this.charityURL,this.httpOptions);
  }
  GetUserSubscription(userEmail: string): Observable<subscription []>{
    return this.http.get<subscription[]>(`${this.subscriptionURL}/email?email=${userEmail}`,this.httpOptions);
  }
  GetCharityById(id:number): Observable<charity>{
    return this.http.get<charity>(`${this.charityURL}/${id}`,this.httpOptions);
  }

  //makes a user sub, gets called from the search-charity component
  UserSubscribe(subscription: subscription): Observable<subscription>{
    // console.log(subscription.charityId);
    // console.log(subscription.email);
    return this.http.post<subscription>(`${this.subscriptionURL}`,subscription,this.httpOptions);
  }
}
