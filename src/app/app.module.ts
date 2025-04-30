import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SearchEngineComponent } from './module/search-engine/search-engine.component';
import {TabViewModule} from 'primeng/tabview';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CalendarModule} from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DealsSectionComponent } from './landing-page/deals-section/deals-section.component';
import { InputTextModule } from 'primeng/inputtext';
import {SliderModule} from 'primeng/slider';
import {DialogModule} from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlightModule } from './module/flight/flight.module';
import { SearchEngineModule } from './module/search-engine/search-engine.module';
import { HotelModule } from './module/hotel/hotel.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { SharedModule } from './shared/shared.module';
import { CustomerModule } from './module/customer/customer.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DatePipe } from '@angular/common';
import { MoreDealDetailsComponent } from './landing-page/deals-section/more-deal-details/more-deal-details.component';
import { OrganizationFormComponent } from './landing-page/deals-section/organization-form/organization-form.component';
import { PartyRegisterFormComponent } from './landing-page/deals-section/party-register-form/party-register-form.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ScrollTopModule } from 'primeng/scrolltop';
import { environment } from 'src/environments/environment';

// import {ToastModule} from 'primeng/toast';


export function httpTranlateLoaderFactory(http:HttpClient){
    return new TranslateHttpLoader(http)
}
@NgModule({
    declarations: [
        AppComponent,
        LandingPageComponent,
        SearchEngineComponent,
        DealsSectionComponent,
        MoreDealDetailsComponent,
        OrganizationFormComponent,
        PartyRegisterFormComponent,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        DatePipe
      ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgbModule,
        DropdownModule,
        ScrollTopModule ,
        FormsModule,
        SharedModule,
        AutoCompleteModule,
        CalendarModule,
        CheckboxModule,
        TabViewModule,
        ProgressSpinnerModule,
        InputTextModule,
        SliderModule,
        DialogModule,
        FlightModule,
        SearchEngineModule,
        HotelModule,
        CustomerModule,
        HttpClientModule,
        ButtonModule,
        RippleModule,
        ButtonModule,
        ReactiveFormsModule,
        RippleModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireDatabaseModule,
        TranslateModule.forRoot({
            loader:{
                provide:TranslateLoader,
                useFactory:httpTranlateLoaderFactory,
                deps:[HttpClient]
            }
        })
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]


})
export class AppModule { }
