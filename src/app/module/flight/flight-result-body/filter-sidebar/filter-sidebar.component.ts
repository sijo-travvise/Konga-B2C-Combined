import { ChangeDetectorRef, Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightService } from 'src/app/services/flight.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-filter-sidebar',
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.scss']
})
export class FilterSidebarComponent {
  rangeValues: number[] = [120, 6000];
  // timeRangeValues: number[] = [1, 24];
  activeIndex = 0;
  activeDeparture = 0;
  activeButtonReturn = 0;
  public minPrice = 100;
  public maxPrice = 1000;
  public departurePlace = '';
  public arrivalPlace = '';
  public selectedCurrency: string = 'NGN'


  @Input() filteredFlightData: any;
  @Input() filteredFlightFormData: any;
  @Input() commonResult: any = [];

  public locationList = new Set([]);
  public locationListArray = [];
  public airlineList: any = {};

  public flightPopularFilters: FormGroup;
  constructor(private router: Router, private sharedService: SharedService, public form: FormBuilder, private _flightService: FlightService, private _sharedService: SharedService, private cdr: ChangeDetectorRef) { }


  get HasOneStop() {
    return this.flightPopularFilters.get('HasOneStop') as FormControl<any>;
  }
  get HasRefundable() {
    return this.flightPopularFilters.get('HasRefundable') as FormControl<any>;
  }
  get HasMoreStops() {
    return this.flightPopularFilters.get('HasMoreStops') as FormControl<any>;
  }
  get HasNonStop() {
    return this.flightPopularFilters.get('HasNonStop') as FormControl<any>;
  }
  get PriceRange() {
    return this.flightPopularFilters.get('PriceRange') as FormControl<any>;
  }

  ngOnInit() {
    // this._flightService.applyPopularFilters(this.flightPopularFilters?.value);
    this.filterSliderValuePriceChange();

    this.getCityNames();
    if (this.filteredFlightFormData !== null && this.filteredFlightFormData !== undefined) {

      //  this.getFilteredAirportsName(this.filteredFlightData);
      //  this.getFilteredAirlineName(this.commonResult);
    }

    this.selectedCurrency = this._sharedService.getLocalStore("selectedCurrencyFromResult");

  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  };

  buildForm() {
    this.flightPopularFilters = this.form.group({
      HasOneStop: [false],
      HasRefundable: [false],
      HasMoreStops: [false],
      HasNonStop: [false],
      PriceRange: [[0, 100]]
    });

    this.flightPopularFilters?.valueChanges?.subscribe((filteres: any) => {

      this.filterFlightSearchData(filteres, 'price')

    });
    // this.PriceRange.valueChanges.subscribe((data:any)=>{
    // console.log(data,"ssijoooo");

    // });
  }

  resetForm() {
    this.HasOneStop.reset(false);
    this.HasRefundable.reset(false);
    this.HasMoreStops.reset(false);
    this.HasNonStop.reset(false);
  }

  filterSliderValuePriceChange() {

    if (this.commonResult?.length) {
      this.minPrice = parseFloat(this.commonResult[0]?.fare ?? 0);
      this.maxPrice = parseFloat(this.commonResult[this.commonResult?.length - 1]?.fare ?? 0);
      this.PriceRange.setValue([this.minPrice, this.maxPrice]);
    }

  }

  getCityNames() {
    // if (this.filteredFlightData?.recommendation[0]?.onwardGroupofFlightsList[0]?.flightDetails.length) {
    //   let flights = this.filteredFlightData?.recommendation[0]?.onwardGroupofFlightsList[0]?.flightDetails;
    //   this.departurePlace = flights[0]?.flightInformation?.location[0]?.location_detail?.cityName;
    //   this.arrivalPlace = flights[flights.length - 1]?.flightInformation?.location[1]?.location_detail?.cityName;
    // }
  }
  getFilteredAirportsName(FlightData: any) {
    // FlightData.recommendation.map((filterdFlights:any)=>{
    //     filterdFlights.onwardGroupofFlightsList?.forEach((flightDetailsData:any) => {
    //       if(flightDetailsData?.flightDetails?.length >= 2){
    //         flightDetailsData?.flightDetails.map((flightDetails:any, index:number) =>{
    //             if(index < flightDetailsData?.flightDetails?.length -1  ){
    //               this.locationList.add((flightDetails?.flightInformation?.location[1].location_detail?.cityName)?.trim())
    //           }
    //         })
    //       }
    //      });


    // })
    // this.locationListArray = [...this.locationList];
  }

  getFilteredAirlineName(flightData: any) {
    const airlineMap: { [key: string]: string } = {};
    if (flightData?.data?.CombinedBound?.length) {

      flightData?.data?.CombinedBound?.forEach((flightItem: any) => {
        flightItem?.flights?.forEach((flight: any) => {
          flight?.Trips?.forEach((trip: any) => {
            const airlineCode = trip?.FlightSegments[0]?.MarketingAirline;
            const airlineName = trip?.FlightSegments[0]?.marketingAirlineName;
            if (airlineCode && airlineName) {
              airlineMap[airlineCode] = airlineName;
            }
          });
        });
      });

      this.airlineList = { ...this.airlineList, ...airlineMap }
    }
    // flightData?.amedeusData?.result?.dictionaries
    if (flightData?.amedeusData !== null && flightData?.amedeusData !== undefined) {

      this.airlineList = { ...this.airlineList, ...flightData?.amedeusData?.result?.dictionaries?.carriers }
    }
  }


