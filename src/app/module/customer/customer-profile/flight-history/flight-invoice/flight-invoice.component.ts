import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-flight-invoice',
  templateUrl: './flight-invoice.component.html',
  styleUrls: ['./flight-invoice.component.scss']
})
export class FlightInvoiceComponent implements OnInit {
  items=[1,2]
  @Input()  iteneraryData: any = null;
  ngOnInit() {

  }
}
