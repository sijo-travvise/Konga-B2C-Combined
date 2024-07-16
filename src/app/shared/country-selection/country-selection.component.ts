import { Component, Input } from '@angular/core';
import { FormControl, FormControlName } from '@angular/forms';



@Component({
  selector: 'app-country-selection',
  templateUrl: './country-selection.component.html',
  styleUrls: ['./country-selection.component.scss']
})
export class CountrySelectionComponent {
   
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
