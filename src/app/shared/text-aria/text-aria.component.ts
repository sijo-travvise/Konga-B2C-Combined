import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-aria',
  templateUrl: './text-aria.component.html',
  styleUrls: ['./text-aria.component.scss']
})
export class TextAriaComponent {
  @Input() title: string = "";
  @Input() placeholder: string = "";
}
