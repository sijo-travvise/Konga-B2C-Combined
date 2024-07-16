import { Component, Input } from '@angular/core';
import { FormControl, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-state-selection',
  templateUrl: './state-selection.component.html',
  styleUrls: ['./state-selection.component.scss']
})
export class StateSelectionComponent {
  @Input() title: string = "";
  @Input() isRequired: boolean = true;
  @Input() optionList:any[];
  @Input() formControls: FormControl = new FormControl("");
  @Input() formControlNames:FormControlName;


  constructor(){
    
  }
  ngOnInit(){}
}
