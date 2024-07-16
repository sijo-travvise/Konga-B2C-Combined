import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
interface SalutatioType {
  name: string;
  code: string;
}
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent {
  position: string;
  displayPosition: boolean;
  selectedValues: string[] = ['val1', 'val2'];
  uploadedFiles: any[] = [];
  SalutationTypeArray: SalutatioType[];
  selectedSalutatioType: SalutatioType | any;
  visible: boolean;
 
  

  constructor(private formBuilder: FormBuilder) {
    this.SalutationTypeArray = [
      { name: 'Mr', code: 'Mr' },
      { name: 'Mrs', code: 'Mrs' },
      { name: 'Ms', code: 'Ms' },
    ];
  }
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
    autoplayTimeout: 4000,
    margin: 25,
    autoHeight: true,
    navText: [
      '<i class="pi pi-angle-left"><i/>',
      '<i class="pi pi-angle-right"><i/>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }
  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }
  showDialog() {
    this.visible = true;
}
}
