import { Component } from '@angular/core';

@Component({
  selector: 'app-hotel-result',
  templateUrl: './hotel-result.component.html',
  styleUrls: ['./hotel-result.component.scss']
})
export class HotelResultComponent {
  rangeValues: number[] =[120,6000];
  activeIndex = 0;
  sort: any[];
  depandDepartureActive:any;
  depandReturnActive: any;
  constructor() {
    this.sort = [
      { name: "New York", code: "NY" },
      { name: "Rome", code: "RM" },
    ];
   }

  ngOnInit(): void {
  }
  ngOnChanges() {
    this.depandDepartureActive = 0
    this.depandReturnActive = 0;
  }
  filterFlightByDeparture(departureTime: string, event: any) {
    this.depandDepartureActive = event;
  }
  filterFlightByReturn(departureTime: string, event: any){
    this.depandReturnActive = event;
  }
}
