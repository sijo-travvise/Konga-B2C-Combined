import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
interface SalutatioType {
  name: string;
  code: string;
}
@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent {
  SalutationTypeArray: SalutatioType[];
  constructor(private formBuilder: FormBuilder) {
    this.SalutationTypeArray = [
      { name: 'Mr', code: 'Mr' },
      { name: 'Mrs', code: 'Mrs' },
      { name: 'Ms', code: 'Ms' },
    ];
  }
}
