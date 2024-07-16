import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FlightService } from 'src/app/services/flight.service';
import { CabinList } from '../../search-engine.util';

@Component({
  selector: 'app-select-cabin',
  templateUrl: './select-cabin.component.html',
  styleUrls: ['./select-cabin.component.scss']
})
export class SelectCabinComponent implements OnInit  {
  selectedCountry: string = "";
  countries: any[];
  public cabinList = CabinList;
  @Input() searchFlightCabinValue:any;
  public initialValue :any =  {name: 'Economy', value: '0', subValue : 'ECONOMY'  };
  SelectedCabin = new FormControl(this.initialValue);
  constructor(private _flightService: FlightService){}
  ngOnInit() {
    this._flightService.editCabinDetails(this.initialValue);
    this.SelectedCabin.valueChanges.subscribe((data:any)=>{
      this._flightService.editCabinDetails(data);
    });
    this.serachFormValue();
  }

  serachFormValue(){
    if( this.searchFlightCabinValue !== undefined && this.searchFlightCabinValue !== null ){
      this.SelectedCabin.patchValue(this.searchFlightCabinValue );
      this._flightService.editCabinDetails(this.searchFlightCabinValue);
    }
  } 
}
