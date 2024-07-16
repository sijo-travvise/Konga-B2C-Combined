import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FlightService } from 'src/app/services/flight.service';
import { IPassengerList, PassengerList } from '../../search-engine.util';

@Component({
  selector: 'app-select-passenger',
  templateUrl: './select-passenger.component.html',
  styleUrls: ['./select-passenger.component.scss']
})
export class SelectPassengerComponent implements OnInit{
  public isAdultButtonDisable=false;
  public isChildButtonDisable=false;
  public isInfantButtonDisable=false;

  public totalPassengerCount = null;
  public adultCount = 1;
  public childCount = 0;
  public infantCount = 0;

  changeText = "Passenger";
  public passengerList = PassengerList;
  @Input() searchFlightPassengerValue:any;
  

  passenger:any={
    adult:1,
    childeren:0,
    infant:0,
    total:1,
    cabinClass:'e',
    cabinClassFull:'Economy'
  }

  constructor(  private _flightService: FlightService){}

  public totalLimit:number = 1;

  @Output() passengerChange = new EventEmitter<any>();
  ngOnInit() {
    // console.log(this.searchFlightPassengerValue, this.totalLimit);   
    // debugger; 
    this._flightService.editPassengerCount(this.passengerList);
    if(this.searchFlightPassengerValue?.length > 0){
      this.totalLimit =0
      this.searchFlightPassengerValue.forEach((passenger: any) =>{
        if(passenger.passengerType.toLowerCase() === "child" || passenger.passengerType.toLowerCase() === "adult" ){
          this.totalLimit+=passenger.count;
        }
  
      })
      this._flightService.editPassengerCount(this.searchFlightPassengerValue);
      this.passengerList = this.searchFlightPassengerValue;
    }
  }

  passengerCount(calculateType: string, passengerType: string, e: any, index: number) {
    e.stopPropagation();
    e.preventDefault();
    let adultPassenger = this.passengerList.find((passenger: IPassengerList) => passenger?.passengerType?.toLowerCase() === 'adult');
    // let childPassenger = this.passengerList.find((passenger: IPassengerList) => passenger?.passengerType?.toLowerCase() === 'child');
    // let infantPassenger = this.passengerList.find((passenger: IPassengerList) => passenger?.passengerType?.toLowerCase() === 'infant');
   

    // increment the passenger
    if (calculateType === 'increment' && (this.totalLimit<9 || passengerType?.toLowerCase() === "infant") ) {
      if (passengerType?.toLowerCase() === "adult" && this.passengerList[index].count <= 9) {
        this.passengerList[index].count+=1;
        
      }
      else if (passengerType?.toLowerCase() === "child") {
        this.passengerList[index].count += 1;
      }
      else {
        if (adultPassenger?.count > this.passengerList[index]?.count) {
          this.passengerList[index].count = this.passengerList[index].count + 1;
        }
      }
    }
     // decrement the passenger
    else if(calculateType === 'decrement') {
      if (passengerType?.toLowerCase() === "adult") {
        this.passengerList[index].count = this.passengerList[index].count > 2 ? this.passengerList[index].count - 1 : 1;
        // if(infantPassenger.count > this.passengerList[index].count) {
        //   this.passengerList.map((passenger:IPassengerList) =>{
        //     if(passenger.passengerType)
        //   })
        // }
      }
      else if (passengerType?.toLowerCase() === "child") {
        this.passengerList[index].count = this.passengerList[index].count > 0 ? this.passengerList[index].count - 1 : 0;
      }
      else {
        this.passengerList[index].count = this.passengerList[index].count > 0 ? this.passengerList[index].count - 1 : 0;
      }
    }
    this.totalLimit = 0
    this.passengerList = this.passengerList.map((passengers:IPassengerList) =>{
      if(passengers.passengerType.toLowerCase() === "child" || passengers.passengerType.toLowerCase() === "adult" ){
        this.totalLimit+=passengers.count
      }
      else{
        if(passengers.count> adultPassenger?.count ){
          passengers.count-=1
        }
      }

      return passengers;
    })
    // this.totalLimit = adultPassenger.count + childPassenger.count;
    this._flightService.editPassengerCount(this.passengerList);
  }


  stopEventProp(e:any){
    e.stopPropagation();
    e.preventDefault();
  }


  addPassenger(e:any){
    if (e != null) {
      // this.totalPassengerCount= this.passenger.total;//this.adult_count+this.child_count+this.infant_count;
      // this.passengerChange.emit(this.passengerList);
      this._flightService.editPassengerCount(this.passengerList);

    }

  }

}
