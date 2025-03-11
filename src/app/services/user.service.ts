import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly flightsearchurl =environment.apiUrl;

  constructor(private http:HttpClient) { }
  // GetUserProfile(params: any): Observable<any> {
  //   const queryParams = new HttpParams({ fromObject: params });
  //   return this.http.get(`${this.flightsearchurl}api/b2c/user/B2CFetch`, { params: queryParams });
  // }
  
  UpdateUserProfile(reqmodel:any): Observable<any> {
    return this.http.post<any>(this.flightsearchurl + "api/b2c/user/B2CUpdate" , reqmodel);
  }
}
