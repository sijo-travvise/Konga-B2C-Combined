// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpErrorResponse,
//   HttpEvent,
//   HttpInterceptor
// } from '@angular/common/http';
// import {
//   catchError,
//   switchMap,
//   filter,
//   take,
//   delay,
//   tap,
// } from 'rxjs/operators';
// import { Observable, throwError } from 'rxjs';
// import { AuthenticationService } from '../services/authentication.service';
// import { environment } from 'src/environments/environment';
// import { AuthTokens } from '../Models/User';
// import { log } from 'console';

// @Injectable()
// export class JwtInterceptor implements HttpInterceptor {

//   private isRefreshingToken = false;

//   constructor(private authenticationService: AuthenticationService) {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
//     console.log('line 31');
    
//     const currentUser = this.authenticationService.affliateUser;
//     const currentToken = this.authenticationService.currentAccessToken;
//     const isRefreshUrl = request.url.endsWith('/token/refresh_Token');
//     const isApiUrl = request.url.startsWith(environment.apiUrl);

//     const validate = (input: any): boolean => {
//       return typeof input === 'object' && input !== null && JSON.stringify(input) !== '{}';
//     };

//     if(isRefreshUrl && validate(currentUser)){
//       return next.handle(request);
//     }

//     if (validate(currentToken) && isApiUrl ) {
//       const isTokenValid = this.isTokenValid(currentToken.accessToken);

//       if (isTokenValid ) {
//         request = this.addTokenToRequest(request, currentToken.accessToken);
//         return next.handle(request);
//       } else {
//         if(validate(currentUser)){
//           if (this.isRefreshingToken) {
//             // Wait for the refresh to complete
//             return this.authenticationService.currentToken.pipe(
              
//               filter(token => validate(token) && this.isTokenValid(token.accessToken)),
//               take(2),
//               delay(3000),
//               switchMap(newTokens => {
//                 request = this.addTokenToRequest(request, newTokens.accessToken);
//                 return next.handle(request);
//               })
//             );
//           } else {
//             this.isRefreshingToken = true;
//             let requestOBJ={
//               refreshToken:currentToken.accessToken,
//               grant_type: "client_credentials"
//           }
           
//             return this.authenticationService.extendAcessToken(requestOBJ).pipe(
//               switchMap((newTokens: AuthTokens) => {
//                 this.isRefreshingToken = false;
//                 request = this.addTokenToRequest(request, newTokens.accessToken);
//                 return next.handle(request);
//               }),
//               catchError((error: HttpErrorResponse) => {
//                 this.isRefreshingToken = false;
//                 this.authenticationService.logout(); // Logout on refresh token failure
//                 return throwError(() => error);
//               })
//             );
//           }
//         }
       
//       }
//     }else {
//       console.log('line 90');
//       this.authenticationService.checkAuthentication();
      
//     }



//     return next.handle(request);
//   }


//   private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
//     return request.clone({
//       setHeaders: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//   }

//   private isTokenValid(token: string): boolean {
//     if (!token) return false;
//     const payload = JSON.parse(atob(token.split('.')[1]));
//     const expirationDate = new Date(payload.exp * 1000);
//     return expirationDate > new Date();
//   }
// }




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
} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from 'src/environments/environment';
import { AuthTokens } from '../Models/User';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  private isRefreshingToken = false;
  private isCheckingAuthentication = false; // Prevents multiple calls

  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authenticationService.affliateUser;
    const currentToken = this.authenticationService.currentAccessToken;
    const isRefreshUrl = request.url.endsWith('/token/refresh_Token');
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    const isAuthCheckUrl = request.url.includes('/auth/check'); // Exclude auth check calls

    const validate = (input: any): boolean => {
      return typeof input === 'object' && input !== null && JSON.stringify(input) !== '{}';
    };

    if (isRefreshUrl || isAuthCheckUrl) {
      console.log('Skipping authentication processing for:', request.url);
      return next.handle(request);
    }

    if (validate(currentToken) && isApiUrl) {
      const isTokenValid = this.isTokenValid(currentToken.accessToken);

      if (isTokenValid) {
        request = this.addTokenToRequest(request, currentToken.accessToken);
        return next.handle(request);
      } else {
        if (validate(currentUser)) {
          if (this.isRefreshingToken) {
            return this.authenticationService.currentToken.pipe(
              filter(token => validate(token) && this.isTokenValid(token.accessToken)),
              take(1),
              switchMap(newTokens => {
                request = this.addTokenToRequest(request, newTokens.accessToken);
                return next.handle(request);
              })
            );
          } else {
            this.isRefreshingToken = true;
            const requestOBJ = {
              refreshToken: currentToken.accessToken,
              grant_type: "client_credentials"
            };

            return this.authenticationService.extendAcessToken(requestOBJ).pipe(
              switchMap((newTokens: AuthTokens) => {
                this.isRefreshingToken = false;
                request = this.addTokenToRequest(request, newTokens.accessToken);
                return next.handle(request);
              }),
              catchError((error: HttpErrorResponse) => {
                this.isRefreshingToken = false;
                this.authenticationService.logout();
                return throwError(() => error);
              })
            );
          }
        }
      }
    } else {
      console.log('Invalid token or unauthenticated API call detected.');

      // Prevent multiple calls to checkAuthentication
    //   if (!this.isCheckingAuthentication) {
    //     this.isCheckingAuthentication = true;
    //     console.log('Calling checkAuthentication()...');
        
    //     this.authenticationService.checkAuthentication().subscribe(() => {
    //         this.isCheckingAuthentication = false;
    //     }, () => {
    //         this.isCheckingAuthentication = false;+
    //     });
    // }
    
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
