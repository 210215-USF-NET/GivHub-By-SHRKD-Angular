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

  url: string = 'https://localhost:44389/api/Location';

  constructor( private http: HttpClient){
    
  }

  location: Location;
  GetCharity(): Observable<charity[]>{
    return 
  }
  GetUsersCharities(userId: number) : Observable<charity[]>{
    return
  }

  GetCharityLocations() : Observable<location[]>{
    return this.http.get<location[]>(`${this.url}/Locaiton`,this.httpOptions);
  }
  GetSubscriptionByUser(email: string) :Observable<subscription[]>{
    return this.http.get<subscription[]>(`${this.url}/Subsciption/${email}`)
  }
  GetSearchhistoryByUser(email: string) :Observable<searchHistory[]>{
    return this.http.get<searchHistory[]>(`${this.url}/SearchHistory/${email}`)
  }
  GetDonationByUser(email: string) :Observable<donation[]>{
    return this.http.get<donation[]>(`${this.url}/Donation/${email}`)
  }





}
