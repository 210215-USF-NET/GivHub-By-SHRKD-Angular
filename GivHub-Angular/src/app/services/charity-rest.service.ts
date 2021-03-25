import { charity } from '../models/charity'
import { location, } from '../models/location';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CharityRESTService {
  ulr: string = 'https://localhost:5001/api/charity';

  constructor( private http: HttpClient){}


  GetCharity(): Observable<charity[]>{
    return 
  }
  GetUsersCharities(userId: number) : Observable<charity[]>{
  return
  }






}
