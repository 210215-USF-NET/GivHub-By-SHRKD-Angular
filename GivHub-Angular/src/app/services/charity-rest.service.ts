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

  ulr: string = 'https://localhost:44389/api/Location';

  constructor( private http: HttpClient){}

  location: Location;
  GetCharity(): Observable<charity[]>{
    return 
  }
  GetUsersCharities(userId: number) : Observable<charity[]>{
    return
  }

  GetCharityLocations() : Observable<location[]>{
    return this.http.get<location[]>(this.ulr,this.httpOptions);
  }





}
