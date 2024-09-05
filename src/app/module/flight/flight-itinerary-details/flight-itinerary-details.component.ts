import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FlightService } from 'src/app/services/flight.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-flight-itinerary-details',
  template: `
  <div class="container my-5" style="max-width: 1200px;" > <app-itinerary-details [pnrRetrieveRes]='pnrRetrieveRes' [bookingDetailsData]='bookingDetailsData' [paymentSuccess]='paymentSuccess' [flightTransactions_ID]='flightTransactions_ID' [flightTransactions_ID]='flightTransactions_ID'></app-itinerary-details>  <app-pre-loader *ngIf="isLoading" [isLoadingComplete]=isLoading
  [loderTitle]="'we are fetching booking details'"></app-pre-loader></div>
  `,
  providers: [SharedService, MessageService, FlightService],
})
export class FlightItineraryDetailsComponent implements OnInit {
  universalLocatorCode: any = null;
  merchant_reference: any = null;
  isLoading: boolean = false;
  isCompleted: boolean = false;
  public flightIteneraryData: any = null;
  public paymentSuccess:boolean=undefined;
  public bookingDetailsData: any;


  flightTransactions_ID: Array<string> = [];
  pnrRetrieveRes: any;
 constructor( private route: ActivatedRoute, private messageService: MessageService, private _flightService: FlightService, private sharedService: SharedService){
  this.route.paramMap.subscribe((params: any) => {
    this.flightTransactions_ID = params.get('pnr');
  });
  if (this.flightTransactions_ID !== null && this.flightTransactions_ID?.length)  {
    // this.getBookingDetails(this.flightTransactions_ID);
    this.retrievePNR(this.flightTransactions_ID);
  }

 }

  ngOnInit() {
    // this.route.paramMap.subscribe(params => {
    //   this.universalLocatorCode = params.get('locatorCode');
    //   this.merchant_reference = this.route?.snapshot?.queryParamMap?.get("merchant_reference");
    // });
    // if (this.universalLocatorCode != null) {
    //   var paymentStatus = this.route.snapshot.queryParamMap.get("status");
    //   this.itineraryDetails(paymentStatus);
    // }
    // else if(this.merchant_reference !=null)
    // {
    //   this.universalLocatorCode=this.merchant_reference
    //   var paymentStatus = this.route.snapshot.queryParamMap.get("status");
    //   this.itineraryDetails(paymentStatus);
    // }
    // else{
    //   var paymentStatus = this.route.snapshot.queryParamMap.get("status");
    //   if (paymentStatus == "success") {
    //     this.paymentSuccess = true;
    //   }
    //   else if(paymentStatus=="failed"){
    //     this.paymentSuccess = false;
    //   }
    //   var flightorderResponse = this.sharedService.getLocalStore('bookingOrderData');
    //   this.flightIteneraryData = [flightorderResponse?.data];
    // }
  }

  getBookingDetails(flightTransactions_ID: string) {
    this.isLoading = true;
    this._flightService.getBookingDetails(flightTransactions_ID).subscribe({
      complete: () => { },
      error: (error: any) => { this.isLoading = false; },
      next: (data: any) => {
        if (data !== null && data !== undefined) {
          this.bookingDetailsData = data;

          // this.getCustomerProfileData(data?.FlightTransactions[0]?.CustomerProfile_ID)
          this.isLoading = false;
       
        }
        else {
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Oops...',
          // }).then(function () {
          //   window.location.href = "/";
          // })
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went wrong!. Please Try Again',
          });
          this.isLoading = false;
        }
      },
    });
  }


  retrievePNR(bookingData: any): void {
    this.isLoading = true;
    this.isCompleted = true;
    const idArray = bookingData.split('-');
    const retrivePNRObj = {
      SupplierId: idArray[1],
      PNRNumber:  idArray[0]
    }
    this._flightService.retrieveAirArabiaPNR(retrivePNRObj).subscribe({
      complete: () => { this.isLoading = false; },
      error: (error: any) => { this.isLoading = false; },
      next: (data: any) => {
        if (data) {
          // console.log(this.countryOptionList,"here we go");
          this.pnrRetrieveRes = data;
          this.pnrRetrieveRes?.Trips?.forEach((trips: any, tripIndex: number) =>{
      
            //  trips['vendorName'] = this.getAirlineName(trips?.ValidatingAirline);
            // trips?.FlightSegments?.map((segments: any) => segments['vendorName'] = this.getAirlineName(segments?.MarketingAirline));
          });
          // (this.airlinesListData?.find((airline: any) => airline?.vendorCode === tripAirlineKey.split(',')[0]?.trim()))?.vendorName ?? '';
          // this.isLoading = false;
          // this.isCompleted = false;
          this.getBookingDetails(data?.AirlinePNR ?? '');

       
        }
        else {
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Oops...',
          // }).then(function () {
          //   window.location.href = "/";
          // })
          this.isLoading = false;
          this.isCompleted = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went wrong!. Please Try Again',
          });
        }
      },
    });
  }


  getBaggageData(data: any){
    // data[0]?.travelers?.forEach((traveler_i: any  )=> {
    //    let baggage: string= '0 KG';
    //   data[0]?.flightOffers[0].travelerPricings?.forEach((travelerprice_i: any) => {
    //     if(traveler_i.id === travelerprice_i.travelerId){
    //        baggage= travelerprice_i.fareDetailsBySegment[0].includedCheckedBags?.quantity !== undefined? travelerprice_i.fareDetailsBySegment[0].includedCheckedBags.quantity +" PC" : travelerprice_i.fareDetailsBySegment[0].includedCheckedBags.weight+" KG";
    //     }
    //   });
    //   traveler_i['baggage'] = baggage;
    // });
  }

  // itineraryDetails(paymentStatus:any) {
  //   this.isLoading = true;
  //   this._flightService.flightItenararyDetails(this.universalLocatorCode,paymentStatus)
  //     .subscribe({
  //       complete: () => {  this.isLoading = false;}, // completeHandler
  //       error: (error: any) => {
  //         this.isLoading = false;
  //         this.messageService.add({
  //           severity: 'error',
  //           summary: 'Error',
  //           detail: 'Something went wrong!',
  //         });
  //         this.isLoading = false;
  //       }, // errorHandler
  //       next: (response: any) => {
  //         if (response?.data != null) {
           
  //           // this.getBaggageData(response?.data);
  //           this.isLoading = false;
  //           this.flightIteneraryData = response?.data;

  //           console.log( this.flightIteneraryData);
            
              
  //         }
  //         else{
  //           this.messageService.add({
  //             severity: 'error',
  //             summary: 'Error',
  //             detail: 'Something went wrong!',
  //           });
  //           this.isLoading = false;
  //         }
  //       }

  //     });
  // }

}
