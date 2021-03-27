import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NytApiService {
  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json'
      }
    )
  }

  url: string = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
  key: string = 'api-key=qgJur0BO2ym1GQzYiAU5IAp3orFiMtLR';
  constructor(private http: HttpClient) { }

  SearchArticles(searchTerm: string): Observable<string[]>{
    return this.http.get<string[]>();
  }
}
