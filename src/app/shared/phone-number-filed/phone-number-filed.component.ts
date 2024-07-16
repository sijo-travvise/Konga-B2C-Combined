import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { SearchCountryField,CountryISO,} from 'ngx-intl-tel-input';

@Component({
  selector: 'app-phone-number-filed',
  templateUrl: './phone-number-filed.component.html',
  styleUrls: ['./phone-number-filed.component.scss']
})
export class PhoneNumberFiledComponent {
  @Input() title: string = "";
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Nigeria];
  phoneForm = new FormGroup({
    phone: new FormControl('', [Validators.required]),
  });

  @Input() formControls: FormControl = new FormControl("");
  @Input() formControlNames:FormControlName;

  ngOnInit(): void {
    this.phoneForm.patchValue({
      
    });
  }

  
}
