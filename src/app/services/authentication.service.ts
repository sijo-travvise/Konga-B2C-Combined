import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { User } from '../Models/User';
import { SharedService } from "./shared.service";
import { Router } from "@angular/router";




export interface AuthTokens {
    accessToken: string;
    accessTokenExpiration: string;
}

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {

    private currentTokenSubject: BehaviorSubject<AuthTokens> = new BehaviorSubject<AuthTokens>(this._sharedService.getLocalStore('__token') || {});
    public currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(this._sharedService.getLocalStore('currentUser') || {});
    public currentToken:Observable<AuthTokens>;
    public user:any= {
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

    constructor(private http: HttpClient,
                private _sharedService: SharedService,
                private router: Router
    ) {

    }

    setToken(token: AuthTokens) {
        if(token) {
            this.currentTokenSubject.next(token);
        }
    }

    authenticateUser(userData:User){
        this.currentUserSubject.next(userData);
    }

    Generate2FA_otp(Data:any){
        return this.http.post<any>(environment.apiUrl + "api/Common/Generate2FA_otp",Data);
    }
    getAcessToken(user: any): Observable<any> {
      return this.http.post<any>(environment.apiUrl + "api/OAuth/token/authorize", user);
    }

    public get affliateUser(): User {
        return this.currentUserSubject.value;
    }

    public get currentAccessToken(): AuthTokens {
        return this.currentTokenSubject.value;  
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

    extendAcessToken(refreshToken: any): Observable<any> {
   
        return this.http.post<any>(environment.apiUrl + "api/OAuth/token/refresh_Token", refreshToken).pipe(
          map(response => {
            const tokens: AuthTokens = {
              accessToken: response.refreshToken,
              accessTokenExpiration: response.refreshTokenExpiration
            };
            this._sharedService.setLocalStore('__token', tokens);
            this.setToken(tokens);
            return tokens;
          })
        );
      }


      logout() {
        localStorage.clear();
        // this._flightLocalStorageDbService.clearData('result').then(() => {});
        this.currentUserSubject.next(JSON.parse('{}'));
        this.currentTokenSubject.next(JSON.parse('{}'));
        this.router.navigate(['/']);
          
      }
}

