import { Component, Input } from '@angular/core';
import {animate,style,transition,trigger,state} from "@angular/animations";

@Component({
  selector: 'app-flight-history',
  templateUrl: './flight-history.component.html',
  styleUrls: ['./flight-history.component.scss'],
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
export class FlightHistoryComponent {
  activeIndex=0;
  bookingDetailsTab: string;
  @Input() flightHistoryDataList: Array<any> = [];
  public AllFlightDetails:any;
  public isLoading: boolean = false;
  public prevUrpnr : string = '';
  ngOnInit() {
    this.bookingDetailsTab = 'out';
  }
  toggleAccordion(FlightTransactions_ID: string = '0', Transaction: any): void {
    this.isLoading = true;
    if (FlightTransactions_ID === this.bookingDetailsTab) {
      this.bookingDetailsTab = '0'; // Close the tab if it's already open
      return;
      this.isLoading = false;
    }
  
    this.bookingDetailsTab = FlightTransactions_ID; // Open the tab
  
    // If the selected URPNR is different from the previous one, retrieve data
    if (FlightTransactions_ID !== this.prevUrpnr) {
      this.sendData(Transaction);
    }
    setTimeout(() => {
      const accordionElement = document.getElementById(`accordion-${FlightTransactions_ID}`);
      if (accordionElement) {
        accordionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  }
  parseJSON(jsonString: string): any {
    try {
        const parsedData = JSON.parse(jsonString);
        return parsedData;
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return null;
    }
}
  parseJSONHeader(jsonString: string): any {
    try {
        const parsedData = JSON.parse(jsonString)[0];
        return parsedData;
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return null;
    }
  }
  getStatusDescription(status: number): string {
    switch (status) {
        case 1:
            return "Pending";
        case 2:
            return "Confirmed";
        case 3:
            return "Cancelled";
        case 4:
            return "Void";
        case 5:
            return "Refunded";
        case 6:
            return "ReIssued";
        case 7:
            return "Failed";
        default:
            return "Unknown";
    }
  }
  sendData(Transaction: any) {
    // this.prevUrpnr = this.parseJSONHeader(Transaction?.flightTransactions_JSON).flightTransactions_ID;
    this.AllFlightDetails = {
      segments: this.parseJSON(Transaction.flightTransactionsSegmentDetails_JSON),
      header: this.parseJSONHeader(Transaction.flightTransactions_JSON),
      passenger: this.parseJSON(Transaction.flightTransactionsDetails_JSON),
      payment:this.parseJSON(Transaction.flightTransactionsPaymentGateway_JSON)
    };
    
    //console.log('AllFlightDetails', this.AllFlightDetails);
    this.isLoading = false;
  }
}
