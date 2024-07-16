import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { FlightService } from 'src/app/services/flight.service';

@Component({
  selector: 'app-transists-airports',
  templateUrl: './transists-airports.component.html',
  styleUrls: ['./transists-airports.component.scss']
})
export class TransistsAirportsComponent {

  AirlineFilterForm: FormGroup;
  AirlineList = [];
  @Input() list:any;
  @Input() title:string="";
  @Input() filterType = "airline";
  public showCount  : number = 6;

  @Output() onChangeAirline: EventEmitter<any> = new EventEmitter();


  constructor(private formBuilder: FormBuilder, private _flightService: FlightService) {
    
  }

  ngOnInit() {
     this.AirlineList = this.list;
    //  this.AirlineFilterForm.valueChanges.subscribe((data:any) => {
    //  })
  }

  private addCheckboxes() {
    for (const code in this.list) {
      if (this.list.hasOwnProperty(code)) {
        this.AirlineFilterForm.controls['AirlineList'] as FormArray  
        (this.AirlineFilterForm.controls['AirlineList'] as FormArray).push(new FormControl(false));
      }
    }
  }

  getAirlineList() {
    return this.list;
  }
  airlineControl(){
  return this.AirlineFilterForm.controls['AirlineList'] as FormArray;
 }
  submit(data:any) {

  let vendor ={
    verdorFilter: [],
    type:'airline'
  };
  const selectedOrderIds = data.map((v, i) => v ?  Object.keys(this.list)[i]  : null)
  .filter(v => v !== null);
  vendor.verdorFilter = selectedOrderIds;
  vendor.type = this.filterType;
  this.onChangeAirline.emit(vendor);
  }

  setFilterCount(length: number){
    if(this.showCount === length){
      this.showCount = 7;
    }
    else{
      this.showCount = length;
    }
  }

  resetForm(){
    (this.AirlineFilterForm.controls['AirlineList'] as FormArray).controls.forEach((element, index) => {
      element.reset(false);
    });
    this._flightService.applyFlightsFilters([]);
  }

  getCarrierItem(index:number){
    return Object.keys(this.list)[index];
  }

  changeCheckBox(event: any){
    this.submit(this.AirlineFilterForm.value?.AirlineList);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.AirlineFilterForm = this.formBuilder.group({
      AirlineList: new FormArray([])
    });
    if (changes['list'].currentValue !== null && changes['list'].currentValue !== undefined) {
      this.addCheckboxes();
    }
  };
}