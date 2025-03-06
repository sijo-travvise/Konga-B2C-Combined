import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AffiliateService {
  readonly flightsearchurl = environment.apiUrl;

  public user:any=
  {
    id: 0,
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    emailid: '',
    email: '',
    customerUser_ID: 0,
    empRole_ID: 0,
    customerProfile_ID: 0,
    mobileNumber: '',
    distributionChannel: 'FOS',
    companyName: '',
    customerType: 0,
    otp: null,
    IPAddress: undefined,
    latitude: undefined,
    location:'',
    longitude: undefined,
    _2FAEnabled: false,
  };

  constructor(private http:HttpClient) { }
  RegisterB2BCustomer(reqmodel: any): Observable<any> {
    return this.http.post<any>(this.flightsearchurl + 'api/B2BCustomer/RegisterB2BCustomer', reqmodel);
  }
  Login(reqmodel: any): Observable<any> {
    return this.http.post<any>(this.flightsearchurl + 'api/OAuth/token/authorize', reqmodel);
  }

  getAcessToken(user: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + "api/OAuth/token/authorize", user);
  }

  login(username: string, password: string,otp:any,ipAddress:any): Observable<any> {
    this.user.emailid=username;
    this.user.password=password;
    this.user.otp=otp;
    this.user.IPAddress=ipAddress;
    this.user.latitude='latitude';
    this.user.longitude='longitude';
    this.user.companyName="KONGA";
    return this.http.post<any>(`${environment.apiUrl}api/User/Authenticate`, this.user);
  }
}
