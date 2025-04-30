import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs';
import { AffiliateService } from 'src/app/services/affiliate.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';

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
  showLogin = true;
  isLoading=false;
  isLogin: boolean = false;
  login_clicked: boolean = false;
  _2FAEnabled: boolean = false;
  otp: any;
  ipAddress: any;
  email:any = new FormControl('', [Validators.required, Validators.email]);
  otp_input:any = new FormControl('', [Validators.required, Validators.minLength(4)
  ]);
  new_password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
  ]);
  re_password = new FormControl('', [Validators.required, this.matchPasswordValidator(this.new_password)
  ])
  otp_show = false;
  // isGuest: boolean = false;

  @Input() loginActive:boolean = false;
  @Output() isloadingAffiliate: EventEmitter<boolean> = new EventEmitter(true);
  @Output() isGuest: EventEmitter<boolean> = new EventEmitter(true);
  @Output() isLoggedIn: EventEmitter<boolean> = new EventEmitter(true);
  forgetLoading: boolean = false;
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

    this.new_password.valueChanges.subscribe(() => {
      this.re_password.updateValueAndValidity();
    });
  }

  ngOnChanges(changes: SimpleChanges): void  {
    console.log(this.loginActive,'line 61');
    this.showLogin = this.loginActive;
    this.otp_show = false;

    this.email.reset();
    this.otp_input.reset();
    this.new_password.reset();
    this.re_password.reset();
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
  }

  matchPasswordValidator(passwordControl: FormControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || !passwordControl.value) return null;
      return control.value === passwordControl.value ? null : { passwordMismatch: true };
    };
  }
  forgotPassword(key) {
    this.showLogin = key;
  }

  generateOtp() {

    if(!this.otp_show) {
      if(this.email.valid && !this.forgetLoading) {
        console.log(this.email);
        let email ={
          email: this.email.value
        }
        this.generateOTP(email);
       
       }else {
        this.email.markAllAsTouched();
       }
    }else {

      if(this.email.valid && this.otp_input.valid && this.new_password.valid && this.re_password.valid && !this.forgetLoading) {
        console.log(this.email);
        let email ={
          userId: this.email.value,
          code: this.otp_input.value,
          password: this.new_password.value,
          re_password: this.re_password.value,
        }
        this.submitUser(email);
       
       }else {
        this.email.markAllAsTouched();
        this.otp_input.markAllAsTouched();
        this.new_password.markAllAsTouched();
        this.re_password.markAllAsTouched();
       }
    }
    
  }


  submitUser(Data:any){
    this.forgetLoading=true;
    this.affiliateService.userConfirmation(Data).subscribe({
      complete: () => { }, // completeHandler
      error: (error: any) => {this.forgetLoading=false; 
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong'
        });
      },    // errorHandler 
      next: (data: any) => {
        if (data.success==true) {
          this.forgetLoading=false;
          // this.toastr.success("Password Updated Successfully!");
          Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Password Updated Successfully',
              showConfirmButton: false,
              timer: 2000
            });
          this.otp_show=false;
          this.email.reset();
          this.otp_input.reset();
          this.new_password.reset();
          this.re_password.reset();
          this.showLogin = true;

        //  this.otp_clicked = false;
         this.router.navigate(['login']);
       }
       else{
        this.forgetLoading=false;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong'
        });
       }
      
      },
    });
  }


  generateOTP(Data:any){
    // this.isLoading = true;
    this.forgetLoading=true;
    this.affiliateService.generateOTP(Data).subscribe({
      complete: () => { }, // completeHandler
      error: (error: any) => {this.forgetLoading=false; },    // errorHandler 
      next: (data: any) => {
        if (data?.success==false) {
           Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data?.errorMessage
            });
          this.otp_show=false;
          this.forgetLoading=false;
        }
        else {
          // this.toastr.success("Your OTP has been sent successfully. Please check your registered email.");
          // this.router.navigate(['confirmation-user']);

          console.log('line 256');
          
          this.otp_show = true;
          this.forgetLoading=false;
          // this.otp_show=false;


        }
      
      },
    });
  }


  checkPasswordsMatch() {
    if (this.re_password.value !== this.new_password.value) {
      this.re_password.setErrors({ passwordMismatch: true });
    } else {
      this.re_password.setErrors(null);
    }
  }

  backToLogin() {
    this.otp_show=false;
    this.showLogin = true;
  }
}
