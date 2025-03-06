import { ChangeDetectorRef, Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { AirlineTopFilter } from 'src/app/Models/flight/Amadeus/AirlineTopFilter';
import { FlightService } from 'src/app/services/flight.service';
import { SharedService } from 'src/app/services/shared.service';
import { SlideInOutAnimation } from './animations';
import { MicroService } from 'src/app/services/micro.service';
import { log } from 'console';

@Component({
  selector: 'app-one-way-trip',
  templateUrl: './one-way-trip.component.html',
  styleUrls: ['./one-way-trip.component.scss'],
  animations: [SlideInOutAnimation]
})
export class OneWayTripComponent {
  activeIndex = 0;
  sort: any[];
  selectedCities: string[] = [];
  listedFlightIndex: any = {
    index: null,
    flightLength: null,
    flightRtnLength: null,
    flightRtnIndex: null
  };

  public bookedFlightData: any = {};
  public filterListWithStop: any = {};
  public filteredFlightsData: any;

  @Input() filteredFlightData: any;
  @Input() filteredFlightFormData: any;
  @Input() reqModel: any;



  @Input() searchType: string = 'oneWay'
  @Input() flightsearch_res: any;
  @Input() recomm: any;
  @Input() supplier: string="";

  city: any;
  selectedFlightIndex: number = -1;
  public flightID: number = 0;
  minPrice: number = 0;
  public selectedCurrency: string = 'QAR';
  public activeFlightRow: number | null = null;

  position: string;
  calcPosition: string;
  displayPosition: boolean;
  displayPositionCalc: boolean;
  public noDataAvailable: boolean = false;
  airlineTopFilter!: AirlineTopFilter[];
  airlineTopFilterCopy = [];
  constructor(private _flightService: FlightService, public _sharedService: SharedService, public _microService: MicroService, private cdr: ChangeDetectorRef) {
    this.sort = [
      { name: "Ascending", value: "ascending" },
      { name: "Descending", value: "descending" },
      { name: "Low to high", value: "LTH" },
      { name: "High to low", value: "HTL" },
    ];
  }

  ngOnInit() {
    this.cdr.detectChanges();
  }

  calclateInstallMentData(percentage: any, installmentsTimes: number, totalFare: any) {
    const defaultValue = totalFare ?? 0;
    const balancePercentage = (100 - (percentage < 20 ? 20 : percentage > 100 ? 100 : percentage)) / 100;
    const eachInstallmentAmount = (defaultValue * balancePercentage) / (installmentsTimes);
    let balanceInstallment = (defaultValue * balancePercentage);
    return ((balanceInstallment * 0.05) + eachInstallmentAmount);

  }

  showPositionDialog(position: string, FlightDetails: any) {

    console.log(FlightDetails,'line 80');
    
    this.position = position;
    this.displayPosition = true;
    let selectedFare = FlightDetails.flights.find((flights: any) => flights.isSelected);
    let installmentData = {
      dateOfDeparture: this._microService?.getFormatedFlightDate(selectedFare?.Trips[0]?.FlightSegments[0].DepartureDate),
      totalFare: FlightDetails?.amount,
      currency: "NGN",
      minimumDownPayment: 20,
      initialDownPayment: FlightDetails.installmentAmount ?? 0,
      splitInstallmentCount: 1,
      installementSplitAmount: {
        installmentDetails: {
              "1":  this.calclateInstallMentData(20,1,FlightDetails?.amount)
          }
      }
  }
    selectedFare.flightFareInstallementDetails = FlightDetails?.payAsYouEarnActive ? installmentData : null;
    this.bookedFlightData = selectedFare;
  }
  showCalculateDialog(FlightDetails: any) {
    this.calcPosition = 'center';
    this.displayPositionCalc = true;
    this.bookedFlightData = FlightDetails.flights.find((flights: any) => flights.isSelected);
  }
  filterWithPrice(flightRecomondation: any) {

  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(this.filteredFlightData, "sdsdlksdlk");
    if (changes['filteredFlightData']?.currentValue) {
      if (this.filteredFlightData?.CombinedBound?.length) {
        // this.getLowestFareByCarrier(this.filteredFlightData?.CombinedBound);
      }
    }
  }
  togglePaymentOption(flightRecomondation: any, state: boolean = true) {
    flightRecomondation.payAsYouEarnActive = state;
  }
  // @ViewChild('overlayPanel') overlayPanel: OverlayPanel;
  showOverlayPanel(event: MouseEvent) {
    // this.overlayPanel.show(event);
  }
  hideOverlayPanel(event: MouseEvent) {
    // this.overlayPanel.hide();
  }

  changedEvents(event: any) {
    this.showCalculateDialog(event);
  }

  expandFlightData(rowIndex: number, columnIndex: number) {
    this.activeFlightRow = rowIndex === this.activeFlightRow ? null : rowIndex;
  this.scrollToDiv(rowIndex) 
  }

  scrollToDiv(index) {
    // var divToScroll = document.getElementById('div' + index);
    // if (divToScroll) {
    //   divToScroll.scrollIntoView({ behavior: 'smooth', block: 'start'});
    // }
  }

  setActiveFlightSelection(flightlist: any[], selectedIndex: number) {
    flightlist.forEach((item: any, index: number) => {
      if (index === selectedIndex) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }
    });

    this.activeFlightRow = null;
  }

}
