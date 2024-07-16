import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent {
  @Output() onChangeEvent = new EventEmitter<any>();

  @Input() title: string = "";
  @Input() placeholder: string = "";
  @Input() isRequired: boolean = true;
  @Input() isOptional: boolean = false;
  @Input() isHint: boolean = false;
  @Input() isHintIcon: boolean = false;
  @Input() isHintText: string = "";
  @Input() type: string = "text";
  @Input() formControls: FormControl = new FormControl("");
  @Input() isSuffix : boolean = false;
  @Input() suffixValue : string =  '%';
  public showPassword:boolean =false;
  public password: string = 'password'

  changeField(event:any){
    this.onChangeEvent.emit(event);
  }

}