  filterFlightSearchData(filterData: any, type: string = '') {
    this.commonResult?.forEach((offerItem: any, boundIndex: number) => {

      let amOptionsCount = false;
      let amFlightOptionsCount = 0;
      let isLeastStop = false;
      // if (boundIndex < 2) {
      switch (type) {
        case 'stops':

          break;
        case 'airline':

          if (offerItem.supplier === '1A') {
            let alrlineCount = false;
            offerItem?.offer?.itineraries?.forEach((itineraries: any) => {
              itineraries?.segments?.forEach((segment: any) => {
                alrlineCount = filterData.includes(segment?.carrierCode)
                console.log(alrlineCount);


              });
            });
            offerItem.offer.isShowAirline = filterData?.length ? alrlineCount : true;
          }
          else {
            let isShowAirlineCard = false;
            offerItem?.offer?.flights?.map((flights: any, flightIndex: number) => {

              flights?.Trips?.map((trips: any, tripIndex: number) => {
                if (filterData.includes(trips?.ValidatingAirline)) {
                  flights.isShowAirline = true;
                  isShowAirlineCard = true;
                }
                offerItem.offer.isShowAirlineCard = filterData?.length ? isShowAirlineCard : true;

              });

            });
          }
          // });

          break;
        case 'price':
          if (parseFloat(offerItem.fare) >= filterData.PriceRange[0] && parseFloat(offerItem.fare) <= filterData.PriceRange[1]) {
            offerItem.offer.isShowAirlinePriceCard = true;
          }
          else {
            offerItem.offer.isShowAirlinePriceCard = false;
          }

          //  Stops filter starts here


          if (offerItem.supplier === '1A') {

            if (filterData !== null && (filterData?.HasOneStop || filterData.HasRefundable || filterData.HasMoreStops || filterData?.HasNonStop)) {

              for (let itineraries of offerItem?.offer?.itineraries) {
                if (itineraries?.segments?.length === 1 && filterData?.HasNonStop) {
                  amOptionsCount = true;
                }
                else if (itineraries?.segments?.length === 2 && filterData?.HasOneStop) {
                  amOptionsCount = true;
                }
                else if (itineraries?.segments?.length > 2 && filterData?.HasMoreStops) {
                  amOptionsCount = true;

                }
                else if (filterData?.HasRefundable) {
                  amOptionsCount = true;
                }
                else {
                  amOptionsCount = false;
                }
                amOptionsCount ? amFlightOptionsCount++ : amFlightOptionsCount;
              }

              if (amFlightOptionsCount === offerItem?.offer?.itineraries?.length) {
                offerItem.offer.isAirlineStop = true;
              }
              else {
                offerItem.offer.isAirlineStop = false;
              }
            }
          }
          else {

            offerItem?.offer?.flights?.forEach((flights: any) => {
              if (filterData !== null && (filterData?.HasOneStop || filterData.HasRefundable || filterData.HasMoreStops || filterData?.HasNonStop)) {
                let isFlightStop = false;
                let flightOptionsCount = 0;

                flights?.Trips?.map((trips: any, tripIndex: number) => {

                  if (trips?.FlightSegments?.length === 1 && filterData?.HasNonStop) {
                    isFlightStop = true;
                  }
                  else if (trips?.FlightSegments?.length === 2 && filterData?.HasOneStop) {
                    isFlightStop = true;
                  }
                  else if (trips?.FlightSegments?.length > 2 && filterData?.HasMoreStops) {
                    isFlightStop = true;
                  }
                  else if (filterData?.HasRefundable) {
                    isFlightStop = true;
                  }
                  else {
                    isFlightStop = false;
                  }
                  isFlightStop ? flightOptionsCount++ : flightOptionsCount;
                });

                if (flightOptionsCount === flights?.Trips?.length) {
                  flights.isShowTrip = true;
                  isLeastStop = true;
                }
                else {
                  flights.isShowTrip = false;
                }
              }
              else {
                // bound.isShowCard = true;
                flights.isShowTrip = true;
                isLeastStop = true;
              }
            });
            offerItem.offer.isAirlineStop = isLeastStop;
          }

          break;

        default:
          // optionsCount = false;
          break;
      }
      // }
    });


    console.log(this.commonResult);

  }

  onChangeAirlineValue(event: any): void {
    this.filterFlightSearchData(event?.verdorFilter, 'airline')
  }

  ngOnChanges(changes: SimpleChanges) {
    this.buildForm();
    if (changes) {
      this.getCityNames();

    }
    console.log(changes, this.flightPopularFilters);

    if ((changes['filteredFlightData']?.currentValue?.amedeusData !== null && changes['filteredFlightData']?.currentValue?.amedeusData !== undefined) || (changes['filteredFlightData']?.currentValue?.data !== null && changes['filteredFlightData']?.currentValue?.data !== undefined) && this.flightPopularFilters) {
      // console.log(this.filteredFlightData);
      // if (this.filteredFlightData?.CombinedBound?.length) {
      //   this.minPrice = parseFloat(this.filteredFlightData?.CombinedBound[0]?.amount ?? 0);
      //   this.maxPrice = parseFloat(this.filteredFlightData?.CombinedBound[this.filteredFlightData?.CombinedBound?.length - 1]?.amount ?? 0);
      // }

      // this.PriceRange.setValue([this.minPrice, this.maxPrice]);
      this.getFilteredAirlineName(this.filteredFlightData);

    }
    if(changes['commonResult']?.currentValue !== null && changes['commonResult']?.currentValue !== undefined && changes['commonResult']?.currentValue?.length){
      this.filterSliderValuePriceChange();

    }


  }



}
