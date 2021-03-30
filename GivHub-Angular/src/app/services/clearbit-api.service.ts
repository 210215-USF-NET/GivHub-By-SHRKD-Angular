import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient} from '@angular/common/http';
import { Observable } from "rxjs";
import { Clearbitmodel } from '../models/clearbitmodel';
@Injectable({
  providedIn: 'root'
})
export class ClearbitApiService {

  url: string = "https://company.clearbit.com/v1/domains/find?name=";
  myClientKey: string = 'sk_930123d0f9d709ac6a6ab77db73119ea';
  headers = new HttpHeaders()
  .set('Content-Type','application/json')
  .set('Authorization','Bearer sk_930123d0f9d709ac6a6ab77db73119ea');
  requestOptions = {  headers: this.headers};  
  constructor(private http: HttpClient) { }
  FindLogoFromName(charityName: string): any{
    const proxyUrl = "https://cors.bridged.cc/"
    let result = this.http.get<Clearbitmodel>(`${this.url}${charityName}`, this.requestOptions);
    return result
  }
}
