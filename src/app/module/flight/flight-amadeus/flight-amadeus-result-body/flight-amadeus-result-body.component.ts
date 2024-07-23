import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OverlayPanel } from 'primeng/overlaypanel';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-flight-amadeus-result-body',
  templateUrl: './flight-amadeus-result-body.component.html',
  styleUrls: ['../../flight-result-body/flight-result-body.component.scss']
})
export class FlightAmadeusResultBodyComponent {
  @Input() flightsearch_res_amadeus: any;
  @Input() recomm: any;
  @Input() searchType: string = "";
  @Input() supplier: string = "";
  @ViewChild('overlayPanel') overlayPanel: OverlayPanel;

  position: string;
  calcPosition: string;
  displayPosition: boolean;
  displayPositionCalc: boolean;
  public bookedFlightData: any = {};

  constructor(public _sharedService: SharedService, private router: Router) {

  }

  ngOnInit() {

    // this._flightService.castFilteredData?.subscribe((filteredData) => {
    //   this.filterListWithStop = filteredData;
    //   this.filterFlightSearchData(filteredData, 'stops');
    //   // this.selectedCurrency = this._sharedService.getLocalStore("selectedCurrencyFromResult");
    // });

    // this._flightService.castFlightsFilteredData?.subscribe((filteredData: any) => {
    //   this.filteredFlightsData = filteredData;
    //   console.log('ss');
    //   this.filterFlightSearchData(filteredData, 'airline');
    // });
  }


  calclateInstallMentData(percentage: any, installmentsTimes: number, totalFare: any) {
    const defaultValue = totalFare ?? 0;
    const balancePercentage = (100 - (percentage < 20 ? 20 : percentage > 100 ? 100 : percentage)) / 100;
    const eachInstallmentAmount = (defaultValue * balancePercentage) / (installmentsTimes);
    let balanceInstallment = (defaultValue * balancePercentage);
    return ((balanceInstallment * 0.05) + eachInstallmentAmount);
  }

  showPositionDialog(position: string, FlightDetails: any, payAsYouEarnActive: boolean) {

    if (payAsYouEarnActive) {
      let installmentData = {
        dateOfDeparture: FlightDetails?.itineraries[0]?.segments[0].departure?.at,
        totalFare: FlightDetails?.price?.grandTotal,
        currency: "NGN",
        minimumDownPayment: 20,
        initialDownPayment: FlightDetails.installmentAmount ?? 0,
        splitInstallmentCount: 1,
        installementSplitAmount: {
          installmentDetails: {
            "1": this.calclateInstallMentData(20, 1, FlightDetails?.price?.grandTotal)
          }
        }
      }
      FlightDetails.flightFareInstallementDetails = installmentData;
      this._sharedService.setLocalStore("airPricePointSelected", FlightDetails);
      this.router.navigateByUrl('/passenger-details-1A');
    }
    else {
      this.position = position;
      this.displayPosition = true;
      this.bookedFlightData = FlightDetails;
    }
  }
  showCalculateDialog(FlightDetails: any) {

    this.calcPosition = 'center';
    this.displayPositionCalc = true;
    this.bookedFlightData = FlightDetails;
  }
  filterWithPrice(flightRecomondation: any) {

  }


  selectedFlightData(index: number) {

  }
  clearFareFilter() {

  }

  filterFlightSearchData(data: any, type: string = '') {

  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(this.filteredFlightData, "sdsdlksdlk");
    // if(changes['filteredFlightData']){
    //   this.filterFlightSearchData('');
    //   if(this.filteredFlightData?.result?.data?.length){
    //     this.getLowestFareByCarrier();
    //   }
    // }
  }
  togglePaymentOption(flightRecomondation: any, state: boolean = true) {
    flightRecomondation.payAsYouEarnActive = state;
  }

  showOverlayPanel(event: MouseEvent) {
    this.overlayPanel.show(event);
  }

  hideOverlayPanel(event: MouseEvent) {
    this.overlayPanel.hide();
  }

  changedEvents(event: any) {
    this.showCalculateDialog(event);
  }

}
