import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss']
})
export class SelectFieldComponent {
  @Input() optionValue:string = '';
  
  @Input() title: string = "";
  @Input() isRequired: boolean = true;
  @Input() isOptional: boolean = false;
  @Input() option:any[]=[];
  @Input() formControls: FormControl = new FormControl("");
  @Output() onChangeItem  = new EventEmitter();
  changed(event: any){
    this.onChangeItem.emit(event);
  }
}
