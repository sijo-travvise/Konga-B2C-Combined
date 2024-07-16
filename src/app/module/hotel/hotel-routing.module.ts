import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from 'src/app/landing-page/landing-page.component';
import { GuestDetailsComponent } from './guest-details/guest-details.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { HotelResultComponent } from './hotel-result/hotel-result.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';

// const routes: Routes = [
//   { path: 'hotel-result', component: HotelResultComponent },
//   { path: 'hotel-details', component: HotelDetailsComponent },
//   { path: 'guest-details', component: GuestDetailsComponent },
//   { path: 'payment-details', component: PaymentDetailsComponent },
// ];

const routes: Routes = [
  {
    path: 'home',
    component: LandingPageComponent,
  },
  {
    path: 'hotel-result',
    component: HotelResultComponent,
    data: {
      title: 'Home',
      breadcrumb: [
        {
          label: 'Home',
          url: '/home',
        },
        {
          label: 'Hotel Result',
          url: '',
        },
      ],
    },
  },
  {
    path: 'hotel-details',
    component: HotelDetailsComponent,
    data: {
      title: 'Home',
      breadcrumb: [
        {
          label: 'Home',
          url: '/home',
        },
        {
          label: 'Hotel Result',
          url: 'hotel-result',
        },
        {
          label: 'Hotel Details',
          url: '',
        },
      ],
    },
  },
  {
    path: 'guest-details',
    component: GuestDetailsComponent,
    data: {
      title: 'Home',
      breadcrumb: [
        {
          label: 'Home',
          url: '/home',
        },
        {
          label: 'Hotel Result',
          url: 'hotel-result',
        },
        {
          label: 'Hotel Details',
          url: 'hotel-details',
        },
        {
          label: 'Guest Details',
          url: '',
        },
      ],
    },
  },
  {
    path: 'payment-details',
    component: PaymentDetailsComponent,
    data: {
      title: 'Home',
      breadcrumb: [
        {
          label: 'Home',
          url: '/home',
        },
        {
          label: 'Hotel Result',
          url: 'hotel-result',
        },
        {
          label: 'Hotel Details',
          url: 'hotel-details',
        },
        {
          label: 'Guest Details',
          url: 'guest-details',
        },
        {
          label: 'Payment Details',
          url: '',
        },
      ],
    },
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HotelRoutingModule {}
