import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { FlightUpsellReqData } from 'src/app/Models/flight/Amadeus/flight-upsell-model';
import { FlightService } from 'src/app/services/flight.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-flight-amadeus-fare-family',
  templateUrl: './flight-amadeus-fare-family.component.html',
  styleUrls: ['../../flight-result-body/modal/flight-details/flight-details.component.scss'],
  providers: [SharedService, FlightService, MessageService]
})
export class FlightAmadeusFareFamilyComponent {

  flight__deprtdate = '12 December 2022';
  flight__from = 'DOHA';
  flight__to = 'Madrid';
  flight__totalDuration = '02 hr 30 min';
  @Input() BookedFlightData: any;
  @Input() airlineList: any;
  @Input() tripTye: any = 'oneWay';
  @Output() emiInstallments: EventEmitter<any> = new EventEmitter();

  public isLoading: boolean = false;
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
  constructor(private router: Router, public sharedService: SharedService, private _flightService: FlightService, private cdr: ChangeDetectorRef, private messageService: MessageService, private primengConfig: PrimeNGConfig) { }

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
    if(this.sharedService.getLocalStore('affiliate_user')!='' && this.sharedService.getLocalStore('affiliate_user')!=undefined)
    {
      debugger
      this.affiliated_user =  JSON.parse(this.sharedService.getLocalStore('affiliate_user'));;
      this.affiliate_user_permission = this.affiliated_user?.permissions.filter((item: { moduleName: string; })=>item.moduleName=="AIR SERVICES")[0];
    }
    this.isBookingFooterConsole = false;
    this.getFareUpsellData(this.BookedFlightData);
    this.selectedFare = this.BookedFlightData;
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  //   findPassengerData(paxFareProduct: any){
  //  paxFareProduct.map((paxRef:any) =>{
  //   if(paxRef?.paxReference?.ptc=='ADT'){
  //     this.adult_count_Result = paxRef.paxReference?.traveller?.length  ?? 0
  //   }
  //   if(paxRef?.paxReference?.ptc=='CH'){
  //     this.child_count_Result = paxRef.paxReference?.traveller?.length  ?? 0
  //   }
  //   if(paxRef?.paxReference?.ptc=='INF'){
  //     this.infant_count_Result =paxRef.paxReference?.traveller?.length 
  //   }
  //   });
  //   }


  //   GetFare_PriceUpsellWithoutPNRReqModel() {
  //     var pricingOptionKey = {
  //       pricingOptionKey: "RP"
  //     }
  //     this.Fare_PriceUpsellWithoutPNR.pricingOptionGroup = new Fare_PriceUpsellWithoutPNRPricingOptionGroup();
  //     this.Fare_PriceUpsellWithoutPNR.pricingOptionGroup.pricingOptionKey = pricingOptionKey;
  //     this.Fare_PriceUpsellWithoutPNR.segmentGroup = [];
  //     var itemNumber = 1;
  //     this.BookedFlightData?.flightData?.flightDetails?.forEach((flightDetails: any, index: number) => {
  //  console.log(this.BookedFlightData?.flightData?.flightDetails,"dssd");

  //       this.Fare_PriceUpsellWithoutPNR?.segmentGroup?.push(

  //         {
  //           segmentInformation: {
  //             flightDate: {
  //               departureDate: flightDetails?.flightInformation?.productDateTime?.dateOfDeparture,
  //               departureTime: flightDetails?.flightInformation?.productDateTime?.timeOfDeparture,
  //               arrivalDate: flightDetails?.flightInformation?.productDateTime?.dateOfArrival,
  //               arrivalTime: flightDetails?.flightInformation?.productDateTime?.timeOfArrival,
  //             },
  //             boardPointDetails: {
  //               trueLocationId: flightDetails?.flightInformation?.location[0]?.locationId
  //             },
  //             offpointDetails: {
  //               trueLocationId: flightDetails?.flightInformation?.location[1]?.locationId
  //             },
  //             companyDetails: {
  //               marketingCompany: flightDetails?.flightInformation?.companyId?.marketingCarrier,
  //               operatingCompany: flightDetails?.flightInformation?.companyId?.operatingCarrier
  //             },
  //             flightIdentification: {
  //               flightNumber: flightDetails?.flightInformation?.flightOrtrainNumber,
  //               bookingClass: flightDetails?.bookingCodeModified
  //             },
  //             flightTypeDetails: {
  //               flightIndicator: (this.BookedFlightData?.flightData?.flightDetails?.length).toString(),
  //             },
  //             itemNumber: (itemNumber).toString()

