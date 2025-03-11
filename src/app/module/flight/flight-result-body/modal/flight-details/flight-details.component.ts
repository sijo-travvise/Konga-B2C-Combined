import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AmadeusService } from 'src/app/services/amadeus.service';
import { SharedService } from 'src/app/services/shared.service';

import { FlightUpsellReqData } from 'src/app/Models/flight/Amadeus/flight-upsell-model';
import { FlightService } from 'src/app/services/flight.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { CarouselComponent, OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { MicroService } from 'src/app/services/micro.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss'],
  providers: [SharedService, FlightService, MessageService]
})
export class FlightDetailsComponent implements AfterViewInit {

  flight__deprtdate = '12 December 2022';
  flight__from = 'DOHA';
  flight__to = 'Madrid';
  flight__totalDuration = '02 hr 30 min';
  @Input() BookedFlightData: any;
  @Input() airlineList: any;
  @Input() tripTye: any = 'oneWay';
  @Output() emiInstallments: EventEmitter<any> = new EventEmitter();

  public isLoading: boolean = true;
  public fare_PriceUpsell_Res: any;
  adult_count: number = 1;
  child_count: number = 1;
  infant_count: number = 1;
  adult_count_Result: number = 0;
  child_count_Result: number = 0;
  infant_count_Result: number = 0;
  public exchangeRate: number;
  public selectedFlightIndex: number = 0;
  public selectedFare: any;
  public isBookingFooterConsole: boolean = false;

  affiliated_user:any;
  affiliate_user_permission:any;
  revalidateObj: any = null;
  currrentUser: any;
  flexiPrice: number = 0;
  matchingFlexiFareDetails: any[];
  constructor(private router: Router,
              public sharedService: SharedService,
              public _flightService: FlightService,
              private cdr: ChangeDetectorRef,
              private messageService: MessageService,
              private primengConfig: PrimeNGConfig,
              private _authenticationService: AuthenticationService,
              public _microService: MicroService) {

                this.currrentUser = this._authenticationService.affliateUser;
                

               }



  // private Fare_PriceUpsellWithoutPNR: Fare_PriceUpsellWithoutPNR = new Fare_PriceUpsellWithoutPNR();
  // private Fare_PriceUpsellWithoutPNRUIModel: Fare_PriceUpsellWithoutPNRUIModel = new Fare_PriceUpsellWithoutPNRUIModel();
  // public totalPriceSelected = "";
  // public selectedMarkupIndex = "";
  // public fare_GetFareFamilyDescription: Fare_GetFareFamilyDescription = new Fare_GetFareFamilyDescription();
  // public fare_GetFareFamilyDescription_Res_ow: any;
  // public fare_GetFareFamilyDescription_Res_re: any;
  // public selectedCurrency: string = 'QAR';

  // public selectedFareList:any;


  // passengerDetails(bookedFlightData: any) {
  //   let BookingDetails ={
  //     selectedFare: this.selectedFareList,
  //     adultCount  : this.adult_count_Result,
  //     childCount: this.child_count_Result,
  //     infantCount: this.infant_count_Result,
  //     flightDetails: bookedFlightData,
  //    }
  //    this.sharedService.setLocalStore("flightResData", BookingDetails);
  //   this.router.navigateByUrl('/Passenger_Details', { state: BookingDetails });
  // }

