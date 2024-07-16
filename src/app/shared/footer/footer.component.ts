import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {


  footerLinks= [
    {name:"About Us"},
    {name:"Travels News"},
    {name:"Privacy & Policy"},
    {name:"Terms & Conditions"},
    {name:"Contact Us"},
    {name:"FAQ"},
  ]
  services= [
    {name:"Flights"},
    {name:"Hotels"},
    {name:"Travel Insurance"},
    {name:"Holidays"}
  ]

}
