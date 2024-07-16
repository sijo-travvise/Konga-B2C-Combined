import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AffiliateService {
  readonly flightsearchurl = environment.apiUrl;
  constructor(private http:HttpClient) { }
  RegisterB2BCustomer(reqmodel: any): Observable<any> {
    return this.http.post<any>(this.flightsearchurl + 'api/B2BCustomer/RegisterB2BCustomer', reqmodel);
  }
  Login(reqmodel: any): Observable<any> {
    return this.http.post<any>(this.flightsearchurl + 'api/B2BCustomer/Login', reqmodel);
  }
}