  //           }
  //         }

  //       );
  //       itemNumber++;
  //     });

  //     this.BookedFlightData?.returnFlightData?.flightDetails?.forEach((flightDetails: any, index: number) => {
  //           this.Fare_PriceUpsellWithoutPNR?.segmentGroup?.push(
  //             {
  //               segmentInformation: {
  //                 flightDate: {
  //                   departureDate: flightDetails?.flightInformation?.productDateTime?.dateOfDeparture,
  //                   departureTime: flightDetails?.flightInformation?.productDateTime?.timeOfDeparture,
  //                   arrivalDate: flightDetails?.flightInformation?.productDateTime?.dateOfArrival,
  //                   arrivalTime: flightDetails?.flightInformation?.productDateTime?.timeOfArrival,
  //                 },
  //                 boardPointDetails: {
  //                   trueLocationId: flightDetails?.flightInformation?.location[0]?.locationId
  //                 },
  //                 offpointDetails: {
  //                   trueLocationId: flightDetails?.flightInformation?.location[1]?.locationId
  //                 },
  //                 companyDetails: {
  //                   marketingCompany: flightDetails?.flightInformation?.companyId?.marketingCarrier,
  //                   operatingCompany: flightDetails?.flightInformation?.companyId?.operatingCarrier
  //                 },
  //                 flightIdentification: {
  //                   flightNumber: flightDetails?.flightInformation?.flightOrtrainNumber,
  //                   bookingClass: flightDetails?.bookingCodeModified
  //                 },
  //                 flightTypeDetails: {
  //                   flightIndicator: "2"  //need to ask
  //                 },
  //                 itemNumber: (itemNumber).toString()
  //               }
  //             }
  //           );
  //           itemNumber++;
  //     });
  //     this.Fare_PriceUpsellWithoutPNR.passengersGroup = [];

  //     //this.searchReqUIModel
  //     var discountPtc = new Fare_PriceUpsellWithoutPNRPassengersGroupDiscountPtc();
  //     var travellersID: Fare_PriceUpsellWithoutPNRPassengersGroupTravellersID[] = [];

  //     this.BookedFlightData?.requestModelData?.search?.paxReference?.map((paxReference: any, index: number) => {
  //       if (paxReference.ptc == "INF") {
  //         discountPtc = {
  //           valueQualifier: paxReference.ptc,
  //           fareDetails: {
  //             qualifier: "766"
  //           }
  //         };
  //       }
  //       else {
  //         discountPtc = new Fare_PriceUpsellWithoutPNRPassengersGroupDiscountPtc();
  //         discountPtc.valueQualifier = paxReference.ptc;
  //       }

  //       travellersID = [];
  //       paxReference.traveller?.map((traveller: any, j = index) => {
  //         travellersID.push({ measurementValue: traveller.ref });
  //       });

  //       this.Fare_PriceUpsellWithoutPNR.passengersGroup.push(
  //         {
  //           segmentRepetitionControl: {
  //             segmentControlDetails: {
  //               quantity: (index + 1).toString(),
  //               numberOfUnits: paxReference.traveller?.length.toString()
  //             }
  //           },
  //           travellersID: travellersID,
  //           discountPtc: discountPtc
  //         }
  //       );
  //     });
  //     this.Fare_PriceUpsellWithoutPNRUIModel = {
  //       Fare_PriceUpsellWithoutPNR: this.Fare_PriceUpsellWithoutPNR,
  //       selectedCustomer: '0',
  //       selectedPcc: "1A"
  //     }



  //   }

  // GetFare_PriceUpsellWithoutPNR() {
  //   this.isLoading = true;
  //   this._amadeusservice?.FARE_PRICEUPSELLWITHOUTPNR(this.Fare_PriceUpsellWithoutPNRUIModel).subscribe({
  //     complete: () => { }, // completeHandler
  //     error: (error: any) => { this.isLoading = false },    // errorHandler 
  //     next: (data: any) => {
  //       if (data) {
  //         if (data != null && data.fareList != null) {