  public customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 400,
    // autoplay:true,
    // autoplayHoverPause:true,
    slideBy:4,
    slideTransition: 'linear',
    smartSpeed: 1000,
    autoplayTimeout:4000,
    margin: 20,
    autoHeight : true,
    navText: [
      '<i class="pi pi-angle-left"><i/>',
      '<i class="pi pi-angle-right"><i/>',
    ],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true,
    
  }

  activeSlides: SlidesOutputData;


  public flightUpsellReqData = FlightUpsellReqData;
  ngOnInit() {    
    console.log(this.BookedFlightData,'line 131');
    
    if(this.sharedService.getLocalStore('affiliate_user')!='' && this.sharedService.getLocalStore('affiliate_user')!=undefined)
    {
      debugger
      this.affiliated_user =  JSON.parse(this.sharedService.getLocalStore('affiliate_user'));;
      this.affiliate_user_permission = this.affiliated_user?.permissions.filter((item: { moduleName: string; })=>item.moduleName=="AIR SERVICES")[0];
    }
    
    this.getFareUpsellData(this.BookedFlightData);
    this.selectedFare = this.BookedFlightData;
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
    this.isLoading = true;
    
    if(this.BookedFlightData && this.BookedFlightData.Trips[0].SupplierName == "Amadeus") {
      this._authenticationService.affliateUser
      this.revalidateObj = {
        SelectedTripFareKeys: [
          {RevalidateKey: this.BookedFlightData.FSC}
        ],
      };
      this.revalidateObj["CustomerProfileId"]= this.currrentUser.customerProfile_ID;
      this.getAirArabiaFlex()

    }else {
      this.isBookingFooterConsole = true;
      this.isLoading = false;
    }
  }

  fareActiveFunction(itineraries: any, activeIndex: number = 0) {
  //  itineraries['activeId'] = activeIndex;
  }

  getUpsellPriceData() {
    // this.isLoading = true;
    // if(this.affiliated_user!=undefined)
    // {
    //   this.flightUpsellReqData.userid=String(this.affiliated_user.id);
    //   this.flightUpsellReqData.b2BCustomer_ID=this.affiliated_user.b2BCustomer_ID==undefined?'0':this.affiliated_user.b2BCustomer_ID;
    //   this.flightUpsellReqData.userType=this.affiliated_user.userType==undefined?'':this.affiliated_user.userType;
    // }
    // this._flightService.FlightUpsellData(this.flightUpsellReqData).subscribe({
    //   complete: () => { }, // completeHandler
    //   error: (error: any) => { this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error Fetching Flight Data. Please Try Again' }); this.isLoading = false },    // errorHandler 
    //   next: (data: any) => {
    //     if (data !== null && data !== undefined) {
    //       // console.log(data);
    //       this.fare_PriceUpsell_Res = data;
    //       this.isLoading = false;
    //       this.fare_PriceUpsell_Res?.data.forEach((itinerariesList: any, index: number) => {
    //         // [0]?.travelerPricings[0]?.fareDetailsBySegment
    //       // this.fareActiveFunction(itineraries, 0);
    //         // console.log(itineraries);

    //         itinerariesList['installmentAmount'] = this.sharedService.getInstallmentAmount(itinerariesList?.price?.grandTotal ?? 0, 20);
    //         itinerariesList['isInstallmentApplicable'] = this.sharedService.getInstallationDateDuration(itinerariesList?.itineraries[0].segments[0]?.departure.at) ?? false;
    //         console.log(itinerariesList);
            
    //         if(index === 0){
    //           this.selectedFare = itinerariesList;
    //         }
    //         itinerariesList['activeId'] = itinerariesList?.itineraries[0]?.segments[0]?.id;
    //       });
    //       console.log( this.fare_PriceUpsell_Res);
          
    //     }
    //     else {
    //       this.isLoading = false;
    //     }
    //   }
    // });
  }



  getFareUpsellData(fareData: any) {
    // if (fareData !== undefined && fareData !== null) {
    //   let flightDetailsObj = this.flightUpsellReqData.data.flightOffers[0];
    //   this.flightUpsellReqData.data.flightOffers.length = 0;
    //   this.flightUpsellReqData.data.payments = [
    //     {
    //       brand: "VISA_IXARIS",
    //       binNumber: 123456,
    //       flightOfferIds: [this.BookedFlightData?.id]
    //     }
    //   ];
    //   let upsellPrice = JSON.parse(JSON.stringify(this.BookedFlightData));
    //   upsellPrice?.itineraries?.map((itinerary: any) => {
    //     itinerary.duration = this.sharedService.convertTimeDuration(itinerary.duration)
    //     itinerary?.segments.map((segment: any) => {
    //       segment.duration =  this.sharedService.convertTimeDuration(segment.duration, true)
    //     });
    //   });
    //   this.flightUpsellReqData.data.flightOffers.push(upsellPrice);
      // if (upsellPrice?.travelerPricings[0]?.fareDetailsBySegment[0]?.brandedFare !== undefined && upsellPrice?.travelerPricings[0]?.fareDetailsBySegment[0]?.brandedFare !== null) {
      //   this.getUpsellPriceData();
      // }
      // else {
      //    this.isBookingFooterConsole = true; 
      // }

    // }
  }

  OnClickBookNow(fare:any){
    // fare['fareRules'] = this.BookedFlightData?.fareRules;
    if(this.isBookingFooterConsole) {
      let selectedFareDetails = {
        FSC: this.BookedFlightData.FSC
      }
      localStorage.removeItem('fareFamily');
      this.sharedService.setLocalStore("airPricePointSelected", selectedFareDetails );
      this.router.navigateByUrl('/passenger-details');
    }else {
      let selectedFareDetails= {
        supplier: this.BookedFlightData.Trips[0].SupplierName,
        selectedFare: fare,
        boundType: this.BookedFlightData.Trips[0].BoundType,
        FSC: this.BookedFlightData.FSC
      }
      localStorage.removeItem('airPricePointSelected');
      this.sharedService.setLocalStore("fareFamily", selectedFareDetails );
      this.router.navigateByUrl('/passenger-details');
    }

    
   
  }

  
  startDragging(event){
    // console.log(event);
  }

  getPassedData(data: any,fareData: any) {
    fareData.activeIndex = data.startPosition;
    
    // this.activeSlides = data;
    // console.log(this.activeSlides,data.slides[0]?.id);
    // this.fareActiveFunction(fareData, data.slides[0]?.id)
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
    // this.GetFare_PriceUpsellWithoutPNRReqModel();
    // this.findPassengerData(this.BookedFlightData?.recomentationList
    //   ?.paxFareProduct);
  }

  showCalculateDialog(fareList: any){
    console.log(fareList,'line 283');
    let selectedFare = this.BookedFlightData
    selectedFare.PriceSummary.SubTotal = fareList.Details[0].Amount;
    selectedFare.PriceSummary.PriceTotal = fareList.Details[0].Amount;
    selectedFare.flexi = fareList;

      this.emiInstallments.emit(selectedFare);
      // console.log(this.BookedFlightData);
      
  }

  getDescriptionList(description: string): string[] {
    return description.split('\n');
  }


  getAirArabiaFlex() {
    
    this._flightService.getFlexifareDeatils(this.revalidateObj).subscribe(data=> {
      if(data&& data.CombinedBound != null) {
        this.BookedFlightData.Trips = data.Flights[0].Trips;
        this.BookedFlightData.FSC = data.Flights[0].FSC;
        this.BookedFlightData?.Trips.forEach((trip: any)=> {
          trip.FlexiFareDetails[0].select = true;
        })

        this.cdr.detectChanges();
        


        // this.SelectedFare =data.Flights[0];
        // this.SelectedFare.PriceSummary.additionalMarkupAmount = this.SelectedFlightArray.fareDetails?.flights.find((air:any) => air.isSelected)?.PriceSummary.additionalMarkupAmount;
        // this.SelectedFare.PriceSummary.additionalMarkupType = this.SelectedFlightArray.fareDetails?.flights.find((air:any) => air.isSelected)?.PriceSummary.additionalMarkupType;
        this.loadFlexiFare();
        this.isLoading = false;
      }else {
        this.isBookingFooterConsole = true;
        this.isLoading = false;
        //  Swal.fire({
        //     icon: 'error',
        //     title: 'Oops...',
        //     text: 'Something went wrong!',
        //   });
        //   this.dialogRef.close();
      }
    }, error=> {
      this.isLoading = false;
    })
  }

  selectFlexi(flexi) {
    this.flexiPrice = flexi.Amount
    
  }




  loadFlexiFare() {
    if (this.BookedFlightData?.Trips && this.BookedFlightData?.Trips.length > 0 ) {
      this.isLoading = true;
      const createMatchingService = (data: any[]) => {
        const matchingServicesArray: any[] = [];
        const matchingServices: { [key: string]: any[] } = {};

        data.forEach(item => {
          if (item?.FlexiFareDetails && item?.FlexiFareDetails.length> 0) {
            item?.FlexiFareDetails.forEach((flexiFare: any) => {
              const { ServiceId } = flexiFare;

              if (!matchingServices[ServiceId]) {
                matchingServices[ServiceId] = [];
              }

              let origin = '';
              let destination = '';
        
              if (item.FlightSegments.length > 1) {
                origin = item.FlightSegments[0].Origin;
                destination = item.FlightSegments[item.FlightSegments.length - 1].Destination;
              } else if (item.FlightSegments.length === 1) {
                origin = item.FlightSegments[0].Origin;
                destination = item.FlightSegments[0].Destination;
              }

              matchingServices[ServiceId].push({
                ...flexiFare,
                Amount: flexiFare.Amount + this.BookedFlightData.PriceSummary.SubTotal,
                Origin: origin,
                Destination: destination,
                selected: false ,
              });
            });
          }
        });
        Object.keys(matchingServices).forEach(ServiceId => {

          const detailsArray = matchingServices[ServiceId];
          if (detailsArray.length > 0) {
            detailsArray[0].selected = true;
          }
          matchingServicesArray.push({
            ServiceId,
            activeIndex: 0,
            Details: detailsArray,
            FSC: this.BookedFlightData.FSC
          });
        });
      
        return matchingServicesArray;
      };
        
        
      const result = createMatchingService(this.BookedFlightData?.Trips);
      this.matchingFlexiFareDetails = result;
      this.isLoading = false;
      // const zeroAmountFare = this.SelectedFare?.Trips[0]?.FlexiFareDetails?.find((fare: any) => fare.Amount === 0);
      // if (zeroAmountFare) {
      //     this.selected_offer = zeroAmountFare.ServiceId;
      // }

      // const  passengerCount = (this.SelectedFare?.PriceSummary?.Adults + this.SelectedFare?.PriceSummary?.Children + this.SelectedFare?.PriceSummary?.Infants);
      // this.selectedFareMarkupPrice = this.SelectedFare?.PriceSummary.additionalMarkupType == "Amount"? (this.SelectedFare?.PriceSummary.additionalMarkupAmount * passengerCount) : this._sharedService.calculateMarkUpPercentage(this.SelectedFare?.PriceSummary.PriceTotal, this.SelectedFare?.PriceSummary.additionalMarkupAmount);

      // this.totalFare = Number(this.SelectedFare?.PriceSummary.PriceTotal) + this.selectedFareMarkupPrice;
      
    }else {
    }
  }


}
