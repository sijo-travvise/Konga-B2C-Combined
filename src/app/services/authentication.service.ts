import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map, Subject, catchError, switchMap, tap, throwError } from "rxjs";
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
    public authenticationLoadingSubject = new BehaviorSubject<boolean>(false);
    // toggleState$ = this.authenticationLoading.asObservable();
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
  ipAddress: any;

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
      checkAuthentication(): Observable<any> {
        this.ipAddress = this._sharedService.getIP();
    
        if (Object.keys(this.affliateUser).length < 1) {
            this.authenticationLoadingSubject.next(true);
            const req = {
                username: environment.guestMail,
                password: environment.guestPassword,
                grant_Type: 'client_credentials',
                type: 'Login'
            };
    
            return this.getAcessToken(req).pipe(
                switchMap(response => {
                    if (response && response.success !== false) {
                        this._sharedService.setLocalStore('__token', response);
                        this.setToken(response);
    
                        const req2 = {
                            email: environment.guestMail,
                            password: environment.guestPassword
                        };
    
                        return this.Generate2FA_otp(req2).pipe(
                            switchMap(res2 => {
                                if (res2) {
                                    return this.login(environment.guestMail, environment.guestPassword, null, this.ipAddress).pipe(
                                        tap(data => {
                                            if (data && data.success) {
                                                this._sharedService.setLocalStore('currentUser', data.data);
                                                this.authenticateUser(data.data);
                                                this.router.navigate(['/']);
                                            }
                                        })
                                    );
                                } else {
                                    throw new Error("2FA OTP generation failed");
                                }
                            })
                        );
                    } else {
                        throw new Error("Token generation failed");
                    }
                }),
                catchError(error => {
                    console.error("Authentication failed", error);
                    this.authenticationLoadingSubject.next(false);
                    return throwError(() => error);
                }),
                tap(() => {
                    this.authenticationLoadingSubject.next(false);
                })
            );
        }
    
        return new Observable(observer => {
            observer.next();
            observer.complete();
        });
    }
    
    
}

