import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EmailDetailsModel } from 'src/app/Models/Mail/EmailDetailsModel';
import { FlightService } from 'src/app/services/flight.service';
import { SharedService } from 'src/app/services/shared.service';
import { RegExpValidators } from 'src/app/shared/validators';

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.scss'],
  providers: [SharedService, MessageService],
})
export class OrganizationFormComponent implements OnInit {
  public countryOptionList: any = [];
  public isLoading = false;
  @Output() closeModal: EventEmitter<string> = new EventEmitter();

  constructor(public sharedService: SharedService, private formBuilder: FormBuilder, private messageService: MessageService, private _flightService: FlightService) { }

  industryType = [
    { name: 'Finance', code: 'Finance' },
    { name: 'Health', code: 'Health' },
    { name: 'Government', code: 'Government' },
    { name: 'Travel', code: 'Travel' },
    { name: 'Technology', code: 'Technology' },
    { name: 'Construction', code: 'Construction' },
    { name: 'Technology', code: 'Technology' },
    { name: 'Others', code: 'Others' },
  ]
  packageType = [
    { name: 'Single', code: 'Single' },
    { name: 'Couples', code: 'Couples' },
    { name: 'Corporate', code: 'Corporate' },
    { name: 'Group', code: 'Group' },
    { name: 'Agent', code: 'Agent' },
  ]

  public orgForm: FormGroup;

  ngOnInit(): void {
    this.getCountryData();
    this.buildForm();
  }

  getCountryData() {
    this.sharedService.getAllCountry().subscribe((res) => {
      this.countryOptionList = res;
    });
  }
  getControl(control: string) {
    return this.orgForm.get(control) as FormControl<any>;
  }

  buildForm() {
    this.orgForm = this.formBuilder.group({
      companyName: ["", [Validators.required, Validators.minLength(1), Validators.pattern(RegExpValidators.alphaNumeric)]],
      industry: ['', [Validators.required]],
      country: ['', Validators.required],
      state: ['', Validators.required],

      email: ["", [Validators.required, Validators.email]],
      mobileNumber: ['', Validators.required],
      personalEmail: ['', Validators.required],
      personalPhone: ['', Validators.required],
      address: ['', Validators.required],
    },
    );
  }
  onSubmit() {
    if (this.orgForm.valid) {
      this.sendMail(this.orgForm.value)
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields' });

      this.orgForm.markAllAsTouched();
    }
  }

  sendMail(formValue: any) {

    let emailDetails: EmailDetailsModel = new EmailDetailsModel();
    this.isLoading = true;
    emailDetails.ToMailList = [{ Name: 'corporate travel', MailId: 'corporatetravel@konga.com' }, {Name :'Abiola Bakare', MailId: 'abiola.bakare@konga.com'}, {Name :'Yusuf Babatunde', MailId: 'yusuf.babatunde@konga.com'}, {Name:'Joy Okorie', MailId:'joy.okorie@konga.com'},{ Name: 'Akeem Adeyemi', MailId: 'akeem.adeyemi@konga.com' }],
    emailDetails.EmailSubject = "Register Your Organization"
    emailDetails.IsPaymentSuccess = false;
    emailDetails.EmailContent =

      `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 20px;"><tr><td><table width="600" cellpadding="0" cellspacing="0" border="0" align="center" style="background-color: #ffffff; border: 1px solid #dddddd;"><tr><td style="background-color: #e7057e; color: #ffffff; padding: 20px; text-align: center;"><h1 style="margin: 0;">Register Your Organization</h1></td></tr><tr><td style="padding: 20px;"><table width="100%" cellpadding="5" cellspacing="0" border="0" style="background-color: #f9f9f9; border-collapse: collapse;"><tr><td style="border-bottom: 1px solid #dddddd; padding: 10px; font-weight: bold; color: #e7057e;">Company Name</td><td style="border-bottom: 1px solid #dddddd; padding: 10px; color: #333333;">` + formValue.companyName + `</td></tr><tr><td style="border-bottom: 1px solid #dddddd; padding: 10px; font-weight: bold; color: #e7057e;">Industry Type</td><td style="border-bottom: 1px solid #dddddd; padding: 10px; color: #333333;">` + formValue.industry.code + `</td></tr><tr><td style="border-bottom: 1px solid #dddddd; padding: 10px; font-weight: bold; color: #e7057e;">Country</td><td style="border-bottom: 1px solid #dddddd; padding: 10px; color: #333333;">` + formValue.country.name + `</td></tr><tr><td style="border-bottom: 1px solid #dddddd; padding: 10px; font-weight: bold; color: #e7057e;">State</td><td style="border-bottom: 1px solid #dddddd; padding: 10px; color: #333333;">` + formValue.state + `</td></tr><tr><td style="border-bottom: 1px solid #dddddd; padding: 10px; font-weight: bold; color: #e7057e;">Email</td><td style="border-bottom: 1px solid #dddddd; padding: 10px; color: #333333;">` + formValue.email + `</td></tr><tr><td style="border-bottom: 1px solid #dddddd; padding: 10px; font-weight: bold; color: #e7057e;">Mobile Number</td><td style="border-bottom: 1px solid #dddddd; padding: 10px; color: #333333;">` + formValue.personalPhone.e164Number + `</td></tr><tr><td style="border-bottom: 1px solid #dddddd; padding: 10px; font-weight: bold; color: #e7057e;">Contact Person Email Address*</td><td style="border-bottom: 1px solid #dddddd; padding: 10px; color: #333333;">` + formValue.personalEmail + `</td></tr><tr><td style="border-bottom: 1px solid #dddddd; padding: 10px; font-weight: bold; color: #e7057e;">Contact Person Phone number</td><td style="border-bottom: 1px solid #dddddd; padding: 10px; color: #333333;">` + formValue.personalPhone.e164Number + `</td></tr><tr><td style="border-bottom: 1px solid #dddddd; padding: 10px; font-weight: bold; color: #e7057e;">Full Address</td><td style="border-bottom: 1px solid #dddddd; padding: 10px; color: #333333;">` + formValue.address + `</td></tr></table></td></tr><tr><td style="background-color: #e7057e; color: #ffffff; padding: 10px; text-align: center;"><p style="margin: 0; font-size: 12px;">&copy;  Konga Travel & Tours. All rights reserved.</p></td></tr></table></td></tr></table>`

    this._flightService.GenerateEmail(emailDetails).subscribe({
        next: (data: any) => {
          this.isLoading = false;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form submitted successfully' });
        },
        error: (error: any) => {
          this.isLoading = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error to submit the form' });
        },
        complete: () => {
          this.isLoading = false;
          this.closeModal.emit('regvisible');
        }
      });
  }
}