  //           this.fare_PriceUpsell_Res = data;
  //           this.sharedService?.setLocalStore("allSplitedOriginalFareList",this.fare_PriceUpsell_Res);
  //           this.TakeUniqueListForAllPassengerTypesV2();
  //           this.AssignSegmentDetailsV2();
  //           this.SetSelectedSegmentFromFareList();
  //           if (this.fare_PriceUpsell_Res != undefined) {

  //             this.GetFareFamilyDescriptionReqModel('onward');
  //             this.GetFareFamilyDescription('onward');
  //             // if (this.fare_PriceUpsell_Res?.fareList[0]?.fareComponentDetailsGroup?.length > 1) { //now calling after onward result gets
  //             //   this.GetFareFamilyDescriptionReqModel('return');
  //             //   this.GetFareFamilyDescription('return');
  //             // }

  //           }
  //           else {
  //             // this.contentLoaded = true;
  //             // this.spinner.hide('loadingspinner');
  //           }

  //         }
  //         else {
  //           this.isLoading = false;
  //           this.totalPriceSelected = this.BookedFlightData?.recomentationList?.recPriceInfo?.totalPrice_modified;

  //         }
  //         this.selectedFareList = this.fare_PriceUpsell_Res?.fareList?.at(0);
  //         // this.BookedFlightData.flightData.flightDetails[0].bookingCodeModified = this.selectedFareList?.segmentInformation[0]?.cabinGroup?.cabinSegment?.bookingClassDetails?.designator
  //       }
  //     },
  //   });
  // }

  // TakeUniqueListForAllPassengerTypesV2() {
  //   var UniqueList: any[] = [];

  //   this.fare_PriceUpsell_Res?.fareList.forEach((fareList: any) => {
  //     var fareDataSupInformationFarelist = fareList?.fareDataInformation?.fareDataSupInformation.filter((item: any) => item.fareDataQualifier == '712')[0];
  //     var falistfareAmount = 0;
  //     if (fareDataSupInformationFarelist != undefined) {
  //       falistfareAmount = fareDataSupInformationFarelist.indv_totalPrice;
  //     }
  //     if (fareList.segmentInformation[0]?.fareQualifier?.fareBasisDetails?.discTktDesignator == "ADT") {
  //       falistfareAmount = falistfareAmount * this.adult_count;
  //     }
  //     else if (fareList.segmentInformation[0]?.fareQualifier?.fareBasisDetails?.discTktDesignator == "CH") {
  //       falistfareAmount = falistfareAmount * this.child_count;
  //     }
  //     else if (fareList.segmentInformation[0]?.fareQualifier?.fareBasisDetails?.discTktDesignator == "IN") {
  //       falistfareAmount = falistfareAmount * this.infant_count;
  //     }

  //     if (UniqueList.length == 0) {
  //       fareList.totalAmount = falistfareAmount;
  //       UniqueList.push(fareList);
  //     }
  //     else {


  //       if (fareList.fareComponentDetailsGroup?.length == 1) { //one way
  //         var matchedInUniqueList = UniqueList.filter((item: any) => item.fareComponentDetailsGroup[0]?.fareFamilyDetails?.fareFamilyname == fareList.fareComponentDetailsGroup[0]?.fareFamilyDetails?.fareFamilyname);
  //         if (matchedInUniqueList != undefined && matchedInUniqueList.length > 0) {
  //           var uniqueListFare = matchedInUniqueList[0]?.fareDataInformation?.fareDataSupInformation.filter((item: any) => item.fareDataQualifier == '712')[0];
  //           var ulFareAmount = 0;
  //           if (uniqueListFare != undefined) {
  //             if (matchedInUniqueList[0].totalAmount > 0) {
  //               matchedInUniqueList[0].totalAmount = matchedInUniqueList[0].totalAmount + falistfareAmount;
  //             }
  //             else {
  //               ulFareAmount = uniqueListFare.indv_totalPrice;

  //               if (matchedInUniqueList[0]?.segmentInformation[0]?.fareQualifier?.fareBasisDetails?.discTktDesignator == "ADT") {
  //                 ulFareAmount = ulFareAmount * this.adult_count;
  //               }
  //               else if (matchedInUniqueList[0]?.segmentInformation[0]?.fareQualifier?.fareBasisDetails?.discTktDesignator == "CH") {
  //                 ulFareAmount = ulFareAmount * this.child_count;
  //               }
  //               else if (matchedInUniqueList[0]?.segmentInformation[0]?.fareQualifier?.fareBasisDetails?.discTktDesignator == "IN") {
  //                 ulFareAmount = ulFareAmount * this.infant_count;
  //               }
  //               matchedInUniqueList[0].totalAmount = ulFareAmount + falistfareAmount;
  //             }

