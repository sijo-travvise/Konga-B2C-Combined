import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { log } from "console";
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
    private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(this._sharedService.getLocalStore('currentUser') || {});
    public currentToken:Observable<AuthTokens>;

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

    public get affliateUser(): User {
        return this.currentUserSubject.value;
    }

    public get currentAccessToken(): AuthTokens {
        return this.currentTokenSubject.value;  
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

