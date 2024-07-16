import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { ChooseRoomComponent } from './hotel-details/choose-room/choose-room.component';
import { OverviewComponent } from './hotel-details/overview/overview.component';
import { SliderModule } from 'primeng/slider';

import { HotelResultComponent } from './hotel-result/hotel-result.component';
import { HotelResultBodyComponent } from './hotel-result/hotel-result-body/hotel-result-body.component';
import { TopHotelDealsComponent } from './top-hotel-deals/top-hotel-deals.component';
import { HotelRoutingModule } from './hotel-routing.module';
import { ReviewsComponent } from './hotel-details/reviews/reviews.component';
import { RoomDetailsModalComponent } from './hotel-models/room-details-modal/room-details-modal.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { GuestDetailsComponent } from './guest-details/guest-details.component';
import { FareDetailsComponent } from './fare-details/fare-details.component';
import { SearchEngineModule } from '../search-engine/search-engine.module';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { SharedModule } from '../../shared/shared.module';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { GalleriaModule } from 'primeng/galleria';
import { ToolbarModule } from 'primeng/toolbar';
import { AmenitiesComponent } from './hotel-details/amenities/amenities.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ReviewPostComponent } from './hotel-models/review-post/review-post.component';
import { HotelSummaryComponent } from './guest-details/hotel-summary/hotel-summary.component';

@NgModule({
  declarations: [
    HotelDetailsComponent,
    ChooseRoomComponent,
    OverviewComponent,
    HotelResultComponent,
    HotelResultBodyComponent,
    TopHotelDealsComponent,
    RoomDetailsModalComponent,
    ReviewsComponent,
    GuestDetailsComponent,
    FareDetailsComponent,
    PaymentDetailsComponent,
    AmenitiesComponent,
    ReviewPostComponent,
    HotelSummaryComponent,
  ],
  exports: [
    HotelDetailsComponent,
    ChooseRoomComponent,
    OverviewComponent,
    HotelResultComponent,
    HotelResultBodyComponent,
    TopHotelDealsComponent,
    ReviewsComponent,
  ],
  imports: [
    HotelRoutingModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    DropdownModule,
    FormsModule,
    SharedModule,
    CarouselModule,
    AutoCompleteModule,
    CalendarModule,
    CheckboxModule,
    TabViewModule,
    InputTextModule,
    DialogModule,
    SliderModule,
    SearchEngineModule,
    FileUploadModule,
    HttpClientModule,
    InputTextareaModule,
    ToggleButtonModule,
    GalleriaModule,
    ToolbarModule ,
    ProgressBarModule,
    ToastModule,
    RadioButtonModule
  ],
})
export class HotelModule {}