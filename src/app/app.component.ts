import { Component, Input } from '@angular/core';
// import {TranslateService} from '@ngx-translate/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './services/authentication.service';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NBK-B2C';
  path: any;
  currentRoute: string;
  user: any;
  ipAddress: any;
  authenticationLoading: boolean;
 
  constructor(private router: Router,
            private _authenticationService: AuthenticationService,
            private _sharedService: SharedService,
  ) {
    this.currentRoute = "Demo";
    //this.checkAuthentication();
    this.getMyIP()

    this._authenticationService.currentUserSubject.subscribe(data=> {
      
      if(data != null && Object.keys(data).length)  {
        this.user= data;
      }else{
        this.user = this._authenticationService.affliateUser;
      }
    });


    this._authenticationService.authenticationLoadingSubject.subscribe(state => {
      this.authenticationLoading = state;
    });


  
    this.router.events.subscribe((event: Event) => {

        if (event instanceof NavigationEnd) {
            this.currentRoute = event.url;
            this.path = this.currentRoute.split('/').pop();
        }


    });
  }
  // direction = 'rtl';
  // constructor(private translateService:TranslateService){}
  // translate(event:any){
  //   this.translateService.use(event.target.value)
  // }



  checkAuthentication() {
    if(Object.keys(this._authenticationService.affliateUser).length< 1) {
      const req = {
        username: environment.guestMail,
        password: environment.guestPassword,
        grant_Type:'client_credentials',
        type:'Login'
      }
      this._authenticationService.getAcessToken(req).subscribe(response=> {
        if (response && response.success!==false) {
          this._sharedService.setLocalStore('__token',response);
          this._authenticationService.setToken(response);  

         const req2 = {
            email: environment.guestMail,
            password: environment.guestPassword
          }
          this._authenticationService.Generate2FA_otp(req2).subscribe(res2=> {
            if(res2) {
              this._authenticationService.login(environment.guestMail, environment.guestPassword, null, this.ipAddress).subscribe(data=> {
                if (data && data.success) {
                  this._sharedService.setLocalStore('currentUser',data.data);
                  this._authenticationService?.authenticateUser(data.data);
                  this.router.navigate(['/']);
                }else {
                }
              })
            }
          })
        }else {

        }
      }, error=> {

      })
    }
  }


  getMyIP() {
    this._sharedService?.getMyIP()
    .subscribe({
      complete: () => {}, // completeHandler
      error: (error: any) => {
      }, // errorHandler
      next: (data: any) => {
        if (data != null) {
          this.ipAddress=data?.ip;
        } 
      },
    });
  }
}
