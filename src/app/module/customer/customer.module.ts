import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { FlightRoutingModule } from '../flight/flight-routing.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import {KnobModule} from 'primeng/knob';
import { FlightHistoryComponent } from './customer-profile/flight-history/flight-history.component';
import { ItineraryDetailsComponent } from './customer-profile/flight-history/itinerary-details/itinerary-details.component';
import { SharedModule } from '../../shared/shared.module';
import { FlightInvoiceComponent } from './customer-profile/flight-history/flight-invoice/flight-invoice.component';
import { HotelHistoryComponent } from './customer-profile/hotel-history/hotel-history.component';
import { HotelItineraryDetailsComponent } from './customer-profile/hotel-history/hotel-itinerary-details/hotel-itinerary-details.component';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InvoiceComponent } from './customer-profile/hotel-history/invoice/invoice.component';
import { HotelWishlistComponent } from './customer-profile/hotel-history/hotel-wishlist/hotel-wishlist.component';
import { PersonalInformationComponent } from './customer-profile/personal-information/personal-information.component';




@NgModule({
  declarations: [
    CustomerProfileComponent,
    FlightHistoryComponent,
    ItineraryDetailsComponent,
    InvoiceComponent,
    FlightInvoiceComponent,
    HotelHistoryComponent,
    HotelItineraryDetailsComponent,
    PersonalInformationComponent,
    HotelWishlistComponent


  ],
  imports: [
    CommonModule,
    FlightRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    DropdownModule,
    FormsModule,
    AutoCompleteModule,
    CalendarModule,
    CheckboxModule,
    TabViewModule,
    InputTextModule,
    DialogModule,
    SharedModule,
    CustomerRoutingModule,
    KnobModule,
    PasswordModule,
    RadioButtonModule
    //Hotel-customer-profile-module
  ],
  exports: [
    CustomerProfileComponent,
    FlightHistoryComponent,
    ItineraryDetailsComponent,
    InvoiceComponent,
    FlightInvoiceComponent,
  ],

  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CustomerModule { }
