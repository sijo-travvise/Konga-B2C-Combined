import { Component } from '@angular/core';

@Component({
  selector: 'app-card-details-section',
  templateUrl: './card-details-section.component.html',
  styleUrls: ['./card-details-section.component.scss']
})
export class CardDetailsSectionComponent {
  saveCarddetails: any[] = [
    { name: 'Save My Card Details', key: '1' },
    { name: 'I have read and accept the terms and conditions', key: '2' }
  ];
}
