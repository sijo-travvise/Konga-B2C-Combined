import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-calendar-carousel',
  templateUrl: './calendar-carousel.component.html',
  styleUrls: ['./calendar-carousel.component.scss']
})
export class CalendarCarouselComponent {
  activeIndex = 0;
  public customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 400,
    // autoplay:true,
    // autoplayHoverPause:true,
    slideBy:4,
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
        items: 6
      }
    },
    nav: true
  }
  slides = [
   {date: 9, month: 'DEC', amount: '163,398.00', img:'assets/img/icons/flight/saudia.svg'},
   {date: 12, month: 'DEC', amount: '163,398.00', img:'assets/img/icons/flight/saudia.svg'},
   {date: 7, month: 'JAN', amount: '163,398.00', img:'assets/img/icons/flight/saudia.svg'},
   {date: 9, month: 'JAN', amount: '163,398.00', img:'assets/img/icons/flight/saudia.svg'},
   {date: 15, month: 'FEB', amount: '163,398.00', img:'assets/img/icons/flight/saudia.svg'},
   {date: 9, month: 'MAR', amount: '163,398.00', img:'assets/img/icons/flight/saudia.svg'},
   {date: 29, month: 'APR', amount: '163,398.00', img:'assets/img/icons/flight/saudia.svg'},
   {date: 19, month: 'MAY', amount: '163,398.00', img:'assets/img/icons/flight/saudia.svg'}
  ];
}