  //           }
  //         }
  //         else {
  //           fareList.totalAmount = falistfareAmount;
  //           UniqueList.push(fareList);
  //         }
  //       }
  //       else if (fareList.fareComponentDetailsGroup?.length == 2) { //round trip
  //         var matchedInUniqueList = UniqueList.filter((item: any) => item.fareComponentDetailsGroup[0]?.fareFamilyDetails?.fareFamilyname == fareList.fareComponentDetailsGroup[0]?.fareFamilyDetails?.fareFamilyname && item.fareComponentDetailsGroup[1]?.fareFamilyDetails?.fareFamilyname == fareList.fareComponentDetailsGroup[1]?.fareFamilyDetails?.fareFamilyname);
  //         if (matchedInUniqueList != undefined && matchedInUniqueList.length > 0) {
  //           var uniqueListFare = matchedInUniqueList[0]?.fareDataInformation?.fareDataSupInformation.filter((item: any) => item.fareDataQualifier == '712')[0];
  //           var ulFareAmount = 0;
  //           if (uniqueListFare != undefined) {
  //             if (matchedInUniqueList[0].totalAmount > 0) {
  //               matchedInUniqueList[0].totalAmount = matchedInUniqueList[0].totalAmount + falistfareAmount;
  //             }
  //             else {
  //               ulFareAmount = uniqueListFare.indv_totalPrice;

  //               if (matchedInUniqueList[0]?.segmentInformation[0]?.fareQualifier?.fareBasisDetails?.discTktDesignator == "ADT") {
  //                 ulFareAmount = ulFareAmount * this.adult_count;
  //               }
  //               else if (matchedInUniqueList[0]?.segmentInformation[0]?.fareQualifier?.fareBasisDetails?.discTktDesignator == "CH") {
  //                 ulFareAmount = ulFareAmount * this.child_count;
  //               }
  //               else if (matchedInUniqueList[0]?.segmentInformation[0]?.fareQualifier?.fareBasisDetails?.discTktDesignator == "IN") {
  //                 ulFareAmount = ulFareAmount * this.infant_count;
  //               }
  //               matchedInUniqueList[0].totalAmount = ulFareAmount + falistfareAmount;
  //             }

  //           }
  //         }
  //         else {
  //           fareList.totalAmount = falistfareAmount;
  //           UniqueList.push(fareList);
  //         }
  //       }
  //     }
  //   });

  //   this.fare_PriceUpsell_Res.fareList = UniqueList;
  // }

  // AssignSegmentDetailsV2() {
  //   this.BookedFlightData?.flightData?.flightDetails?.forEach((flightDetails: any, itemNumber: number) => {
  //     this.fare_PriceUpsell_Res?.fareList.forEach((fareList: any, fareListIndex: number) => {
  //       fareList.segmentInformation.forEach((segmentInformation: any) => {
  //         if (itemNumber == segmentInformation.sequenceInformation?.sequenceSection?.sequenceNumber) {
  //           segmentInformation.segmentFlightDetails = flightDetails;
  //         }
  //       });
  //     });
  //   });
  //   //  Todo for round trip

  //   // this.BookedFlightData?.flightData?.flightDetails?.forEach((flightDetails: any, itemNumber: number) => {
  //   //   this.fare_PriceUpsell_Res.fareList.forEach((fareList: any) => {
  //   //     fareList.segmentInformation.forEach((segmentInformation: any) => {
  //   //       if (itemNumber == segmentInformation.sequenceInformation?.sequenceSection?.sequenceNumber) {
  //   //         segmentInformation.segmentFlightDetails = flightDetails;
  //   //       }
  //   //     });

  //   //   });
  //   // });

  // }

  // SetSelectedSegmentFromFareList() {
  //   var isSelectedPresentinList: any = false;
  //   this.fare_PriceUpsell_Res.fareList.forEach((fareList: any) => {
  //     var isSelectedSegmentFareList = true;
  //     fareList.segmentInformation.forEach((segmentInformation: any) => {
  //       this.BookedFlightData?.flightData?.flightDetails.forEach((flightDetails: any, itemNumber: number) => {
  //         if (itemNumber == segmentInformation.sequenceInformation?.sequenceSection?.sequenceNumber) {
  //           if (segmentInformation.cabinGroup?.cabinSegment?.bookingClassDetails?.designator != flightDetails?.bookingCodeModified) {
  //             isSelectedSegmentFareList = false;
  //           }
  //         }
  //       });

