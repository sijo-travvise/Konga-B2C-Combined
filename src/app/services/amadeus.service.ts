import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SearchReqUIModel } from '../Models/flight/Amadeus/Fare_MasterPricerTravelBoardSearch';
import { Fare_GetFareFamilyDescriptionUIModel } from '../module/flight/flight-result-body/modal/Fare_GetFareFamilyDescriptionReqModel';
import { Fare_PriceUpsellWithoutPNRUIModel } from '../module/flight/flight-result-body/modal/Fare_PriceUpsellWithoutPNRUIModel';
import { Air_SellFromRecommendationUIModel } from '../module/flight/passenger-details/passenger-details.util';
import { PNRAddMultiElementsUIModel } from '../module/flight/passenger-details/PNR_AddMultiElementsReqModel';

@Injectable({
  providedIn: 'root'
})
export class AmadeusService {

  readonly flightsearchurl = environment.apiUrl;

  constructor(private http:HttpClient) { }

  Fare_MasterPricerTravelBoardSearch(reqmodel:SearchReqUIModel): Observable<any> {
    return this.http.post<any>(this.flightsearchurl + "api/Fare_MasterPricerTravelBoardSearch" , reqmodel);
  }

  FARE_PRICEUPSELLWITHOUTPNR(reqmodel:Fare_PriceUpsellWithoutPNRUIModel): Observable<any> {
    return this.http.post<any>(this.flightsearchurl + "api/FARE_PRICEUPSELLWITHOUTPNR" , reqmodel);
  }
  FARE_GETFAREFAMILYDESCRIPTION(reqmodel:Fare_GetFareFamilyDescriptionUIModel): Observable<any> {
    return this.http.post<any>(this.flightsearchurl + "api/FARE_GETFAREFAMILYDESCRIPTION" , reqmodel);
  }

  AIR_SELLFROMRECOMMENDATION(reqmodel:Air_SellFromRecommendationUIModel): Observable<any> {
    return this.http.post<any>(this.flightsearchurl + "api/AIR_SELLFROMRECOMMENDATION" , reqmodel);
  }
  PNR_ADDMULTIELEMENTS(reqmodel:PNRAddMultiElementsUIModel): Observable<any> {
    return this.http.post<any>(this.flightsearchurl + "api/PNR_ADDMULTIELEMENTS" , reqmodel);
  }
  FARE_PRICEPNRWITHBOOKINGCLASS(reqmodel:any): Observable<any> {
    return this.http.post<any>(this.flightsearchurl + "api/FARE_PRICEPNRWITHBOOKINGCLASS" , reqmodel);
  }
  TICKET_CREATETSTFROMPRICING(reqmodel:any): Observable<any> {
    return this.http.post<any>(this.flightsearchurl + "api/TICKET_CREATETSTFROMPRICING" , reqmodel);
  }
  PNR_Retention(reqmodel:PNRAddMultiElementsUIModel): Observable<any> {
    return this.http.post<any>(this.flightsearchurl + "api/PNR_Retention" , reqmodel);
  }
  PNR_RETRIEVE(reqmodel:any): Observable<any> {
    return this.http.post<any>(this.flightsearchurl + "api/PNR_RETRIEVE" , reqmodel);
  }

  
  SECURITY_SIGNOUT(reqmodel:any): Observable<any> {
    return this.http.post<any>(this.flightsearchurl + "api/SECURITY_SIGNOUT" , reqmodel);
  }


}
