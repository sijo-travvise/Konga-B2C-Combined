import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FlightService } from 'src/app/services/flight.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-amadeus-itinerary-details',
  template: `
  <div class="container my-5" style="max-width: 1200px;" > <app-amadeus-itinerary-details-page [iteneraryData]='flightIteneraryData' [paymentSuccess]='paymentSuccess' [flightTransactions_ID] ='universalLocatorCode' ></app-amadeus-itinerary-details-page>  <app-pre-loader *ngIf="isLoading" [isLoadingComplete]=isLoading
  [loderTitle]="'we are fetching booking details'"></app-pre-loader></div>
  `,
  providers: [SharedService, MessageService, FlightService],
})
export class AmadeusItineraryDetailsComponent implements OnInit {
  universalLocatorCode: any = null;
  merchant_reference: any = null;
  isLoading: boolean = false;
  public flightIteneraryData: any = null;
  public paymentSuccess:boolean=undefined;
 constructor( private route: ActivatedRoute, private messageService: MessageService, private _flightService: FlightService, private sharedService: SharedService){}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.universalLocatorCode = params.get('locatorCode');
      this.merchant_reference = this.route?.snapshot?.queryParamMap?.get("merchant_reference");
    });
    if (this.universalLocatorCode != null) {
      var paymentStatus = this.route.snapshot.queryParamMap.get("status");
      this.itineraryDetails(paymentStatus);
    }
    else if(this.merchant_reference !=null)
    {
      this.universalLocatorCode=this.merchant_reference
      var paymentStatus = this.route.snapshot.queryParamMap.get("status");
      this.itineraryDetails(paymentStatus);
    }
    else{
      var paymentStatus = this.route.snapshot.queryParamMap.get("status");
      if (paymentStatus == "success") {
        this.paymentSuccess = true;
      }
      else if(paymentStatus=="failed"){
        this.paymentSuccess = false;
      }
      var flightorderResponse = this.sharedService.getLocalStore('bookingOrderData');
      this.flightIteneraryData = [flightorderResponse?.data];
    }
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

  itineraryDetails(paymentStatus:any) {
    this.isLoading = true;
    this._flightService.flightItenararyDetails(this.universalLocatorCode,paymentStatus)
      .subscribe({
        complete: () => {  this.isLoading = false;}, // completeHandler
        error: (error: any) => {
          this.isLoading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went wrong!',
          });
          this.isLoading = false;
        }, // errorHandler
        next: (response: any) => {
          if (response?.data != null) {
           
            // this.getBaggageData(response?.data);
            this.isLoading = false;
            this.flightIteneraryData = response?.data;  
          }
          else{
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Something went wrong!',
            });
            this.isLoading = false;
          }
        }

      });
  }

}