  //       //  Todo for round trip
  //       // this.BookedFlightData?.flightData?.flightDetails.forEach((flightDetails: any, itemNumber:number) => {
  //       //   if (itemNumber == segmentInformation.sequenceInformation?.sequenceSection?.sequenceNumber) {
  //       //     if (segmentInformation.cabinGroup?.cabinSegment?.bookingClassDetails?.designator != flightDetails?.bookingCodeModified) {
  //       //       isSelectedSegmentFareList = false;
  //       //     }
  //       //   }
  //       // });

  //     });
  //     if (isSelectedSegmentFareList) {
  //       fareList.isSelectedSegmentFareList = true;
  //       isSelectedPresentinList = true;
  //     }
  //   });
  //   if (isSelectedPresentinList == true) {
  //     this.totalPriceSelected = this.fare_PriceUpsell_Res?.fareList?.filter((item: any) => item.isSelectedSegmentFareList == true)[0]?.totalAmount;
  //     this.selectedMarkupIndex = this.fare_PriceUpsell_Res?.fareList?.filter((item: any) => item.isSelectedSegmentFareList == true)[0]?.markupIndex;
  //     if (this.fare_PriceUpsell_Res?.fareList[0]?.isSelectedSegmentFareList != true) {
  //       this.fare_PriceUpsell_Res?.fareList?.sort(function (x: any, y: any) {
  //         // true values first
  //         return (x.isSelectedSegmentFareList === y.isSelectedSegmentFareList) ? 0 : x ? -1 : 1;
  //         // false values first
  //         // return (x === y)? 0 : x? 1 : -1;
  //       });
  //     }

  //   }
  //   else {
  //     this.fare_PriceUpsell_Res = undefined;
  //     // this.totalPriceSelected = this.recommendation?.recPriceInfo?.monetaryDetail[0]?.amount;
  //     // this.selectedMarkupIndex = this.recommendation?.markupIndex; 
  //   }

  // }

  // GetFareFamilyDescriptionReqModel(direction: string) {
  //   this.fare_GetFareFamilyDescription.bookingDateInformation = {
  //     dateTime: {
  //       year: (new Date().getFullYear()).toString(),
  //       month: (new Date().getMonth() + 1).toString(),
  //       day: (new Date().getDay()).toString()
  //     }
  //   }

  //   this.fare_GetFareFamilyDescription.standaloneDescriptionRequest = [];
  //   this.fare_PriceUpsell_Res?.fareList?.forEach((fareList: any) => {
  //     fareList.showOnwardRules = true;
  //     //fareList.fareComponentDetailsGroup?.forEach((fareComponentDetailsGroup:any) => {
  //     if (direction == "onward") {
  //       var fareComponentDetailsGroup = fareList.fareComponentDetailsGroup[0];
  //       this.fare_GetFareFamilyDescription.standaloneDescriptionRequest.push(
  //         {
  //           fareInformation: {
  //             discountDetails: {
  //               fareQualifier: "FF",
  //               rateCategory: fareComponentDetailsGroup.fareFamilyDetails?.fareFamilyname
  //             }
  //           },
  //           itineraryInformation: {
  //             origin: fareComponentDetailsGroup.marketFareComponent?.boardPointDetails?.trueLocationId,
  //             destination: fareComponentDetailsGroup.marketFareComponent?.offpointDetails?.trueLocationId
  //           },
  //           carrierInformation: {
  //             companyIdentification: {
  //               otherCompany: fareComponentDetailsGroup.fareFamilyOwner?.companyIdentification?.otherCompany
  //             }
  //           }
  //         }
  //       )
  //     }
  //     else {
  //       var fareComponentDetailsGroupReturn = fareList.fareComponentDetailsGroup[1];
  //       if (fareComponentDetailsGroupReturn != undefined) {
  //         this.fare_GetFareFamilyDescription.standaloneDescriptionRequest.push(
  //           {
  //             fareInformation: {
  //               discountDetails: {
  //                 fareQualifier: "FF",
  //                 rateCategory: fareComponentDetailsGroupReturn.fareFamilyDetails?.fareFamilyname
  //               }
  //             },
  //             itineraryInformation: {
  //               origin: fareComponentDetailsGroupReturn.marketFareComponent?.boardPointDetails?.trueLocationId,
  //               destination: fareComponentDetailsGroupReturn.marketFareComponent?.offpointDetails?.trueLocationId
  //             },
  //             carrierInformation: {
  //               companyIdentification: {
  //                 otherCompany: fareComponentDetailsGroupReturn.fareFamilyOwner?.companyIdentification?.otherCompany
  //               }
  //             }
  //           }
  //         )
  //       }
  //     }

