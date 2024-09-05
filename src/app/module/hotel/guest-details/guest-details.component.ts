import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
interface SalutatioType {
  name: string;
  code: string;
}
@Component({
  selector: 'app-guest-details',
  templateUrl: './guest-details.component.html',
  styleUrls: ['./guest-details.component.scss']
})
export class GuestDetailsComponent {
  activeIndex: number = 0;
  i: number = 0;
  SalutationTypeArray: SalutatioType[];
  selectedSalutatioType: SalutatioType | any;
  checked2: boolean = true;
  constructor(private formBuilder: FormBuilder) {
    this.SalutationTypeArray = [
      { name: 'Mr', code: 'Mr' },
      { name: 'Mrs', code: 'Mrs' },
      { name: 'Ms', code: 'Ms' },
    ];
  }
  nextPassenger(tabindex: number) {
    this.activeIndex = tabindex;
    this.i = tabindex;
  }
}
