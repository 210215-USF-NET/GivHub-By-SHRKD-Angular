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

  // url: string = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'
  // query: string = 'fq=subject:(%22Nonprofit%20Organizations%22)&page=1&sort=newest'
  // key: string = 'api-key=qgJur0BO2ym1GQzYiAU5IAp3orFiMtLR'
  
  superURL: string = "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=subject:(%22Nonprofit%20Organizations%22)&page=1&sort=newest&api-key=qgJur0BO2ym1GQzYiAU5IAp3orFiMtLR";

  constructor(private http: HttpClient) { }
//${this.url}?${this.query}&${this.key}
  GetTopArticles(): nytapiDocs[] {
    let result = this.http.get<nytArray>(`${this.superURL}`, {'headers':this.headers});
    var newNYTArray: nytapiDocs[]=[];
    result.toPromise().then(data => {
      data.response.docs.forEach(x => {
        newNYTArray.push(x);
      })
    })
    return newNYTArray;
  }
}
