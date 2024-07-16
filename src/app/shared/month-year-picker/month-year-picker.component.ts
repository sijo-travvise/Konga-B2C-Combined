import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-month-year-picker',
  templateUrl: './month-year-picker.component.html',
  styleUrls: ['./month-year-picker.component.scss']
})
export class MonthYearPickerComponent {
  @Input() title: string = "";
  @Input() isRequired: boolean = true;
}
