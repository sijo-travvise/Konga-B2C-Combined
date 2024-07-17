import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-flight-list-fliter',
  templateUrl: './flight-list-fliter.component.html',
  styleUrls: ['./flight-list-fliter.component.scss']
})
export class FlightListFliterComponent {

  @Input() commonResult: any = [];
  @Input() airlineList: any = null;
  @Output() selectedFlightLowestFIlter: EventEmitter<any> = new EventEmitter<null>;

  airlineTopFilterCopy = [];

  ngOnInit() {
    // this.getLowestFareByCarrier(this.commonResult);
  };

  clearFareFilter() {
    ['nonStop', 'oneStop', 'twoStop'].forEach((stops: string) => {

      this.airlineTopFilterCopy.map((airline: any) => {
        airline[stops].isSelected = false;
      });
    });
    this.filterFlightSearchData(this.airlineTopFilterCopy);
  }

  getLowestFareByCarrier(resultList: any) {
    console.log('enter rge  eenheheeh')
    const airlineTopFilterCopy = [];
    resultList.forEach((offerItem: any) => {
      if (offerItem?.supplier === 'Verteil') {
        offerItem?.offer?.flights.forEach((flightDetail: any) => {
          const trip = flightDetail.Trips[0]; // Considering only the first trip
          const airline = trip?.FlightSegments[0]?.marketingAirlineName;
          const airlineCode = trip?.FlightSegments[0]?.MarketingAirline;
          const flightSegmentCount = trip.FlightSegments.length;

          const stopKey = flightSegmentCount === 1 ? 'nonStop' : flightSegmentCount === 2 ? 'oneStop' : 'twoStop';
          const stopData = {
            // FSC: flightDetail.FSC,
            id: offerItem.id,
            supplier: offerItem.supplier,
            PriceTotal: flightDetail.PriceSummary.PriceTotal,
            isSelected: false,
          };

          let existingAirline = airlineTopFilterCopy.find(item => item.ValidatingAirline === airline);

          if (existingAirline) {
            if (!existingAirline[stopKey] || existingAirline[stopKey].PriceTotal > stopData.PriceTotal) {
              existingAirline[stopKey] = stopData;
            }
          } else {
            airlineTopFilterCopy.push({
              FSC: offerItem.supplier,
              id: offerItem.id,
              ValidatingAirline: airline,
              airlineCode: airlineCode,
              nonStop: stopKey === 'nonStop' ? stopData : {},
              oneStop: stopKey === 'oneStop' ? stopData : {},
              twoStop: stopKey === 'twoStop' ? stopData : {},
            });
          }
        });
      }
    });

    this.airlineTopFilterCopy.push(...airlineTopFilterCopy);

    const lists = resultList.reduce((acc, flight) => {
      if (flight.supplier === '1A') {
        const carrierCode = flight?.offer?.itineraries[0].segments[0].carrierCode;
        const segmentCount = flight?.offer?.itineraries[0].segments.length;
        const stops = segmentCount === 1 ? 'nonStop' : segmentCount === 2 ? 'oneStop' : 'twoStop';

        const existingAirline = acc.find(item => item.airlineCode === carrierCode);
        const existingAirlineMain = airlineTopFilterCopy.find(item => item.airlineCode === carrierCode);

        if (existingAirline) {
          existingAirline[stops] = {
            id: flight.id,
            supplier: flight.supplier,
            PriceTotal: parseFloat(flight.fare),
            isSelected: false,
          };
        } else if (existingAirlineMain) {
          if ((existingAirlineMain[stops]?.PriceTotal ?? Infinity) > parseFloat(flight.fare)) {
            existingAirlineMain[stops] = {
              id: flight.id,
              supplier: flight.supplier,
              PriceTotal: parseFloat(flight.fare),
              isSelected: false,
            };
          }
        } else {
          acc.push({
            FSC: flight.supplier,
            id: flight.id,
            ValidatingAirline: this.airlineList[carrierCode] ?? carrierCode,
            airlineCode: carrierCode,
            nonStop: stops === 'nonStop' ? { PriceTotal: parseFloat(flight.fare), isSelected: false, id: flight.id, supplier: flight.supplier } : {},
            oneStop: stops === 'oneStop' ? { PriceTotal: parseFloat(flight.fare), isSelected: false, id: flight.id, supplier: flight.supplier } : {},
            twoStop: stops === 'twoStop' ? { PriceTotal: parseFloat(flight.fare), isSelected: false, id: flight.id, supplier: flight.supplier } : {},
          });
        }
      }
      return acc;
    }, []);
    this.airlineTopFilterCopy.push(...lists);
  }

  selectedFlight(airline: any, data: any) {
    data.isSelected = !data.isSelected;
    this.filterFlightSearchData(this.airlineTopFilterCopy);
  }

  filterFlightSearchData(data: any) {

    let filteredArray: any = this.airlineTopFilterCopy.filter(item => {
      return Object.values(item).some((stop: any) => {
        return stop && stop.isSelected === true;
      });
    });

    this.commonResult?.forEach((flightItem: any) => {
      let cardAirFilterShow = false;
      flightItem.offer.isAirShowFilterCard = filteredArray?.length ? false : true;

      filteredArray?.map((filterAirArray: any) => {
        if (flightItem?.id === filterAirArray?.nonStop?.id || flightItem?.id === filterAirArray?.oneStop?.id || flightItem?.id === filterAirArray?.twoStop?.id) {
          // console.log(flightItem);
          if (flightItem?.supplier === '1A') {
            if (flightItem?.id === filterAirArray?.nonStop?.id && filterAirArray?.nonStop?.isSelected) {
              flightItem.offer.isAirShowFilterCard = true;
            }
            if (flightItem?.id === filterAirArray?.oneStop?.id && filterAirArray?.oneStop?.isSelected) {
              flightItem.offer.isAirShowFilterCard = true;
            }
            if (flightItem?.id === filterAirArray?.twoStop?.id && filterAirArray?.twoStop?.isSelected) {
              flightItem.offer.isAirShowFilterCard = true;
            }

          }
          else {
            flightItem?.offer?.flights?.map((flights: any, flightIndex: number) => {

              if (Object.keys(filterAirArray?.nonStop)?.length && filterAirArray?.airlineCode === flights?.Trips[0]?.ValidatingAirline && filterAirArray?.nonStop?.isSelected) {
                flights.airShowFilter = true;
                cardAirFilterShow = true;
              }
              if (Object.keys(filterAirArray?.oneStop)?.length && filterAirArray?.airlineCode === flights?.Trips[0]?.ValidatingAirline && filterAirArray?.oneStop?.isSelected) {
                flights.airShowFilter = true;
                cardAirFilterShow = true;
              }
              if (Object.keys(filterAirArray?.twoStop)?.length && filterAirArray?.airlineCode === flights?.Trips[0]?.ValidatingAirline && filterAirArray?.twoStop?.isSelected) {
                flights.airShowFilter = true
                cardAirFilterShow = true;
              }
            });
            flightItem.offer.isAirShowFilterCard = cardAirFilterShow;
          }
        }
      });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['commonResult']?.currentValue !== null && changes['commonResult']?.currentValue !== undefined && changes['commonResult']?.currentValue?.length) {
      this.getLowestFareByCarrier(this.commonResult);
    }
  }
}
