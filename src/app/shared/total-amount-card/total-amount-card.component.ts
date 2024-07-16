import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-total-amount-card',
  templateUrl: './total-amount-card.component.html',
  styleUrls: ['./total-amount-card.component.scss']
})
export class TotalAmountCardComponent {
  @Input() sectionTitle = "";
  @Input() sectionPgraph = " ";
  @Input() currancy = " ";
  @Input() totalAmount: number;

}
