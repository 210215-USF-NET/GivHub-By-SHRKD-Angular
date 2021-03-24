import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CharitySearchService {

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json'
      }
    )
  }

  url : string = "https://localhost:5001/api/charity";

  constructor(private http: HttpClient) { }

  // GetAllCharities():Observable<>{
      //return 
  // }
}
