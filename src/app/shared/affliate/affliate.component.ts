import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AffiliateService } from 'src/app/services/affiliate.service';
import { SharedService } from 'src/app/services/shared.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';
import { first } from 'rxjs';
import { error, log } from 'console';
import Swal from 'sweetalert2';

export class FileUpload {
  key: string;
  name: string;
  url: string;
  file: File;

  constructor(file: File) {
    this.file = file;
  }
}
@Component({
  selector: 'app-affliate',
  templateUrl: './affliate.component.html',
  styleUrls: ['./affliate.component.scss'],
  providers: [SharedService, MessageService]
})
export class AffliateComponent {
  affiliateRegForm: FormGroup;
  loginForm: FormGroup;
  isLogin: boolean = false;
  isRegisterd: boolean = false;
  public countryOptionList: any = [];
  public stateOptionList:any;
  isLoading=false;
  isUploading:boolean=false;
  public imageUrl:any;
  currentLogoUpload: FileUpload;

  @Output() isloadingAffiliate: EventEmitter<boolean> = new EventEmitter(true);

  public user:any;
  login_clicked: boolean = false;
  _2FAEnabled: boolean = false;
  isLoggedIn: any = false;
  otp: any;
  ipAddress: any;
  isSubmitted: boolean = false;
  isRequestLoading: boolean;
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
      companyLogo: ['', Validators.required],
      termsAccepted: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
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
    this.isSubmitted = true;
    if(this.affiliateRegForm.valid)
    {
      this.isSubmitted = false;
      this.isRequestLoading = true;
      this.sendMail();
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
      this.isLoading =true;
      let reqmodel=
      {
        username: this.user_email.value,
        password: this.password.value,
        grant_Type:'client_credentials',
        type:'Login'
      }
      this.isLoading = true;
      this.affiliateService.getAcessToken(reqmodel).subscribe({
        complete: () => { }, // completeHandler
        error: (error: any) => { this.isLoading = false; this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong. Please Try Again' });       this.isloadingAffiliate.emit(false); },    // errorHandler 
        next: (response: any) => {
          if (response && response.success!==false) {
            // this.isloadingAffiliate.emit(false);

            this.sharedService.setLocalStore('__token',response);
            this.authenticationService.setToken(response);
            this.Generate2FA_otp();
          }
          else {
            setTimeout(() => {
              this.isLoading = false;
              // this.isloadingAffiliate.emit(false);
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
            this.isLoading = false;
            this._2FAEnabled = true;
            this.isLoading = false;
          }
          else {
            this._2FAEnabled = false;
            this.loginChecker();

            // this.proceedToLogin();
          }
        },
        error => {
          this.login_clicked = false;
          this.isLoading = false;
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
            this.isLoading = false;
            this.sharedService.setLocalStore('currentUser',data.data);
            this.authenticationService?.authenticateUser(data.data);
            this.isLoading = false;
            this.router.navigate(['/'])
          }else {
            this.isLoading = false;
          }
        },
        error: (error: any) => {
          this.isLoading = false;
          // this.handleLoginError(error.error.errorMessage);
        },
        complete: () => {
          // Add any logic needed on completion here if necessary
        }
      });
  }
  

    getMyIP() {
      this.sharedService?.getMyIP()
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


    onLogoFileSelected(event: any) {
      this.isUploading=true;
      if (event.target.files && event.target.files[0]) {
        
        let reader = new FileReader(); // HTML5 FileReader API
        let file = event.target.files[0];
        const size = (file.size / 1024 / 1024).toFixed(2); // File size in MB
        reader.readAsDataURL(file);
    
        reader.onload = () => {
          this.imageUrl = reader.result;
    
          if (+size > 5) { // File size exceeds 5MB

            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'The maximum file size is less than 5MB' });
            // Swal.fire({
            //   title: "upload limit",
            //   text: "The maximum file size is less than 5MB",
            //   icon: "error"
            // });
            
            this.isUploading=false;
          } else {
            // Create a new FileUpload object
            this.currentLogoUpload = new FileUpload(file);
    
            // Start uploading the file and handle the observable response
            this.sharedService.pushFileToStorage(this.currentLogoUpload, '/Company-Logos').subscribe({
              next: (percentage: number) => {
                
                if (percentage === 100) {
                 
    
                  // Start checking for the URL once the upload is complete
                  const intervalId = setInterval(() => {
                    if (this.currentLogoUpload.url) {
                     
                      this.getControl('companyLogo').setValue(this.currentLogoUpload.url);
                      this.isUploading=false;
                      clearInterval(intervalId); // Clear the interval once the URL is found
                    }
                  }, 500); // Check every 500ms
                }
              },
              error: (error: any) => {
                this.isUploading=false;
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Broken connection' });
                // Swal.fire({
                //   title: "Upload Error",
                //   text: "broken connection",
                //   icon: "error"
                // });
              },
              complete: () => {
                
              }
            });
          }
        };
      } else {
        this.isUploading=false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No files selected' });
        // Swal.fire({
        //   title: "Upload Error",
        //   text: "No files selected",
        //   icon: "error"
        // });
      }
    }


    sendMail(){
    let body = (<HTMLElement>document.getElementById('register-template'))?.innerHTML;
      let reqmodel=
      {
        receiverID:0,
        orderID: 'KONGA' + "_Request_" + new Date().toISOString(),
        displayName:"Konga Travel & Tours",
        to:environment.aff_reg_toaddress,
        cc:[],
        from: environment?.emailConfiguration?.From,
        body:body,
        fileName: null,
        subject: `Customer Registration`,
        emailConfig:environment?.emailConfiguration
      }
      this.sharedService.SendConfirmationEmail(reqmodel).subscribe({
        complete: () => {
          
        },
        error: (error: any) => {
          this.isRequestLoading=false;
         
          this.affiliateRegForm.reset();
          // this.closeDialog();
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unable to procees the request ,please contact support' });
        },
        next: (data: any) => {
          
          this.isRequestLoading=false;
          if (data?.successMSG != null) {
            this.affiliateRegForm.reset();
            // this.closeDialog();

             Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Request sent Successfully',
              showConfirmButton: false,
              timer: 2000
            });
            
          } else {
            this.affiliateRegForm.reset();
            // this.closeDialog();
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'SOMETHING WENT WRONG!'
            });
           
          }
        }
      });
      
    
  }

    getControl(controlName: string): FormControl {
      return this.affiliateRegForm.get(controlName) as FormControl;
    }


    

    
}
