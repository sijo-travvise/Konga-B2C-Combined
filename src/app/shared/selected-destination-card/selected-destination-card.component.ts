import { Component, Input } from '@angular/core';
import { MicroService } from 'src/app/services/micro.service';

@Component({
  selector: 'app-selected-destination-card',
  templateUrl: './selected-destination-card.component.html',
  styleUrls: ['./selected-destination-card.component.scss']
})
export class SelectedDestinationCardComponent {
  @Input() availablityTitle = "";
  @Input() secondTitle = " ";
  @Input() destinationCity = " ";
  @Input() destinationCountry = " ";
  @Input() destinationDate = " ";
  @Input() destinationDay = " ";
  @Input() flightDirectionIcon = "";
  @Input() flightDirection = "";
  @Input() flightTripType = "";
  @Input() tripData: any = [];
  constructor(public _microService: MicroService){

  }
  ngOnInit() {
    console.log(this.tripData[0]);
    
  }
  
}
