import { Component } from '@angular/core';
import {animate,style,transition,trigger,state} from "@angular/animations";
@Component({
  selector: 'app-hotel-history',
  templateUrl: './hotel-history.component.html',
  styleUrls: ['./hotel-history.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        overflow: 'hidden',
        height: '*'
      })),
      state('out', style({
        opacity: '0',
        overflow: 'hidden',
        height: '0px'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ])
  ]
})
export class HotelHistoryComponent {
  activeIndex=0;
  bookingDetailsTab: string;

  ngOnInit() {
    this.bookingDetailsTab = 'out';
  }
  toggleAccordion(): void {
    this.bookingDetailsTab = this.bookingDetailsTab === 'out' ? 'in' : 'out';
  }
}
