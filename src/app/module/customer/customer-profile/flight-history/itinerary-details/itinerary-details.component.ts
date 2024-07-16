import { Component, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AmadeusService } from 'src/app/services/amadeus.service';
import { FlightService } from 'src/app/services/flight.service';
import { MicroService } from 'src/app/services/micro.service';
import { SharedService } from 'src/app/services/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-itinerary-details',
  templateUrl: './itinerary-details.component.html',
  styleUrls: ['./itinerary-details.component.scss']
})
export class ItineraryDetailsComponent {
  items = [1, 2]

  public public_key: string = "";
  public mode: string = "";
  public hash: string = "";
  public amount: number = 1000;
  public description: string = "Konga Pay";
  public email: string = "";
  public merchant_id: string = "115477"//"konga224";
  public reference: string = "";
  public firstname: string = "";
  public lastname: string = "";
  public phone: string = "";
  public callback: string = "";
  public customerId: string = "";
  isLoading: boolean = false;
  @Input() paymentSuccess: boolean = false;

  constructor(public sharedService: SharedService, private _flightService: FlightService,  public _microService: MicroService, private messageService: MessageService) {

  }
  @Input() bookingDetailsData: any = null;
  @Input() pnrRetrieveRes: any = null;
  ngOnInit() {
  
  }

  OnClickPayNow() {
    this.PaymentDetailsLoad();

    this._flightService.GetHash(this.amount, this.public_key, this.reference)
      .subscribe(
        (res2: any) => {
          if (res2.statusCode == 200 && res2.result != null && res2.result != undefined) {

            this.hash = res2.result.hashKey;
            this.reference = res2.result.uniqueReference;
            (<HTMLInputElement>document.getElementById('hash')).value = this.hash;
            (<HTMLInputElement>document.getElementById('reference')).value = this.reference;
            (<HTMLInputElement>document.getElementById('amount')).value = this.amount.toString();
            let element = document.getElementById('paymentCallButton') as HTMLElement;
            element.click();
          }
          else {
            //this.toastr.error("Something Went Wrong !");
          }

        },
        (error: any) => {
          //this.toastr.error("Something Went Wrong !");
        });
  }



  issueTicket() {
    this.isLoading = true;
    let issueTicketBody = {
      "SupplierId":  this.pnrRetrieveRes?.SupplierID,
      "PNRNumber":  this.pnrRetrieveRes?.PNRNumber,
      "BookingID":  this.bookingDetailsData?.FlightTransactions[0]?.FlightTransactions_ID,
      "URN": this.pnrRetrieveRes?.PNRNumber,
      "CommissionPercentage": "string",
      "SupplierConfirmationNumber": "string"
    }
    this._flightService.createIssueTicket(issueTicketBody).subscribe({
      complete: () => { },
      error: (error: any) => { this.isLoading = false; },
      next: (data: any) => {
        if (data?.Error !== null) {
          this.isLoading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went wrong!. Please Try Again',
          });
        }
        else {
          this.isLoading = false;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Ticket issued successfully!' });
        }
      },
    });
  }



  
  PaymentDetailsLoad() {
    //Payment
    this.public_key = environment.publicKey;
    this.mode = environment.mode;
    this.hash = "";

    var priceArr = [];

    if (this.bookingDetailsData?.fareInstallmentDetails?.isInstallmentApplied){
      priceArr = this.bookingDetailsData?.fareInstallmentDetails?.initialDownPayment.toString()?.split('.');
    }
    else if (this.bookingDetailsData?.FlightTransactions[0]?.sellingPrice != null){
      priceArr = this.bookingDetailsData?.FlightTransactions[0]?.sellingPrice?.toString()?.split('.');
    }
    else{
      
      priceArr = this.bookingDetailsData?.FlightTransactions[0]?.TotalFare?.toString()?.split('.');;
    }
      
    
    var priceWithDecimal;

    if (priceArr.length == 1)
      priceWithDecimal = priceArr[0] + "00";
    else {
      if (priceArr[1].length == 1) {
        priceWithDecimal = priceArr[0] + priceArr[1] + "0";
      }
      else {
        priceWithDecimal = priceArr[0] + priceArr[1];
      }

    }

    //  Number( this.bookingDetailsData[0]?.fareInstallmentDetails?.isInstallmentApplied ?  this.bookingDetailsData[0]?.fareInstallmentDetails?.initialDownPayment : priceWithDecimal);  //1000 

    this.amount = Number(priceWithDecimal);  //1000
    this.description = "Konga Pay";
    this.email = this.bookingDetailsData[0]?.FlightTransactionDetails[0]?.Email ?? "";
    this.merchant_id = environment.merchantId;
    this.firstname = this.bookingDetailsData[0]?.FlightTransactionDetails[0]?.FirstName ?? "";
    this.lastname = this.bookingDetailsData[0]?.FlightTransactionDetails[0]?.LastName ?? "";
    this.phone = this.bookingDetailsData[0]?.FlightTransactionDetails[0]?.PhoneNumber ?? "";
    let weburl = environment.webUrl;
    this.callback = weburl + "flight-itinerary";
    this.customerId = this.bookingDetailsData[0]?.FlightTransactions[0]?.CustomerProfile_ID?? "";
    this.reference = this.bookingDetailsData[0]?.FlightTransactions[0]?.AirlinePNR ?? "";

  }

  parseDuration(duration: string): number {
    const pattern = /PT(\d+)H(\d+)M/;
    const matches = duration.match(pattern);

    if (matches && matches.length === 3) {
      const hours = parseInt(matches[1]);
      const minutes = parseInt(matches[2]);
      return hours * 60 + minutes;
    }

    return 0; // Return 0 if parsing fails
  }


  totalDuration(itineraryData: any) {
    let totalMinutes = 0;
    itineraryData?.segments?.forEach((segments: any) => {
      totalMinutes += this.parseDuration(segments?.duration);
    });

    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

    // console.log(`Total Duration: ${totalHours} hours and ${remainingMinutes} minutes`);
    return (` ${totalHours} hr ${remainingMinutes} min`)

  }
  ngOnChanges(changes: SimpleChanges): void {
   if(changes['pnrRetrieveRes']?.currentValue !== null && changes['pnrRetrieveRes']?.currentValue !== undefined) {
  console.log(  this.pnrRetrieveRes);
   }
   
  }
}


