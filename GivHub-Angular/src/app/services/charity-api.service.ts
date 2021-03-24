import { charity } from '../models/charity';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CharityAPIService {


  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json'
      }
    )
  }

  url: string = 'http://data.orghunter.com/v1/charitysearch?user_key=153f832c549a150e74121c7c7c40667e'

  constructor(private http: HttpClient) { }

  SearchCharities(searchTerm: string): Observable<charity[]>{
    return this.http.post<charity[]>(`${this.url}&searchTerm=${searchTerm}`, this.httpOptions);
  }
}
