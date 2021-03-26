import { charity } from '../models/charity'
import { location, } from '../models/location';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CharityRESTService {

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json'
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
}
