import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent {
//   @Input() title: string = "";
//   @Input()  dateFormat="";
//   @Input() formControls: FormControl = new FormControl("");
//   @Input() isRequired: boolean = true;
//   @Input() isOptional: boolean = false;
//   @Input() isMinDate: boolean = false;
//   @Input() isMaxDate: boolean = false;
//   @Input() minViewDate: any = '';
//   @Input() maxViewDate: any = '';
//   public maxDateView :  Date= null;
//   public minDateView : Date= null;

//   ngOnInit() {
//     if(this.minViewDate !== ''){
//       this.minDateView =new Date(this.minViewDate);
//       this.formControls.patchValue(this.minDateView);
//     }
//     if( this.maxViewDate !== ''){
//       this.maxDateView = new Date(this.maxViewDate);
//       this.formControls.patchValue(this.maxDateView)
//     }
//     if(this.isMinDate){
//       this.minDateView = new Date()
//     }
//     if(this.isMaxDate){
//       this.minDateView = new Date()
//     }
//   }
// }
@Input() title: string = "";
  @Input() dateFormat = "";
  @Input() formControls: FormControl = new FormControl("");
  @Input() isRequired: boolean = true;
  @Input() isOptional: boolean = false;
  @Input() isMinDate: boolean = false;
  @Input() isMaxDate: boolean = false;
  @Input() minViewDate: any = '';
  @Input() maxViewDate: any = '';
  @Input() isFillValue: boolean = true;
  public maxDateView: Date = null;
  public minDateView: Date = null;
  @Output() dateChangeEvent: EventEmitter<Date> = new EventEmitter();

  ngOnInit() {
    if (this.minViewDate !== '') {
      this.setMinValue();
      this.formControls.patchValue(this.minDateView);
    }
    if (this.maxViewDate !== '') {
      this.maxDateView = new Date(this.maxViewDate);
      this.formControls.patchValue(this.maxDateView)
    }
    if (this.isMinDate) {
      this.minDateView = new Date()
    }
    if (this.isMaxDate) {
      this.maxDateView = new Date()
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['minViewDate']?.currentValue !== undefined && changes['minViewDate']?.currentValue !== null && changes['minViewDate']?.currentValue !== "") {
      this.setMinValue();
    }

  }

  onSelect(event : any){
    this.dateChangeEvent.emit(event);
  }

  setMinValue() {
    this.minDateView = new Date(this.minViewDate);

  }

}
