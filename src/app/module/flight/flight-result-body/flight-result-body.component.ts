import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from 'src/app/services/flight.service';
import { SharedService } from 'src/app/services/shared.service';
import { ICommonResultModel } from '../../search-engine/search-engine.util';
import { MicroService } from 'src/app/services/micro.service';

@Component({
  selector: 'app-flight-result-body',
  templateUrl: './flight-result-body.component.html',
  styleUrls: ['./flight-result-body.component.scss']
})
export class FlightResultBodyComponent implements AfterViewInit {

  @Input() destinationDep = "Lagos";
  @Input() destinationArri = "Madrid";
  airlinesListData: Array<any> = [];

  data = 'm'


  public flightResultData: any;
  public tripType: string = 'oneWay';
  public isLoading = false;
  commonResultModel: ICommonResultModel[] = [];
  cities: any[];
  constructor(private _flightService: FlightService, private router: Router, private activatedRoute: ActivatedRoute, private sharedService: SharedService, private cdr: ChangeDetectorRef, private _microService: MicroService) {
    this.router.getCurrentNavigation().extras.state;

  }
  public selectedCabinDataData: any;
  ngOnInit() {
    // this.flightResultData = this.sharedService.getLocalStore("flightData");
    // this.setFlightDetailsArray(this.flightResultData?.data);
    this.sharedService.airLineCity().then(cities => {
      this.cities = cities;
    });
    this.changedFlightDataEvent(true)
    this.tripType = this.flightResultData?.tripType ?? 'oneWay';

  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  sortArraybyObjValue(arr: any, value: any) {
    return arr.sort((a: any, b: any) => a.fare - b.fare);
  };
  getAllAirlineData() {
    this.isLoading = true
    this.sharedService.GetAllAirLines().subscribe({
      complete: () => { },
      error: (error: any) => { this.isLoading = false; },
      next: (data: any) => {
        if (data?.length) {
          this.isLoading = false;
          this.airlinesListData = data;
        }
        else {
          this.isLoading = false;

        }
      },
    });
  }

  getAirlineName(ValidatingAirline: string) {
    return (this.airlinesListData?.find((airline: any) => airline?.vendorCode === ValidatingAirline?.trim()))?.vendorName ?? ''
  }

  changedFlightDataEvent(event: boolean): void {
    this.cdr.detectChanges();
    this.flightResultData = this.sharedService.getLocalStore("flightData");
    this.commonResultModel.length = 0;



    if (this.flightResultData !== null && this.flightResultData !== undefined) {
      if (this.flightResultData.amedeusData !== null && this.flightResultData.amedeusData !== undefined && this.flightResultData.amedeusData?.result?.data?.length) {

        this.flightResultData.amedeusData?.result?.data?.forEach((offer: any, index: number) => {
          offer['installmentAmount'] = this.sharedService.getInstallmentAmount(offer?.price?.grandTotal ?? 0, 20);
          offer['flightFareInstallementDetails'] = null;
          offer['isInstallmentApplicable'] = this.sharedService.getInstallationDateDuration(offer?.itineraries[0].segments[0]?.departure.at) ?? false;
          offer['isShowAirlinePriceCard'] = true;
          offer['isAirlineStop'] = true;
          offer['isShowAirlineCard'] = true;
          offer['isAirShowFilterCard'] = true;


          let commonResultModel: ICommonResultModel =
          {
            id: offer.id,
            fare: offer.price.grandTotal,
            supplier: '1A',
            offer: offer,
            optionheaderIndex: 0,
          }
          // this.commonResultModel.push(commonResultModel);
          this.commonResultModel = [...this.commonResultModel, { ...commonResultModel }];
        });
      }

      if (this.flightResultData.data !== null && this.flightResultData.data !== undefined && this.flightResultData?.data?.CombinedBound?.length) {
        var SupplierName = "";
        this.flightResultData?.data?.CombinedBound?.map((offerItem: any, index: number) => {

          const departTime = this._microService?.getFormatedFlightDate(offerItem?.flights[0]?.Trips[0]?.FlightSegments[0].DepartureDate)

          offerItem['installmentAmount'] = this.sharedService.getInstallmentAmount(offerItem?.amount ?? 0, 20);
          offerItem['isInstallmentApplicable'] = this.sharedService.getInstallationDateDuration(departTime) ?? false;
          offerItem['payAsYouEarnActive'] = false;
          //  offerItem['isPriceRange'] = true;
          //  offerItem['isShowCard'] = true;
          offerItem['isShowAirlineCard'] = true;
          offerItem['isShowAirlinePriceCard'] = true;
          offerItem['isAirlineStop'] = true;
          //  offerItem['isShowFlightDurationCard'] = true; 
          //  offerItem['isTravellingCard'] = true; 
          // offerItem['isShowCard'] = true; 
          // offerItem['isShowAirlinePrice'] = true;
          // offerItem['isLowestFare'] = true;
          offerItem['isAirShowFilterCard'] = true;

          offerItem?.flights?.forEach((flights: any, flightIndex: number) => {
            flights.isSelected = flightIndex === 0 ? true : false;
            //  flights['isPriceRange'] = true;
            flights['isShowTrip'] = true;
            flights['isShowAirline'] = true;
            // flights['isLowestFareFlight'] = true;
            // flights['flightFareInstallementDetails']= null;
            flights['airShowFilter'] = true;
            //  flights['isShowFlightDuration'] = true;
            flights.PriceSummary['additionalMarkupAmount'] = 0;
            //  flights['isTravellingTimeDept']= true;
            //  flights['isTravellingTimeArr']= true;


            flights?.Trips?.forEach((trips: any, tripIndex: number) => {
              trips.selectedFareIndex = -1;
              trips['vendorName'] = this.getAirlineName(trips?.ValidatingAirline);
              SupplierName = trips.SupplierName;
              // trips.FlexiFareDetails.map((fareDetails: any, fareIndex: number) => {
              //   fareDetails.isSelectedFare = fareIndex === 0 ? true : false;
              // });
              trips?.FlightSegments?.map((segments: any) => segments['vendorName'] = this.getAirlineName(segments?.MarketingAirline));
            });
          });

          let commonResultModel: ICommonResultModel =
          {
            id: index + ('-Verteil'),
            fare: offerItem.amount,
            supplier: 'Verteil',
            offer: offerItem,
            optionheaderIndex: 0,
          }
          // this.commonResultModel.push(commonResultModel);
          this.commonResultModel = [...this.commonResultModel, { ...commonResultModel }];

        });
      }
    }
    this.sortArraybyObjValue(this.commonResultModel, 'fare');
  }

  changeAirlineFilter(event: any) {

  }


  noDataFound(data: any){
        // console.log(this.filteredFlightData?.result?.data);
        return  data?.some((item: any) => 
          item.offer.isShowAirlinePriceCard === true &&
          item.offer.isAirlineStop === true &&
          item.offer.isShowAirlineCard === true &&
          item.offer.isAirShowFilterCard === true);

  }

  onChangeTab(event: any) {
    switch (event?.index) {
      case 0:
        this.tripType = 'oneWay';
        break;
      case 1:
        this.tripType = 'roundTrip';
        break;
      case 2:
        this.tripType = 'multiCity';
        break;

      default:
        this.tripType = 'oneWay';
        break;
    }
    // this.sharedService?.setLocalStore("flightData", this.flightResultData);
  }
}
