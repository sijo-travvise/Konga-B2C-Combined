import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs';
import { AffiliateService } from 'src/app/services/affiliate.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  // activeIndex = 0;
  // forgotWindow:boolean = false

  // @Output() isCloseLogin: EventEmitter<boolean> = new EventEmitter(false);

  // forgotPassword(){
  //   this.forgotWindow = true;
  //   this.isCloseLogin.emit(false);
  // }
  // backToLogin(event){
  //   this.forgotWindow = false;
  //   this.isCloseLogin.emit(true);
  // }
  loginForm: FormGroup;
  isLoading=false;
  isLogin: boolean = false;
  login_clicked: boolean = false;
  _2FAEnabled: boolean = false;
  otp: any;
  ipAddress: any;
  // isGuest: boolean = false;
  @Output() isloadingAffiliate: EventEmitter<boolean> = new EventEmitter(true);
  @Output() isGuest: EventEmitter<boolean> = new EventEmitter(true);
  @Output() isLoggedIn: EventEmitter<boolean> = new EventEmitter(true);
  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    public sharedService: SharedService,
    private affiliateService: AffiliateService,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      password: ['', Validators.required],
      user_email: ['', [Validators.required, Validators.email]],
    });
  }
   get password() {
      return this.loginForm?.get('password') as FormControl<any>;
    }
    get user_email() {  
      return this.loginForm?.get('user_email') as FormControl<any>;
    }
  loginAffiliate() {
    if (this.loginForm.valid) {
      // this.isLoading = true;
      this.authenticationService.authenticationLoadingSubject.next(true);
      let reqmodel = {
        username: this.user_email.value,
        password: this.password.value,
        grant_Type: 'client_credentials',
        type: 'Login',
      };
      //this.isLoading = true;
      this.authenticationService.authenticationLoadingSubject.next(true);
      this.affiliateService.getAcessToken(reqmodel).subscribe({
        complete: () => {}, // completeHandler
        error: (error: any) => {
         // this.isLoading = false;
         this.authenticationService.authenticationLoadingSubject.next(false);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went wrong. Please Try Again',
          });
          this.isloadingAffiliate.emit(false);
        }, // errorHandler
        next: (response: any) => {
          if (response && response.success !== false) {
            // this.isloadingAffiliate.emit(false);

            this.sharedService.setLocalStore('__token', response);
            this.authenticationService.setToken(response);
            this.Generate2FA_otp();
          } else {
            setTimeout(() => {
              //this.isLoading = false;
              this.authenticationService.authenticationLoadingSubject.next(false);
              // this.isloadingAffiliate.emit(false);
            }, 300);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Invalid email or password. Please Try Again',
            });
          }
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
    Generate2FA_otp() {
      let reqModel =
      {
        email: this.user_email.value,
        password: this.password.value
      }
      this.login_clicked = true;
      this.authenticationService.Generate2FA_otp(reqModel)
        .pipe(first())
        .subscribe(
          data => {
            this.login_clicked = false;
            
            if (data?.data) {
              this._2FAEnabled = true;
              //this.isLoading = false;
              this.authenticationService.authenticationLoadingSubject.next(false);
            }
            else {
              this._2FAEnabled = false;
              this.loginChecker();
  
              // this.proceedToLogin();
            }
          },
          error => {
            this.login_clicked = false;
            //this.isLoading = false;
            this.authenticationService.authenticationLoadingSubject.next(false);
            // this.error = error;
            //     this.login_clicked = false
            //     this.show_error_msg = true;
          });
    }
    loginChecker() {
      // this.isShowBranchList = [];
      this.login_clicked = true;
      this.affiliateService.login(
        this.user_email.value,
        this.password.value,
        this.otp, 
        this.ipAddress, 
        // this.latitude, 
        // this.longitude
      ).subscribe({
        next: (data: any) => {
          if (data && data.success) {
            // this.show_error_msg = false;
            // this.show_error_msgBranch = false;
            // this.LoginUserData = data.data;
            // this.isLoading = false;
            this.authenticationService.authenticationLoadingSubject.next(false);
            this.sharedService.setLocalStore('currentUser',data.data);
            this.authenticationService?.authenticateUser(data.data);
            //this.isLoading = false;
            this.authenticationService.authenticationLoadingSubject.next(false);
            //this.router.navigate(['/']);
            this.isLoggedIn.emit(true);
          }else {
            //this.isLoading = false;
            this.authenticationService.authenticationLoadingSubject.next(false);
          }
        },
        error: (error: any) => {
          //this.isLoading = false;
          this.authenticationService.authenticationLoadingSubject.next(false);
          // this.handleLoginError(error.error.errorMessage);
        },
        complete: () => {
          // Add any logic needed on completion here if necessary
        }
      });
  }
  loginAsGuest() {
   // this.authenticationService.setGuestStatus(!this.isGuest);
   this.isGuest.emit(true);
  console.log('guest');
  }
}