  //   });

  //   this.fare_GetFareFamilyDescription.session = this.fare_PriceUpsell_Res?.sessionDetails;
  //   this.fare_GetFareFamilyDescription.sessionDetails = this.fare_PriceUpsell_Res?.sessionDetails;

  // }


  // GetFareFamilyDescription(direction: string) {
  //   var uimodel = {
  //     fare_GetFareFamilyDescription: this.fare_GetFareFamilyDescription,
  //     selectedPcc: '1A'
  //   }
  //   this.isLoading = true;
  //   this._amadeusservice?.FARE_GETFAREFAMILYDESCRIPTION(uimodel)
  //     .subscribe({
  //       complete: () => { }, // completeHandler
  //       error: (error: any) => { this.isLoading = false },    // errorHandler 
  //       next: (data: any) => {
  //         if (data != null && data.fareFamilyDescriptionGroup != null) {

  //           if (direction == 'onward') {
  //             this.fare_GetFareFamilyDescription_Res_ow = data;
  //             this.AssignFareFamilyDescriptions('onward');
  //             //now calling from here
  //             if (this.fare_PriceUpsell_Res?.fareList[0]?.fareComponentDetailsGroup?.length > 1) {
  //               this.GetFareFamilyDescriptionReqModel('return');
  //               this.GetFareFamilyDescription('return');
  //             }
  //             else {
  //               this.isLoading = false;
  //             }
  //             //
  //           }
  //           else {
  //             this.fare_GetFareFamilyDescription_Res_re = data;
  //             this.AssignFareFamilyDescriptions('return');
  //             this.isLoading = false;
  //           }
  //         }
  //         else {
  //           this.isLoading = false;
  //         }

  //       },
  //     });
  //   }

  // AssignFareFamilyDescriptions(direction: string) {

  //   if (direction == 'onward') {
  //     this.fare_PriceUpsell_Res?.fareList?.forEach((fareList: any) => {
  //       //fareList.fareComponentDetailsGroup?.forEach((fareComponentDetailsGroup:any) => {
  //       var fareComponentDetailsGroup = fareList.fareComponentDetailsGroup[0];
  //       var fareFamilyDescription = this.fare_GetFareFamilyDescription_Res_ow?.fareFamilyDescriptionGroup?.filter((item: any) => item.fareInformation?.discountDetails?.rateCategory == fareComponentDetailsGroup?.fareFamilyDetails?.fareFamilyname)[0];
  //       fareComponentDetailsGroup.fareFamilyDescription = fareFamilyDescription;
  //     });
  //   }
  //   else {
  //     this.fare_PriceUpsell_Res?.fareList?.forEach((fareList: any) => {
  //       var fareComponentDetailsGroup = fareList.fareComponentDetailsGroup[1];
  //       var fareFamilyDescription = this.fare_GetFareFamilyDescription_Res_re?.fareFamilyDescriptionGroup?.filter((item: any) => item.fareInformation?.discountDetails?.rateCategory == fareComponentDetailsGroup?.fareFamilyDetails?.fareFamilyname)[0];
  //       fareComponentDetailsGroup.fareFamilyDescription = fareFamilyDescription;
  //     });
  //   }
  // }

