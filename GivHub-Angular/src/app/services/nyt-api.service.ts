import { nytapi } from '../models/nytapi';
import { nytArticle } from '../models/nytArticle';
import { nytArray } from '../models/nytArray';
import { nytapiDocs } from '../models/nytapiDocs';
import { nytapiMeta } from '../models/nytapiMeta';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NytApiService {
  httpOptions = {
    
  }
  headers = new HttpHeaders()
  .append('content-type','application/json')
  .append('Access-Control-Allow-Origin', '*')
  .append('Access-Control-Request-Method', 'POST, GET')
  .append('Access-Control-Allow-Headers','X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding, X-Auth-Token, content-type');
  url: string = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'
  query: string = 'fq=subject:(%22Nonprofit%20Organizations%22)&page=1&sort=newest'
  key: string = 'api-key=qgJur0BO2ym1GQzYiAU5IAp3orFiMtLR'
  
  constructor(private http: HttpClient) { }

  GetTopArticles(): nytapi[] {
    let result = this.http.get<nytArray>(`${this.url}?${this.query}&${this.key}`, {'headers':this.headers});
    var newNYTArray: nytapi[]=[];
    result.toPromise().then(data => {
      data.response.forEach(x => {
        newNYTArray.push(x);
      })
    })
    return newNYTArray;
  }
}
