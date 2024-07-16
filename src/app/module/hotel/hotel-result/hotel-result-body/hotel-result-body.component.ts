import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-hotel-result-body',
  templateUrl: './hotel-result-body.component.html',
  styleUrls: ['./hotel-result-body.component.scss']
})
export class HotelResultBodyComponent {
  displayMaximizable: boolean | undefined;
  constructor() {}

  ngOnInit(): void {}
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 600,
    navText: ['<i class="pi pi-angle-left"><i/>', '<i class="pi pi-angle-right"><i/>'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      760: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
    nav: true,
  };
  showMaximizableDialog() {
    this.displayMaximizable = true;
  }
}
