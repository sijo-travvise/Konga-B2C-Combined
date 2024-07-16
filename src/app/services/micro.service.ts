import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MicroService {

  readonly flightSearch = environment.apiUrl;
  public selectedCurrency:any;
  public exchangeRate:any;
  constructor(private http:HttpClient, private datePipe: DatePipe) { }


  // microservice flights common functions

  getFormatedFlightTime(time: string, isHour: boolean = false) {
    const hours = time.substring(0, 2);
    const minutes = time.substring(2, 4);
    return isHour ? `${hours} Hr :${minutes} Min` : `${hours}:${minutes}`;
  }

  
  getFormatedFlightDate(dateString: string, isDay: boolean = false, formats = 'yy-MMM-dd') {
    const currentYear = new Date().getFullYear().toString().slice(0, 2); // Get the current year's first two digits
    const year = currentYear + dateString.slice(0, 2); // Combine the current year's first two digits with the first two digits from the input
    return (this.datePipe.transform(new Date(year + '-' + dateString.slice(2, 4) + '-' + dateString.slice(4, 6)), isDay ? 'EE yy-MMM-dd' : formats));

  }


  calculateLayover(layOverIndex: number,flightSegments: any){
    const  DepartureTime = this.getFormatedFlightTime(flightSegments[layOverIndex + 1].DepartureTime, false);
    const  ArrivalTime =  this.getFormatedFlightTime(flightSegments[layOverIndex].ArrivalTime, false);
    const  DepartureDate = this.getFormatedFlightDate(flightSegments[layOverIndex + 1].DepartureDate, false);
    const  ArrivalDate =  this.getFormatedFlightDate(flightSegments[layOverIndex].ArrivalDate, false);
 
    let combinedDateTime1 = new Date(`${ArrivalDate} ${ArrivalTime}`);
    let combinedDateTime2 = new Date(`${DepartureDate} ${DepartureTime}`);
    // Calculate the time difference in milliseconds
    let timeDiffInMs = Math.abs(combinedDateTime2.getTime() - combinedDateTime1.getTime());
    
    // Calculate hours and minutes from milliseconds
    let hours = Math.floor(timeDiffInMs / (1000 * 60 * 60));
    let minutes = Math.floor((timeDiffInMs % (1000 * 60 * 60)) / (1000 * 60));
     return (`${hours} hr ${minutes} min`)
  }



}
