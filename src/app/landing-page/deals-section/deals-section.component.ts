import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MessageService } from 'primeng/api';
import { PackageService } from 'src/app/services/packages.service';

@Component({
  selector: 'app-deals-section',
  templateUrl: './deals-section.component.html',
  styleUrls: ['./deals-section.component.scss'],
  providers: [ MessageService],
})
export class DealsSectionComponent {
  activeIndex: number = 0;
  selectedItem: string;
  isLoading:boolean = false;
  packageModuleList: any =[];
  constructor(private router: Router, private packageService: PackageService, private messageService: MessageService) {}

  navigateToDeals(event: string, name: string, index: number) {
    this.selectedItem = event;
    this.router.navigate(['/deals', event]);
  }
  customOptions: OwlOptions = {
    // loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin: 20,
    // stagePadding: 20,
    smartSpeed: 500,
    navText: ['<i class="pi pi-angle-left"></i>', '<i class="pi pi-angle-right"></i>'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
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
  ngOnInit(): void {
      this.getAllPackageList();
  };

  getAllPackageList(): void { 

    this.packageService.getAllPackageData().subscribe({
      complete: () => { }, // completeHandler
      error: (error: any) => { this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch data. Please try again' }); this.isLoading = false; },    // errorHandler 
      next: (response: any) => {
        if (response.statusCode == 200 ) {
          console.log(response);
          this.packageModuleList = response.data;
        }
        else {
         
         
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch data. Please try again' });
        }
      }
    });
  };
}
