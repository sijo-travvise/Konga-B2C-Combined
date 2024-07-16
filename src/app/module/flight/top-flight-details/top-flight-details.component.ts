import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-top-flight-details',
  templateUrl: './top-flight-details.component.html',
  styleUrls: ['./top-flight-details.component.scss']
})
export class TopFlightDetailsComponent {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    // autoplay:true,
    // autoplayHoverPause:true,
    slideTransition: 'linear',
    smartSpeed: 1000,
    autoplayTimeout:4000,
    margin: 20,
    autoHeight : true,
    navText: [
      '<i class="pi pi-angle-left"><i/>',
      '<i class="pi pi-angle-right"><i/>',
    ],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
}
