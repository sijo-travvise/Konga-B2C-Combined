import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from 'src/app/landing-page/landing-page.component';
import { FlightResultBodyComponent } from './flight-result-body/flight-result-body.component';
import { PassengerDetailsComponent } from './passenger-details/passenger-details.component';
import { FlightItineraryDetailsComponent } from './flight-itinerary-details/flight-itinerary-details.component';
import { AmadeusPassengerDetailsComponent } from './flight-amadeus/amadeus-passenger-details/amadeus-passenger-details.component';
import { AmadeusItineraryDetailsComponent } from './flight-amadeus/amadeus-itinerary-details/amadeus-itinerary-details.component';

// const routes: Routes = [
//   {path: 'Result_Page', component:FlightResultBodyComponent},
//   {path: 'Passenger_Details', component:PassengerDetailsComponent},
// ];
const routes: Routes = [
  {
    path: 'home',
    component: LandingPageComponent,
  },
  {
    path: 'result-page',
    component: FlightResultBodyComponent,
    data: {
      title: 'Home',
      breadcrumb: [
        {
          label: 'Home',
          url: '/home',
        },
        {
          label: 'Flight Result',
          url: '',
        },
      ],
    },
  },
  {
    path: 'passenger-details',
    component: PassengerDetailsComponent,
    data: {
      title: 'Home',
      breadcrumb: [
        {
          label: 'Home',
          url: '/home',
        },
        {
          label: 'Flight Result',
          url: 'result-page',
        },
        {
          label: 'Passenger Details',
          url: '',
        },
      ],
    },
  },

  {
    path: 'passenger-details-1A',
    component: AmadeusPassengerDetailsComponent,
    data: {
      title: 'Home',
      breadcrumb: [
        {
          label: 'Home',
          url: '/home',
        },
        {
          label: 'Flight Result',
          url: 'result-page',
        },
        {
          label: 'Passenger Details',
          url: '',
        },
      ],
    },
  },

  {
    path: '1A-flight-itinerary/:locatorCode',
    component: AmadeusItineraryDetailsComponent,
    data: {
      title: 'Home',
      breadcrumb: [
        {
          label: 'Home',
          url: '/home',
        },
        {
          label: 'Flight Result',
          url: 'result-page',
        },
        {
          label: 'Passenger Details',
          url: '/passenger-details',
        },
        {
          label: 'details',
          url: '',
        },
      ],
    },
  },
  { path: 'flight-itinerary/:pnr', component: FlightItineraryDetailsComponent, 
  data: {
    title: 'Home',
    breadcrumb: [
      {
        label: 'Home',
        url: '/home',
      },
      {
        label: 'Flight Result',
        url: 'result-page',
      },
      {
        label: 'Passenger Details',
        url: '/passenger-details',
      },
      {
        label: 'details',
        url: '',
      },
    ],
  }, }
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightRoutingModule { }
