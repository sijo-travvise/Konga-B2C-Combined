import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss']
})
export class PasswordFieldComponent {
  password: string;
  @Input() title: string = "";
  @Input() isRequired: boolean = true;
  @Input() isOptional: boolean = false;
}
