import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightRoutingModule } from './flight-routing.module';
import { FlightResultBodyComponent } from './flight-result-body/flight-result-body.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { TabViewModule } from 'primeng/tabview';
import { OneWayTripComponent } from './flight-result-body/one-way-trip/one-way-trip.component';
import { FlightDetailsComponent } from './flight-result-body/modal/flight-details/flight-details.component';
import { CalendarCarouselComponent } from './flight-result-body/calendar-carousel/calendar-carousel.component';
import { FilterSidebarComponent } from './flight-result-body/filter-sidebar/filter-sidebar.component';
import { SearchEngineModule } from '../search-engine/search-engine.module';
import { TopFlightDetailsComponent } from './top-flight-details/top-flight-details.component';
import { PassengerDetailsComponent } from './passenger-details/passenger-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {ToggleButtonModule} from 'primeng/togglebutton';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TransistsAirportsComponent } from './flight-result-body/filter-sidebar/transists-airports/transists-airports.component';
import { DepartureReturnComponent } from './flight-result-body/filter-sidebar/departure-return-alliance/departure-return.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { CustomerModule } from '../customer/customer.module';
import { FlightItineraryDetailsComponent } from './flight-itinerary-details/flight-itinerary-details.component';
import { ScrollTopModule } from 'primeng/scrolltop';
import { PanelModule } from 'primeng/panel';
import { PayAsEarnCalculatorComponent } from './flight-result-body/modal/pay-as-earn-calculator/pay-as-earn-calculator.component';
import { FlightAmadeusResultBodyComponent } from './flight-amadeus/flight-amadeus-result-body/flight-amadeus-result-body.component';
import { FlightAmadeusFareFamilyComponent } from './flight-amadeus/flight-amadeus-fare-family/flight-amadeus-fare-family.component';
import { AmadeusPassengerDetailsComponent } from './flight-amadeus/amadeus-passenger-details/amadeus-passenger-details.component';
import { AmadeusPayAsEarnCalculatorComponent } from './flight-amadeus/amadeus-pay-as-earn-calculator/amadeus-pay-as-earn-calculator.component';
import { AmadeusItineraryDetailsComponent } from './flight-amadeus/amadeus-itinerary-details/amadeus-itinerary-details.component';
import { AmadeusItineraryDetailsPageComponent } from './flight-amadeus/amadeus-itinerary-details/amadeus-itinerary-details-page/amadeus-itinerary-details-page.component';
import { FlightListFliterComponent } from './flight-result-body/flight-list-fliter/flight-list-fliter.component';


@NgModule({
    declarations: [
        FlightResultBodyComponent,
        OneWayTripComponent,
        FlightDetailsComponent,
        CalendarCarouselComponent,
        FilterSidebarComponent,
        TopFlightDetailsComponent,
        PassengerDetailsComponent,
        TransistsAirportsComponent,
        DepartureReturnComponent,
        FlightItineraryDetailsComponent,
        PayAsEarnCalculatorComponent,
        FlightAmadeusResultBodyComponent,
        FlightAmadeusFareFamilyComponent,
        AmadeusPassengerDetailsComponent,
        AmadeusPayAsEarnCalculatorComponent,
        AmadeusItineraryDetailsComponent,
        AmadeusItineraryDetailsPageComponent,
        FlightListFliterComponent
    ],
    exports: [
        FlightResultBodyComponent,
        OneWayTripComponent,
        FlightDetailsComponent,
        CalendarCarouselComponent,
        FilterSidebarComponent,
        TopFlightDetailsComponent,
        FlightItineraryDetailsComponent
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
        SliderModule,
        DialogModule,
        SharedModule,
        SearchEngineModule,
        CarouselModule,
        ToggleButtonModule,
        ReactiveFormsModule,
        ButtonModule,
        RippleModule,
        RadioButtonModule,
        CustomerModule,
        AccordionModule,
        ScrollTopModule,
        PanelModule,
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class FlightModule { }
