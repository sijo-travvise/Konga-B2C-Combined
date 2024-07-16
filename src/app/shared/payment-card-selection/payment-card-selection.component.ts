import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
interface LPOArrayID {
  value: string;
  name: string;
} 
@Component({
  selector: 'app-payment-card-selection',
  templateUrl: './payment-card-selection.component.html',
  styleUrls: ['./payment-card-selection.component.scss'],
})
export class PaymentCardSelectionComponent {
  selectedValue: string;
  activeIndex = 0;
  RadioList:LPOArrayID[] = [
    {value: 'Before Ticketing', name: 'Before Ticketing'},
    {value: 'After Ticketing', name: 'After Ticketing'},
  ];
  // get mail(){ 
  //   return this.ContractForm.get('mail') as FormControl<any>;
  // }
  // ngOnInit() {
  //   if (this.activeIndex == 0) {
  //     debugger;
  //     this.selectedValue = 'val1';
  //   } else if (this.activeIndex == 1) {
  //     debugger;
  //     this.selectedValue = 'val2';
  //   } else if (this.activeIndex == 2) {
  //     debugger;
  //     this.selectedValue = 'val3';
  //   } else if (this.activeIndex == 3) {
  //     debugger;
  //     this.selectedValue = 'val4';
  //   }
  // }
 

}
