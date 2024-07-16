import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-travel-policy-header',
  templateUrl: './travel-policy-header.component.html',
  styleUrls: ['./travel-policy-header.component.scss']
})
export class TravelPolicyHeaderComponent {

  @Input() policyTittle: string = "";
  @Input() policyDesc: string = "";
  @Input() policyIcon= "";
  @Input() isOptional: boolean = false;
  

}
