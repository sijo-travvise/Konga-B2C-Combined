import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SearchReqUIModel } from '../Models/flight/Amadeus/Fare_MasterPricerTravelBoardSearch';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly flightSearch = environment.apiUrl;
  public selectedCurrency:any;
  public exchangeRate:any;
  constructor(private http:HttpClient) { }

  airLineCity() {
    return this.http.get<any>('assets/json/AirIntCitys.json')
      .toPromise()
      .then(res => <any[]>res.data)
      .then(data => { return data; });
    }

  
  Low_CostFlightsSearch(reqmodel:SearchReqUIModel): Observable<any> {
    let amadeusPrice = this.http.post<any>(this.flightSearch + "api/Fare_MasterPricerTravelBoardSearch" , reqmodel);
    return (amadeusPrice);
  }

  GetAllCurrencies(): Observable<any[]> {
    return this.http.get<any>(this.flightSearch + "api/Common/GetAllCurrencies");
  }


  GetTimeFormatFlights(amadeusDateFormat?: any, jouneyType: string = '') {
    var date = jouneyType === 'Departure' ? amadeusDateFormat?.dateOfDeparture : amadeusDateFormat?.dateOfArrival;;
    var time = jouneyType === 'Departure' ? amadeusDateFormat?.timeOfDeparture : amadeusDateFormat?.timeOfArrival;
    var stringDate = "20" + date.charAt(4) + date.charAt(5) + "-" + date.charAt(2) + date.charAt(3) + "-" + date.charAt(0) + date.charAt(1);
    var stringTime = time.charAt(0) + time.charAt(1) + ":" + time.charAt(2) + time.charAt(3) + ":00";
    var stringDateTime = stringDate + "T" + stringTime;
    return new Date(stringDateTime);
  }

  GetDateFormat(amadeusDateFormat?: any) {
    var stringDate = "20" + amadeusDateFormat.charAt(4) + amadeusDateFormat.charAt(5) + "-" + amadeusDateFormat.charAt(2) + amadeusDateFormat.charAt(3) + "-" + amadeusDateFormat.charAt(0) + amadeusDateFormat.charAt(1);
    return new Date(stringDate);
  }
  GetDurationOfSegment(amadeusDateFormatList?: any) {
    // let firstFlightDetails = amadeusDateFormatList[0];
    // let lastFlightDetails = amadeusDateFormatList[amadeusDateFormatList.length - 1];
    var timeDep = this.GetTimeFormatFlights(amadeusDateFormatList?.flightInformation?.productDateTime, "Departure");
    var timeArr = this.GetTimeFormatFlights(amadeusDateFormatList?.flightInformation?.productDateTime, "Arrival");

    var Time = new Date(timeArr).getTime() - new Date(timeDep).getTime();
    return Math.floor(Time / (1000 * 60 * 60)) + " hr " + Math.floor(Time / (1000 * 60)) % 60 + " min";
  }

  CalculateLayOverV2(flightDetails: any, index: any) {
    let date1: any, date2: any;
     date1 = this.GetTimeFormatFlights(flightDetails[index]?.flightInformation?.productDateTime, "Arrival");
    date2 = this.GetTimeFormatFlights(flightDetails[index + 1]?.flightInformation?.productDateTime,'Departure');
    var Time = new Date(date2).getTime() - new Date(date1).getTime();
    return Math.floor(Time / (1000 * 60 * 60)) + " hr " + Math.floor(Time / (1000 * 60)) % 60 + " min";

  }

  public getLocalStore = (key: string): any => {
    if (localStorage && typeof localStorage !== 'undefined') {
      const item:any = localStorage.getItem(key);
      if (item != "undefined") {
        return JSON.parse(item);
      } else {
        return undefined;
      }
    }
  }

  public setLocalStore = (key: string, value: any) => {
    if (localStorage && typeof localStorage !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  GetSelectedCurrency(){
    this.selectedCurrency = this.getLocalStore("selectedCurrencyFromResult");
    return this.selectedCurrency;
  }

  getCountryListData(): Observable<any> {
    return this.http.get<any>(this.flightSearch + "api/Passanger/FetchAllCountries");
  }
  CalculateCurrExchangeRate(oldAmount?:any, exchangeRate?:any){
    // this.exchangeRate = this.getLocalStore("exchangeRate");
     return (oldAmount * exchangeRate).toFixed(2);
   }
   getAllCountry(): Observable<any[]> {
    return this.http.get<any>("assets/json/countries.json").pipe(
      map((res: any[]) => {
        return res;
      })
    );
  }
  getAllCountryStates(): Observable<any[]> {
    return this.http.get<any>("assets/json/CountryStates.json").pipe(
      map((res: any[]) => {
        return res;
      })
    );
  }

  calculateLayoverTime(date1:any,date2:any){
    var Time = new Date(date2).getTime() - new Date(date1).getTime(); 
    return Math.floor(Time/(1000*60*60)) + " hrs " + Math.floor(Time/(1000*60))%60+" mins";
  }


  convertTimeDuration(duration: string, segData: boolean = false): string {
    const durationParts = segData ? duration.match(/(\d+)\s*(hrs?|hours?|h)\s*(\d+)\s*(mins?|minutes?|m)/i) : duration.match(/(\d+)\s*(hrs?|hours?|h)\s*(\d+)\s*(mins?|minutes?|m)/i);
    if (!durationParts || !durationParts.length) {
      return ""; // Invalid input format
    }
    const hours = parseInt(durationParts[1]);
    const minutes = parseInt(durationParts[3]?? '3');

    const isoDuration = `PT${hours}H${minutes}M`;
    return isoDuration;
  }

  convertDurationToCustomFormat(isoDuration: string): string {
    const durationRegex = /PT(\d+)H(\d+)M/i;
    const match = isoDuration.match(durationRegex);

    if (match) {
      const hours = parseInt(match[1]);
      const minutes = parseInt(match[2]);
      return `${hours} H ${minutes} M`;
    } else {
      return isoDuration; // Return original string if not in the expected format
    }
  }


  getInstallmentAmount( amount: any,percentage: any) {
    const twentyPercent = amount * (percentage / 100);
    const twoPercentOfEightyPercent = (amount * ((100  - percentage )/ 100)) * 0.02;
    return twentyPercent + twoPercentOfEightyPercent
  }

  getInstallationDateDuration( givenDateString: string){
    const givenDate: Date = new Date(givenDateString);
    const today: Date = new Date();
    const differenceInMilliseconds: number = givenDate.getTime() - today.getTime();
    const millisecondsIn7Days: number = 7 * 24 * 60 * 60 * 1000;
    return differenceInMilliseconds > millisecondsIn7Days;
  }
  

  GetAllSuppliers(supplierType: number = 0): Observable<any[]> {
    return this.http.get<any>(this.flightSearch + "api/Common/GetAllSuppliers?type=" + supplierType);
  }

  
  GetAllAirLines(): Observable<any[]> {
    return this.http.get<any>(this.flightSearch + "api/Common/GetAllAirLines");
  }

  getMyIP() {
    return this.http.get<any>("https://api.ipify.org/?format=json");
  }


}
