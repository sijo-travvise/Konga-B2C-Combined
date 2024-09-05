import { Component, Input } from '@angular/core';
import { FlightService } from 'src/app/services/flight.service';
import { SharedService } from 'src/app/services/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-amadeus-itinerary-details-page',
  templateUrl: './amadeus-itinerary-details-page.component.html',
  styleUrls: ['./amadeus-itinerary-details-page.component.scss']
})
export class AmadeusItineraryDetailsPageComponent {
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
  @Input() paymentSuccess: boolean = false;
  @Input() flightTransactions_ID: any = null;

  constructor(public sharedService: SharedService, private service: FlightService) {

  }
  @Input() iteneraryData: any = null;
  ngOnInit() {

  }

  OnClickPayNow() {
    this.PaymentDetailsLoad();

    this.service.GetHash(this.amount, this.public_key, this.reference)
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

  PaymentDetailsLoad() {
    //Payment
    this.public_key = environment.publicKey;
    this.mode = environment.mode;
    this.hash = "";

    var priceArr = [];

    if (this.iteneraryData[0]?.fareInstallmentDetails?.isInstallmentApplied)
      priceArr = this.iteneraryData[0]?.fareInstallmentDetails?.initialDownPayment.toString()?.split('.');

    else if (this.iteneraryData[0]?.transactionDetails?.sellingPrice != null)
      priceArr = this.iteneraryData[0]?.transactionDetails?.sellingPrice?.toString()?.split('.');
    else
      priceArr = this.iteneraryData[0]?.flightOffers[0].price.grandTotal;
    
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

    //  Number( this.iteneraryData[0]?.fareInstallmentDetails?.isInstallmentApplied ?  this.iteneraryData[0]?.fareInstallmentDetails?.initialDownPayment : priceWithDecimal);  //1000 

    this.amount = Number(priceWithDecimal);  //1000
    this.description = "Konga Pay";
    this.email = this.iteneraryData[0]?.travelers[0]?.contact?.emailAddress ?? "";
    this.merchant_id = environment.merchantId;
    this.firstname = this.iteneraryData[0]?.travelers[0]?.name?.firstName ?? "";
    this.lastname = this.iteneraryData[0]?.travelers[0]?.name?.lastName ?? "";
    this.phone = this.iteneraryData[0]?.travelers[0]?.contact?.phones[0]?.number ?? "";
    let weburl = environment.webUrl;
    this.callback = weburl + "1A-flight-itinerary/" + this.flightTransactions_ID;
    this.customerId = this.iteneraryData[0]?.travelers[0]?.contact?.emailAddress ?? "";
    this.reference = this.iteneraryData[0]?.associatedRecords[0]?.reference ?? "";

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
  // ngOnChanges(changes: SimpleChanges): void {
  //   debugger;
  // }
}


