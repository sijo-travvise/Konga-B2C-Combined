import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-radio-button-nolabel',
  templateUrl: './radio-button-nolabel.component.html',
  styleUrls: ['./radio-button-nolabel.component.scss'],
})
export class RadioButtonNolabelComponent {
  @Input() radioList: any;
  @Input() formControls: FormControl = new FormControl('');
  constructor() {}

  ngOnInit(): void {}
}
