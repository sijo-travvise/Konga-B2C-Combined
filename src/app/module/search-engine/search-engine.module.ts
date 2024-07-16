import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchEngineRoutingModule } from './search-engine-routing.module';
import { HotelModifySearchEngineComponent } from './hotel/hotel-modify-search-engine/hotel-modify-search-engine.component';
import { OnewayComponent } from './flight/oneway/oneway.component';
import { CheckboxModule } from 'primeng/checkbox';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { MultiCityComponent } from './flight/multi-city/multi-city.component';
import { RoundTripComponent } from './flight/round-trip/round-trip.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HotelRoomSearchEngineComponent } from './hotel/hotel-room-search-engine/hotel-room-search-engine.component';
import { SelectRoomTravellerComponent } from './hotel/select-room-traveller/select-room-traveller.component';
import { HotelSearchEngineComponent } from './hotel/hotel-search-engine/hotel-search-engine.component';
import { InputTextModule } from 'primeng/inputtext';
import { SelectCabinComponent } from './flight/select-cabin/select-cabin.component';
import { SelectPassengerComponent } from './flight/select-passenger/select-passenger.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import {ToastModule} from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@NgModule({
  declarations: [
    HotelModifySearchEngineComponent,
    OnewayComponent,
    MultiCityComponent,
    RoundTripComponent,
    HotelRoomSearchEngineComponent,
    SelectRoomTravellerComponent,
    HotelSearchEngineComponent,
    SelectCabinComponent,
    SelectPassengerComponent,
    
  ],
  imports: [
    CommonModule,
    SearchEngineRoutingModule,
    CheckboxModule,
    AutoCompleteModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    NgbModule,
    InputTextModule,
    SharedModule,
    ReactiveFormsModule,
    ToastModule,
    ButtonModule,
    RippleModule,
    FormsModule,
    BrowserAnimationsModule,
    
  ],
  exports:[
    CheckboxModule,
    AutoCompleteModule,
    CalendarModule,
    OnewayComponent,
    MultiCityComponent,
    RoundTripComponent,
    HotelModifySearchEngineComponent,
    HotelRoomSearchEngineComponent,
    HotelSearchEngineComponent,
    SelectRoomTravellerComponent,
    SelectCabinComponent,
    SelectPassengerComponent,
    ToastModule,
    ButtonModule,
    RippleModule,
  ]
})
export class SearchEngineModule { }
