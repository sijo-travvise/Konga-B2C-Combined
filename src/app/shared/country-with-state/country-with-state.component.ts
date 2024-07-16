import { Component, Input } from '@angular/core';
import { FormControl, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-country-with-state',
  templateUrl: './country-with-state.component.html',
  styleUrls: ['./country-with-state.component.scss']
})
export class CountryWithStateComponent {
  @Input() title: string = "";
  @Input() isRequired: boolean = true;
  @Input() optionList:any[];
  @Input() formControls: FormControl = new FormControl("");
  @Input() formControlNames:FormControlName;

  
  selectedCountry: any;
  countries: any=[];
  constructor(){
    
  }
  ngOnInit(){}
}
