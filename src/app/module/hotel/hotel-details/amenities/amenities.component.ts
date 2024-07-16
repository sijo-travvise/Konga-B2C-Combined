import { Component } from '@angular/core';

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.scss']
})
export class AmenitiesComponent {

  amenitiesList = [
    {icon:"../../../../../assets/img/icons/icon-wifi-large.svg",title:"Wifi"},
    {icon:"../../../../../assets/img/icons/icon-restaurant.svg",title:"Restaurant"},
    {icon:"../../../../../assets/img/icons/icon-spa.svg",title:"Spa"},
    {icon:"../../../../../assets/img/icons/icon-parking.svg",title:"Parking"},
    {icon:"../../../../../assets/img/icons/icon-gym.svg",title:"Gym"},
    {icon:"../../../../../assets/img/icons/icon-pool.svg",title:"Pool"},
    {icon:"../../../../../assets/img/icons/icon-laundry.svg",title:"Laundry"},
    {icon:"../../../../../assets/img/icons/icon-aircondition.svg",title:"Air Conditioner"},
  ]

}