  // selectedFlightDetials(index: number, fare: any){
  //   this.totalPriceSelected =fare?.totalAmount;
  //   this.selectedFareList = fare;
  //   this.selectedFlightIndex= index;
  //   // this.BookedFlightData.flightData.flightDetails[0].bookingCodeModified = fare?.segmentInformation[0]?.cabinGroup?.cabinSegment?.bookingClassDetails?.designator
  //   // onwardGroupofFlightSelected.flightDetails[0].bookingCodeModified = fareList.segmentInformation[0].cabinGroup?.cabinSegment?.bookingClassDetails?.designator;
  //   // var returnGroupofFlightSelected = this.recommendation?.returnGroupofFlightsList?.filter((item: any) => item.isSelected == true)[0];
  //   // returnGroupofFlightSelected.flightDetails[0].bookingCodeModified = fareList.segmentInformation[1].cabinGroup?.cabinSegment?.bookingClassDetails?.designator;
  // }
  fareActiveFunction(itineraries: any, activeIndex: number = 0) {
   itineraries['activeId'] = activeIndex;
  }

  getUpsellPriceData() {
    this.isLoading = true;
    if(this.affiliated_user!=undefined)
    {
      this.flightUpsellReqData.userid=String(this.affiliated_user.id);
      this.flightUpsellReqData.b2BCustomer_ID=this.affiliated_user.b2BCustomer_ID==undefined?'0':this.affiliated_user.b2BCustomer_ID;
      this.flightUpsellReqData.userType=this.affiliated_user.userType==undefined?'':this.affiliated_user.userType;
    }
    this._flightService.FlightUpsellData(this.flightUpsellReqData).subscribe({
      complete: () => { }, // completeHandler
      error: (error: any) => { this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error Fetching Flight Data. Please Try Again' }); this.isLoading = false },    // errorHandler 
      next: (data: any) => {
        if (data !== null && data !== undefined) {
          // console.log(data);
          this.fare_PriceUpsell_Res = data;
          this.isLoading = false;
          this.fare_PriceUpsell_Res?.data.forEach((itinerariesList: any, index: number) => {
            // [0]?.travelerPricings[0]?.fareDetailsBySegment
          // this.fareActiveFunction(itineraries, 0);
            // console.log(itineraries);

            itinerariesList['installmentAmount'] = this.sharedService.getInstallmentAmount(itinerariesList?.price?.grandTotal ?? 0, 20);
            itinerariesList['isInstallmentApplicable'] = this.sharedService.getInstallationDateDuration(itinerariesList?.itineraries[0].segments[0]?.departure.at) ?? false;

            if(index === 0){
              this.selectedFare = itinerariesList;
            }
            itinerariesList['activeId'] = itinerariesList?.itineraries[0]?.segments[0]?.id;
          });
        }
        else {
          this.isLoading = false;
        }
      }
    });
  }



  getFareUpsellData(fareData: any) {
    if (fareData !== undefined && fareData !== null) {
      let flightDetailsObj = this.flightUpsellReqData.data.flightOffers[0];
      this.flightUpsellReqData.data.flightOffers.length = 0;
      this.flightUpsellReqData.data.payments = [
        {
          brand: "VISA_IXARIS",
          binNumber: 123456,
          flightOfferIds: [this.BookedFlightData?.id]
        }
      ];
      let upsellPrice = JSON.parse(JSON.stringify(this.BookedFlightData));
      upsellPrice?.itineraries?.map((itinerary: any) => {
        itinerary.duration = this.sharedService.convertTimeDuration(itinerary.duration)
        itinerary?.segments.map((segment: any) => {
          segment.duration =  this.sharedService.convertTimeDuration(segment.duration, true)
        });
      });
      this.flightUpsellReqData.data.flightOffers.push(upsellPrice);
      if (upsellPrice?.travelerPricings[0]?.fareDetailsBySegment[0]?.brandedFare !== undefined && upsellPrice?.travelerPricings[0]?.fareDetailsBySegment[0]?.brandedFare !== null) {
        this.getUpsellPriceData();
      }
      else {
         this.isBookingFooterConsole = true; 
      }

    }
  }

  OnClickBookNow(fare:any){
    fare['fareRules'] = this.BookedFlightData?.fareRules;
    this.sharedService.setLocalStore("airPricePointSelected", fare );
    this.router.navigateByUrl('/passenger-details-1A');
  }

  
  startDragging(event){
  }

  getPassedData(data: any,fareData: any) {
    this.activeSlides = data;
    this.fareActiveFunction(fareData, data.slides[0]?.id)
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
    // this.GetFare_PriceUpsellWithoutPNRReqModel();
    // this.findPassengerData(this.BookedFlightData?.recomentationList
    //   ?.paxFareProduct);
  }

  showCalculateDialog(fareList: any){
      this.emiInstallments.emit(fareList);
  }
}
