import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AffiliateService } from 'src/app/services/affiliate.service';
import { SharedService } from 'src/app/services/shared.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs';
import { log } from 'console';

@Component({
  selector: 'app-affliate',
  templateUrl: './affliate.component.html',
  styleUrls: ['./affliate.component.scss'],
  providers: [SharedService, MessageService]
})
export class AffliateComponent {
  affiliateRegForm: FormGroup;
  loginForm: FormGroup;
  isLogin: boolean = true;
  isRegisterd: boolean = false;
  public countryOptionList: any = [];
  public stateOptionList:any;
  isLoading=false;

  @Output() isloadingAffiliate: EventEmitter<boolean> = new EventEmitter(true);

  public user:any;
  login_clicked: boolean = false;
  _2FAEnabled: boolean = false;
  isLoggedIn: any = false;
  constructor(private cdr: ChangeDetectorRef,
              private router: Router,
              private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              public sharedService:SharedService,
              private affiliateService:AffiliateService,
              private messageService:MessageService) { }
  ngOnInit(): void {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Not enough permission to continue. Please Try Again' });
    this.affiliateRegForm = this.formBuilder.group({
      businessname: ['', Validators.required],
      userfname: ['', Validators.required],
      userlname: ['', Validators.required],
      office_addr: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: ['', Validators.required],
      state: [''],
      country: [''],
    });
    this.loginForm = this.formBuilder.group({
      password: ['',Validators.required],
      user_email: ['', [Validators.required, Validators.email]]
    });
    this.getCountryData();
    this.affiliateRegForm.get("country").valueChanges.subscribe(country => {
      this.stateOptionList=country?.states.map( state => { 
        const container = {
          label:state,
          value:state
        };
        return container;
      });
   })
  }
  get password() {
    return this.loginForm?.get('password') as FormControl<any>;
  }
  get user_email() {
    return this.loginForm?.get('user_email') as FormControl<any>;
  }
  get businessname() {
    return this.affiliateRegForm?.get('businessname') as FormControl<any>;
  }
  get userfname() {
    return this.affiliateRegForm?.get('userfname') as FormControl<any>;
  }
  get userlname() {
    return this.affiliateRegForm?.get('userlname') as FormControl<any>;
  }
  get office_addr() {
    return this.affiliateRegForm?.get('office_addr') as FormControl<any>;
  }
  get email() {
    return this.affiliateRegForm?.get('email') as FormControl<any>;
  }
  get phonenumber() {
    return this.affiliateRegForm?.get('phonenumber') as FormControl<any>;
  }
  get country() {
    return this.affiliateRegForm?.get('country') as FormControl<any>;
  }
  get state() {
    return this.affiliateRegForm?.get('state') as FormControl<any>;
  }
  registerAffiliate() {
    if(this.affiliateRegForm.valid)
    {

      let reqmodel=
      {
        businessName:this.affiliateRegForm?.value?.businessname,
        leadUserFirstName:this.affiliateRegForm?.value?.userfname,
        leadUserLastName:this.affiliateRegForm?.value?.userlname,
        email:this.affiliateRegForm?.value?.email,
        phoneNumber:this.affiliateRegForm?.value?.phonenumber?.e164Number,
        country:this.affiliateRegForm?.value?.country?.country,
        state:this.affiliateRegForm?.value?.state?.value,
        office_addr:this.affiliateRegForm?.value?.office_addr,
      }
      // this.isLoading = true;
      this.isloadingAffiliate.emit(true);
      this.affiliateService.RegisterB2BCustomer(reqmodel).subscribe({
        complete: () => { }, // completeHandler
        error: (error: any) => { this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Registration failed. Please Try Again' }); this.isLoading = false; },    // errorHandler 
        next: (response: any) => {
          if (response !== null && response !== undefined) {
            console.log(response);
            this.isloadingAffiliate.emit(false);
            this.isRegisterd=true;
          }
          else {
            setTimeout(() => {
              this.isloadingAffiliate.emit(false);
            }, 600);
           
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'This email is already associated with an account. Please Try Again' });
          }
        }
      });
    }
    else
    {
      this.affiliateRegForm.markAllAsTouched();
    }
  }
  getCountryData() {
    this.sharedService.getAllCountryStates().subscribe(res => {
      this.countryOptionList = res;
    })
  }
  ss(){
    this.isloadingAffiliate.emit(true);
  }
  loginAffiliate()
  {
    if(this.loginForm.valid)
    {

      
      let reqmodel=
      {
        username: this.user_email.value,
        password: this.password.value,
        grant_Type:'client_credentials',
        type:'Login'
      }
      this.isloadingAffiliate.emit(true);
      this.affiliateService.Login(reqmodel).subscribe({
        complete: () => { }, // completeHandler
        error: (error: any) => { this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong. Please Try Again' });       this.isloadingAffiliate.emit(false); },    // errorHandler 
        next: (response: any) => {
          if (response && response.success!==false) {
            // this.isloadingAffiliate.emit(false);

            this.sharedService.setLocalStore('__token',response);
            this.authenticationService.setToken(response);
            this.Generate2FA_otp();
            // if(response.permissions.filter((item: { o_View: boolean; })=>item.o_View==true).length > 0)
            // {

            //   this.user=response;
            //   this.user!.id=response.userID.toString();
            //   this.user!.b2BCustomer_ID=response.b2BCustomer_ID.toString();
            //   this.user!.userType="B2B";
            //   this.sharedService.setLocalStore('user',"");
            //   this.sharedService.setLocalStore('affiliate_user',JSON.stringify(this.user));
            //   this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login success.' });
            //   window.location.reload();
            // }
            // else
            // {
            //   this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Not enough permission to continue. Please Try Again' });
            
            // }
            
          }
          else {

            setTimeout(() => {
              this.isloadingAffiliate.emit(false);
            }, 300);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid email or password. Please Try Again' });
          }
        }
      });
    }
    else
    {
      this.loginForm.markAllAsTouched();
    }
  }



  Generate2FA_otp() {
    console.log('line 207');
    
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
          }
          else {
            this._2FAEnabled = false;
            // this.loginChecker();

            // this.proceedToLogin();
          }
        },
        error => {
          this.login_clicked = false;
          // this.error = error;
          //     this.login_clicked = false
          //     this.show_error_msg = true;
        });
  }


  // loginChecker() {
    
  //   if (!this.isLoggedIn) {
  //     // this.isShowBranchList = [];
  //     this.login_clicked = true;
  //     this.isLoggedIn = true;
  
  //     this.authenticationService.login(
  //       this.login.username.value, 
  //       this.login.password.value, 
  //       this.otp, 
  //       this.ipAddress, 
  //       // this.latitude, 
  //       // this.longitude
  //     ).subscribe({
  //       next: (data: any) => {
  //         if (data && data.success) {
  //           // this.show_error_msg = false;
  //           // this.show_error_msgBranch = false;
  //           // this.LoginUserData = data.data;
  
  //           if (data.data?.branchList?.length > 0) {
  //             // this.branchList.setValidators([Validators.required]);
  //             // this.branchList.updateValueAndValidity();
  
  //             if (data.data.branchList.length === 1) {
  //               // this.isShowBranchList = [];
  //               // const singleBranch = data.data.branchList[0];
  //               // this.branchList.patchValue(singleBranch.value);
  //               // this.LoginUserData.selectedBranch = singleBranch;
  //               // this.routingDashboard();
  //             } else {
  //               // this.login_clicked = false;
  //               // this.isShowBranchListView=true;
  //               // this.isShowBranchList = data?.data?.branchList;
  //             }
  //           } else {
  //             // this.LoginUserData.selectedBranch = null;
  //             // this.branchList.clearValidators();
  //             // this.branchList.updateValueAndValidity();
  //             // this.routingDashboard();
  //           }
  //         }
  //       },
  //       error: (error: any) => {
  //         // this.handleLoginError(error.error.errorMessage);
  //       },
  //       complete: () => {
  //         // Add any logic needed on completion here if necessary
  //       }
  //     });
  //   }
  // }
}
