import { charityapi } from './../models/charityapi';
import { searchHistory } from './../models/searchHistory';
import { donation } from './../models/donatin';
import { charity } from '../models/charity'
import { location, } from '../models/location';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { subscription } from '../models/subscription';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CharityRESTService {

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, HEAD, GET, POST, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding, X-Auth-Token, content-type',

      }
    )
  }

  locationURL: string = environment.locationURL;
  charityURL: string = environment.charityURL;
  subscriptionURL: string = environment.subscriptionURL;
  donationURL: string = environment.donationURL;
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
    return this.http.get<charity[]>(`${this.charityURL}/popularcharity`,this.httpOptions);
  }
  GetUserSubscription(userEmail: string): Observable<subscription []>{
    return this.http.get<subscription[]>(`${this.subscriptionURL}/email?email=${userEmail}`,this.httpOptions);
  }
  GetCharityById(id:number): Observable<charity>{
    return this.http.get<charity>(`${this.charityURL}/${id}`,this.httpOptions);
  }

  //Add a charity if it doesnt exist
  AddCharity(newCharity: charity[]): Observable<charity[]>{
    return this.http.post<charity[]>(this.charityURL,JSON.stringify(newCharity),this.httpOptions);
  }

  //makes a user sub, gets called from the search-charity component
  UserSubscribe(sub: subscription): Observable<subscription>{
    // console.log(subscription.charityId);
    console.log(sub);
    return this.http.post<subscription>(this.subscriptionURL,sub,this.httpOptions);
  }

  UserDonate(don: donation): Observable<donation>{
    console.log(don);
    return this.http.post<donation>(this.donationURL, don, this.httpOptions);
  }

  GetUserDonations(userEmail: string): Observable<donation[]>{
    return this.http.get<donation[]>(`${this.donationURL}/email?email=${userEmail}`, this.httpOptions);
  }
}
