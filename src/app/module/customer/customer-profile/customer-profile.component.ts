import { style } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss'],
})
export class CustomerProfileComponent {
 
  activeIndex = 0;
  activeFilterIndex = 0;

}
