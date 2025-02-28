import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";




export interface AuthTokens {
    accessToken: string;
    accessTokenExpiration: string;
}

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {

    private currentTokenSubject: BehaviorSubject<AuthTokens>;

    constructor(private http: HttpClient) {

    }

    setToken(token: AuthTokens) {
        this.currentTokenSubject.next(token);
    }

    Generate2FA_otp(Data:any){
        return this.http.post<any>(environment.apiUrl + "api/Common/Generate2FA_otp",Data);
    }
}