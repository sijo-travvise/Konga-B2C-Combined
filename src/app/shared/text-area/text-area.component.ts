import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent {
  @Input() title: string = "";
  @Input() placeholder: string = "";
  @Input() header: string = "";
  @Input() formControls: FormControl = new FormControl("");
}
