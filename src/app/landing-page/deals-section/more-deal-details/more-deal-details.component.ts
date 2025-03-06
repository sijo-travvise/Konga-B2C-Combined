import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { dealDataArray } from './dealsList.util';
import { MessageService } from 'primeng/api';
import { PackageService } from 'src/app/services/packages.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegExpValidators } from 'src/app/shared/validators';

@Component({
  selector: 'app-more-deal-details',
  templateUrl: './more-deal-details.component.html',
  styleUrls: ['./more-deal-details.component.scss'],
  providers: [MessageService],
})
export class MoreDealDetailsComponent {
  private routeParamsSubscription: Subscription;

  public dealDataArray = dealDataArray;
  currentDealData: any = [];
  isLoading: boolean = false;
  currentImageIndex = 0;
  currentImageUrl: string;
  PackageEnquiryForm: FormGroup;
  constructor(private route: ActivatedRoute, private router: Router, private packageService: PackageService, private messageService: MessageService, public form: FormBuilder) { }
  ngOnInit(): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Something went wrong!',
    });

    // const data = history.state.yourData;
    // debugger;
    this.routeParamsSubscription = this.route.params.subscribe(
      (params: Params) => {
        const id = params['deal-identity-Code'];
        if (id !== null && id !== undefined) {
          this.dealDataFetch(id);
          this.getPackageList(id);
        }
      }
    );

    this.buildForm();


  }

  dealDataFetch(DealCode: any) {
    let scrollToTop = window.setInterval(() => {
      window.scrollTo(0, 0); // how far to scroll on each step
      window.clearInterval(scrollToTop);
    }, 16);


  }

  getForm(controlName: string) {
    return this.PackageEnquiryForm.get(controlName) as FormControl<any>;
  }

  buildForm() {
    this.PackageEnquiryForm = this.form.group({
      enquiryPersonName: ['', [Validators.required, Validators.pattern(RegExpValidators.alphaLettersName), Validators.minLength(2)]],
      enquiryPersonEmailID: ['', [Validators.required, Validators.email]],
      enquiryPersonContactNo: ['', [Validators.required]],
      package_HTID: [''],
      packageName:[''],
      specialRequest: [''],
    });

  }


  getPackageList(DealCode: string) {
    this.isLoading = true;
    this.packageService.getPackageData(DealCode).subscribe({
      complete: () => { }, // completeHandler
      error: (error: any) => { this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch data. Please try again' }); this.isLoading = false; },    // errorHandler 
      next: (response: any) => {
        if (response.statusCode == 200) {
          this.currentDealData = response.data[0];
          this.preloadImages();
          this.rotateImages();

          setTimeout(() => {
            this.isLoading = false;
          }, 200);

        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch data. Please try again' });
          setTimeout(() => {
            this.isLoading = false;
            this.router.navigate(['/']);
          }, 200);

        
        }
      }
    });
  };

  preloadImages() {
    for (const image of this.currentDealData.packageImages) {
      const img = new Image();
      img.src = image.filePath;
    }

  }

  rotateImages() {
    let index = 0;
    this.currentImageUrl = this.currentDealData.packageImages[this.currentImageIndex].filePath;
    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.currentDealData.packageImages.length;

      this.currentImageUrl = this.currentDealData.packageImages[this.currentImageIndex].filePath;
    }, 4000); // Change background image every 10 seconds
  }

  submitEnqForm() {
    this.isLoading = true;
    this.getForm('package_HTID')?.patchValue(this.currentDealData?.package?.package_HTID ?? 0);
    this.getForm('packageName')?.patchValue(this.currentDealData?.package?.packageName ?? '');
    if (this.PackageEnquiryForm.valid) {
      this.PackageEnquiryForm.value.enquiryPersonContactNo = this.PackageEnquiryForm.value.enquiryPersonContactNo.e164Number;
      this.packageService.submitPackageEnquiry(this.PackageEnquiryForm?.value).subscribe({
        complete: () => { }, // completeHandler
        error: (error: any) => { this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to submit data. Please try again' }); this.isLoading = false; },    // errorHandler 
        next: (response: any) => {
          if (response.statusCode === 200) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Request sent Successfully.' });
            this.PackageEnquiryForm.reset();
            this.isLoading = false;
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to submit data. Please try again' });
            this.isLoading = false;
          }
        }
      });
    }
    else {
      this.PackageEnquiryForm.markAllAsTouched();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields!' });
      this.isLoading = false;
    }
  }

  ngOnDestroy(): void {
    //To avoid memory leaks
    this.routeParamsSubscription.unsubscribe();
  }
}
