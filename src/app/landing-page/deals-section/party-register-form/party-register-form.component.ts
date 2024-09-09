import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { single } from 'rxjs';
import { EmailDetailsModel } from 'src/app/Models/Mail/EmailDetailsModel';
import { FlightService } from 'src/app/services/flight.service';
import { RegExpValidators } from 'src/app/shared/validators';

@Component({
  selector: 'app-party-register-form',
  templateUrl: './party-register-form.component.html',
  styleUrls: ['./party-register-form.component.scss'],
  providers: [MessageService],
})
export class PartyRegisterFormComponent {


  packageType = [
    { name: 'Single', code: 'Single' },
    { name: 'Couples', code: 'Couples' },
    { name: 'Corporate', code: 'Corporate' },
    { name: 'Group', code: 'Group' },
    { name: 'Agent', code: 'Agent' },
  ]

  public custForm: FormGroup;
  public isLoading = false;
  @Output() closeModal: EventEmitter<string> = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private messageService: MessageService, private _flightService: FlightService) { }

  ngOnInit(): void {
    this.buildForm();
   // alert();
  }
  getControl(control: string) {
    return this.custForm.get(control) as FormControl<any>;
  }

  buildForm() {
    this.custForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(1), Validators.pattern(RegExpValidators.alphaLettersName)]],
      email: ["", [Validators.required, Validators.email]],
      mobileNumber: ['', Validators.required],
      packageType: ['', Validators.required],
    },
    );
  }


  onSubmit() {
    if (this.custForm.valid) {
      this.sendMail(this.custForm.value)
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields' });
      this.custForm.markAllAsTouched();
    }
  }


  sendMail(formValue: any) {

    let emailDetails: EmailDetailsModel = new EmailDetailsModel();
    this.isLoading = true;
    //.ToMailList = [{ Name: 'Adewale adekoya', MailId: "Adewale.adekoya@konga.com" }, {Name :'Abiola Bakare', MailId: 'abiola.bakare@konga.com'}, {Name :'Yusuf Babatunde', MailId: 'yusuf.babatunde@konga.com'}, {Name:'Joy Okorie', MailId:'joy.okorie@konga.com'},{ Name: 'Akeem Adeyemi', MailId: 'akeem.adeyemi@konga.com' }],
    emailDetails.ToMailList = [{ Name: 'Adewale adekoya', MailId: "junaidkp703@gmail.com" }],
    emailDetails.EmailSubject = "Independence Day Yacht Cruise!"
    emailDetails.IsPaymentSuccess = false;
    emailDetails.EmailContent =
      `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 20px;"><tr><td><table width="600" cellpadding="0" cellspacing="0" border="0" align="center" style="background-color: #ffffff; border: 1px solid #dddddd;"><tr><td style="background-color: #e7057e; color: #ffffff; padding: 20px; text-align: center;"><h1 style="margin: 0;"> Independence Day Yacht Cruise! </h1></td></tr><tr><td style="padding: 20px;"><table width="100%" cellpadding="5" cellspacing="0" border="0" style="background-color: #f9f9f9; border-collapse: collapse;"><tr><td style="border-bottom: 1px solid #dddddd; padding: 10px; font-weight: bold; color: #e7057e;">Name</td><td style="border-bottom: 1px solid #dddddd; padding: 10px; color: #333333;">` + formValue.name + `</td></tr><tr><td style="border-bottom: 1px solid #dddddd; padding: 10px; font-weight: bold; color: #e7057e;">Email</td><td style="border-bottom: 1px solid #dddddd; padding: 10px; color: #333333;">` + formValue.email + `</td></tr><tr><td style="border-bottom: 1px solid #dddddd; padding: 10px; font-weight: bold; color: #e7057e;">Mobile Number (WhatsApp)</td><td style="border-bottom: 1px solid #dddddd; padding: 10px; color: #333333;">` + formValue.mobileNumber.e164Number + `</td></tr><tr><td style="border-bottom: 1px solid #dddddd; padding: 10px; font-weight: bold; color: #e7057e;">Choose an option</td><td style="border-bottom: 1px solid #dddddd; padding: 10px; color: #333333;">` + formValue.packageType.code + `</td></tr></table></td></tr><tr><td style="background-color: #e7057e; color: #ffffff; padding: 10px; text-align: center;"><p style="margin: 0; font-size: 12px;">&copy; Konga Travel & Tours. All rights reserved.</p></td></tr></table></td></tr></table>`
      
    this._flightService.GenerateEmail(emailDetails)
      .pipe().subscribe({
        next: (data: any) => {
          this.isLoading = false;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form submitted successfully' });
          this.closeModal.emit('orgvisible');
        },
        error: (error: any) => {
          this.isLoading = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error to submit the form' });
        },
        complete: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form submitted successfully' });
          this.isLoading = false;
          this.closeModal.emit('orgvisible');
        }
      });
  }
}
