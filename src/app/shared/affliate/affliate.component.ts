import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AffiliateService } from 'src/app/services/affiliate.service';
import { SharedService } from 'src/app/services/shared.service';

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
  constructor(private cdr: ChangeDetectorRef,private router: Router, private formBuilder: FormBuilder,public sharedService:SharedService,private affiliateService:AffiliateService,private messageService:MessageService) { }
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
        email:this.user_email.value,
        password:this.password.value,
      }
      this.isloadingAffiliate.emit(true);
      this.affiliateService.Login(reqmodel).subscribe({
        complete: () => { }, // completeHandler
        error: (error: any) => { this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong. Please Try Again' });       this.isloadingAffiliate.emit(false); },    // errorHandler 
        next: (response: any) => {
          if (response !== null && response !== undefined) {
            this.isloadingAffiliate.emit(false);
            if(response.permissions.filter((item: { o_View: boolean; })=>item.o_View==true).length > 0)
            {
              this.user=response;
              this.user!.id=response.userID.toString();
              this.user!.b2BCustomer_ID=response.b2BCustomer_ID.toString();
              this.user!.userType="B2B";
              this.sharedService.setLocalStore('user',"");
              this.sharedService.setLocalStore('affiliate_user',JSON.stringify(this.user));
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login success.' });
              window.location.reload();
            }
            else
            {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Not enough permission to continue. Please Try Again' });
            
            }
            
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
}
