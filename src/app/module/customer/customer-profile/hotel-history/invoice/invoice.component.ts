import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
interface SalutatioType {
  name: string;
  code: string;
}
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent {
  SalutationTypeArray: SalutatioType[];
  constructor(private formBuilder: FormBuilder) {
    this.SalutationTypeArray = [
      { name: 'Mr', code: 'Mr' },
      { name: 'Mrs', code: 'Mrs' },
      { name: 'Ms', code: 'Ms' },
    ];
  }
}
