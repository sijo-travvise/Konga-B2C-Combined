import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {
  catchError,
  switchMap,
  filter,
  take,
  delay,
  tap,
} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from 'src/environments/environment';
import { AuthTokens } from '../Models/User';
import { log } from 'console';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  private isRefreshingToken = false;

  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {

    const currentUser = this.authenticationService.affliateUser;
    const currentToken = this.authenticationService.currentAccessToken;
    const isRefreshUrl = request.url.endsWith('/token/refresh_Token');
    const isApiUrl = request.url.startsWith(environment.apiUrl);

    const validate = (input: any): boolean => {
      return typeof input === 'object' && input !== null && JSON.stringify(input) !== '{}';
    };

    if(isRefreshUrl && validate(currentUser)){
      return next.handle(request);
    }

    if (validate(currentToken) && isApiUrl ) {
      const isTokenValid = this.isTokenValid(currentToken.accessToken);

      if (isTokenValid ) {
        request = this.addTokenToRequest(request, currentToken.accessToken);
        return next.handle(request);
      } else {
        if(validate(currentUser)){
          if (this.isRefreshingToken) {
            // Wait for the refresh to complete
            return this.authenticationService.currentToken.pipe(
              
              filter(token => validate(token) && this.isTokenValid(token.accessToken)),
              take(2),
              delay(3000),
              switchMap(newTokens => {
                request = this.addTokenToRequest(request, newTokens.accessToken);
                return next.handle(request);
              })
            );
          } else {
            this.isRefreshingToken = true;
            let requestOBJ={
              refreshToken:currentToken.accessToken,
              grant_type: "client_credentials"
          }
           
            return this.authenticationService.extendAcessToken(requestOBJ).pipe(
              switchMap((newTokens: AuthTokens) => {
                this.isRefreshingToken = false;
                request = this.addTokenToRequest(request, newTokens.accessToken);
                return next.handle(request);
              }),
              catchError((error: HttpErrorResponse) => {
                this.isRefreshingToken = false;
                this.authenticationService.logout(); // Logout on refresh token failure
                return throwError(() => error);
              })
            );
          }
        }
       
      }
    }



    return next.handle(request);
  }


  private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private isTokenValid(token: string): boolean {
    if (!token) return false;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationDate = new Date(payload.exp * 1000);
    return expirationDate > new Date();
  }
}
