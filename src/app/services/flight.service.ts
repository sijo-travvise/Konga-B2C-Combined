import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SearchReqUIModel } from '../Models/flight/Amadeus/Fare_MasterPricerTravelBoardSearch';
import { amadeusRequestModel } from '../Models/flight/Amadeus/flight-offer.model';
import { flightUpsell } from '../Models/flight/Amadeus/flight-upsell-model';
import { flightPricing } from '../Models/flight/Amadeus/flight-pricing.model';
import { FlightOrder } from '../Models/flight/Amadeus/flight-order.model';
import { EmailDetailsModel } from '../Models/Mail/EmailDetailsModel';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { log } from 'console';


@Injectable({
  providedIn: 'root'
})
export class FlightService {

//Ameseus API's
  readonly flightSearch = environment.apiUrl;
  //micro service API's
  readonly flightsearchurl =  environment.flightsearchurl;
  readonly flightBookurl =  environment.flightBookurl
  //readonly vertailUrl = environment.vertailUrl

  constructor(private http: HttpClient,
              private sanitizer: DomSanitizer
  ) { }

  private passengerCount = new BehaviorSubject<any>({});
  private cabinData = new BehaviorSubject<any>({});
  popularFilterdData = new BehaviorSubject<any>({});
  flightsFilterdData = new BehaviorSubject<any>([]);

  castpassengerCount = this.passengerCount.asObservable();
  castCabinCount = this.cabinData.asObservable();
  castFilteredData = this.popularFilterdData.asObservable();
  castFlightsFilteredData = this.flightsFilterdData.asObservable();

  editPassengerCount(newpassengerCount: any) {
    this.passengerCount.next(newpassengerCount);
  }
  editCabinDetails(newCabinData: any) {
    this.cabinData.next(newCabinData);
  }
  applyPopularFilters(filtersData: any) {
    this.popularFilterdData.next(filtersData);
  }
  applyFlightsFilters(filtersData: any) {
    this.flightsFilterdData.next(filtersData);
  }


  // searchFlightData(reqmodel:amadeusRequestModel): Observable<any> {
  //   return this.http.post<any>(this.flightSearch + "api/Fare_MasterPricerTravelBoardSearch" , reqmodel);
  // }

  FlightOfferlist(flightobj: amadeusRequestModel): Observable<any> {
    return this.http.post<any>(this.flightSearch + "api/AmadeusAPI/FlightOffer", flightobj);
  }

  FlightUpsellData(upsellData: flightUpsell): Observable<any> {
    return this.http.post<any>(this.flightSearch + "api/AmadeusAPI/Upselling", upsellData);
  }
  flightPriceData(pricingData: flightPricing) {
    return this.http.post<any>(this.flightSearch + "api/AmadeusAPI/Pricing", pricingData);
  }
  FlightOrders(flightOrdersRequestObj: FlightOrder): Observable<any> {
    return this.http.post<any>(this.flightSearch + 'api/AmadeusAPI/FlightOrder', flightOrdersRequestObj);
  }

  GetHash(amount: number, public_key: string, reference: string): Observable<any> {
    return this.http.get(this.flightSearch + 'api/Common/GenerateSha512HashKey?amount=' + amount + '&public_key=' + public_key + '&reference=' + reference); //, {responseType: 'text'}
  }

  flightItenararyDetails(locatorCode: string, paymentStatus: any) {
    return this.http.get<any>(this.flightSearch + "api/AmadeusAPI/RetrivePNR?reference=" + locatorCode + "&paymentStatus=" + paymentStatus);
  }
  SendConfirmationEmail(reqmodel:any): Observable<any> {
    return this.http.post<any>(this.flightSearch + "api/Mail/SendEmailWithAttachment" , reqmodel);
  }
  GenerateEmail(emailDetailsModel: EmailDetailsModel): Observable<any> {
    return this.http.post<any>(this.flightSearch + 'api/Common/GenerateEmail', emailDetailsModel);
  }

  //Micro service methods
  flightSearchRequest(parameters: any): Observable<any> {
    let queryParams = new HttpParams({ fromObject: parameters });
    return this.http.get<any>(this.flightsearchurl + "api/search/search", { params: queryParams });
  }

  flightFareRevalidate(key: any): Observable<any> {
    return this.http.post<any>(this.flightBookurl + "api/PNR/Revalidate", key);
  }


  createFlightPNR(pnrData: any): Observable<any> {
    return this.http.post<any>(this.flightBookurl + "api/PNR/createpnr", pnrData);
  }


  savePnrData(pnrSaveData: any): Observable<any> {
    return this.http.post<any>(this.flightBookurl + "api/Booking/Save", pnrSaveData);
    //return this.http.post<any>(this.vertailUrl + "api/booking/SaveBookingDetails", pnrSaveData);
  }

  // getBookingDetails(bookingRefID: number): Observable<any> {
  //   return this.http.get<any>(this.flightBookurl + "api/Booking/bookingdetails?bookingId="+bookingRefID); 
  // }
  
  getBookingDetails(bookingRefID: string): Observable<any> {
    return this.http.get<any>(this.flightBookurl + "api/Booking/bookingdetails?bookingId=" + bookingRefID);
  } 

  retrieveAirArabiaPNR(pnrData: any): Observable<any> {

    return this.http.post<any>(this.flightBookurl + "api/PNR/SyncPNR", pnrData);
  }

  createIssueTicket(pnrData: any): Observable<any> {

    return this.http.post<any>(this.flightBookurl + "api/Booking/IssueTicket", pnrData);
  }


  microServiceFlightSearch(reqmodel: any): Observable<any> {
    return this.http.post<any>(this.flightsearchurl + "api/search/search", reqmodel);
  }

  getFlexifareDeatils(params: any): Observable<any> {
    return this.http.post<any>(this.flightsearchurl + "api/search/GetFlexifareDeatils", params);
  }


  getDescriptionList(description: string): SafeHtml[] | any {
    // return description.split(/[\n,]+/);
    //  return description!.split(/,|\n+/).filter((line) => line.trim() !== '');

    const parts = description.split(/,|\n+/).map((part) => part.trim());
    const processedParts = parts.map((part) => {
      if (/<a\s[^>]*href=/.test(part)) {
        return part;
      } else if (/(https?:\/\/[^\s]+)/.test(part)) {
        const urlMatch = part.match(/(https?:\/\/[^\s]+)/);
        if (urlMatch) {
          const url = urlMatch[0];
          return part.replace(
            url,
            `<a href="${url}" target="_blank">${url}</a>`
          );
        }
      }
      return part;
    });
    return processedParts.map((part) =>
      this.sanitizer.bypassSecurityTrustHtml(part)
    );
  }
}
