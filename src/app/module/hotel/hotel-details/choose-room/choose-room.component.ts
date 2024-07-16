import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-choose-room',
  templateUrl: './choose-room.component.html',
  styleUrls: ['./choose-room.component.scss'],
})
export class ChooseRoomComponent {
  activeIndex: number = 0;
  constructor() {}
  roomDetailActive: any;
  position: string;
  displayPosition: boolean;
  ngOnInit(): void {
    this.roomDetailActive == 0;
  }

  items =[1,2,3,4,]
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
  customOptions2: OwlOptions = {
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
    autoplayTimeout: 4000,
    navText: [
      '<i class="pi pi-angle-left"><i/>',
      '<i class="pi pi-angle-right"><i/>',
    ],
    responsive: {
      0: {
        items: 4,
      },
      400: {
        items: 1,
      },
      760: {
        items: 4,
      },
      1000: {
        items: 1,
      },
    },
    nav: true,
  };
  activeRoom(event: any) {
    this.roomDetailActive = event;
  }
  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }
}
