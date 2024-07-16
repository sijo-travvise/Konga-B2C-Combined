import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { SessionExpireComponent } from './session-expire/session-expire.component';
import { InnerPageTitleComponent } from './inner-page-title/inner-page-title.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { SelectFieldComponent } from './select-field/select-field.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { CountrySelectionComponent } from './country-selection/country-selection.component';
import { PhoneNumberFiledComponent } from './phone-number-filed/phone-number-filed.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertComponent } from './alert/alert.component';
import { TravelPolicyHeaderComponent } from './travel-policy-header/travel-policy-header.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import { FareDetailsHeaderComponent } from './fare-details-header/fare-details-header.component';
import { FooterComponent } from './footer/footer.component';
import { TotalAmountCardComponent } from './total-amount-card/total-amount-card.component';
import { PaymentCardSelectionComponent } from './payment-card-selection/payment-card-selection.component';
import { RadioButtonNolabelComponent } from './radio-button-nolabel/radio-button-nolabel.component';
import { CardDetailsSectionComponent } from './card-details-section/card-details-section.component';
import { MonthYearPickerComponent } from './month-year-picker/month-year-picker.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { PasswordFieldComponent } from './password-field/password-field.component';
import { PasswordModule } from 'primeng/password';
import { TranslateModule } from '@ngx-translate/core';
import {MenubarModule} from 'primeng/menubar';
import { NgDynamicBreadcrumbModule } from 'ng-dynamic-breadcrumb';
import { PreLoaderComponent } from './pre-loader/pre-loader.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { ForNotForComponent } from './for-not-for/for-not-for.component';
import { SelectedDestinationCardComponent } from './selected-destination-card/selected-destination-card.component';
import { TextAriaComponent } from './text-aria/text-aria.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ModalAfterSessionExpiredComponent } from './modal-after-session-expired/modal-after-session-expired.component';
import { AffliateComponent } from './affliate/affliate.component';
import { LoginComponent } from './login/login.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CountryWithStateComponent } from './country-with-state/country-with-state.component';
import { StateSelectionComponent } from './state-selection/state-selection.component';
import { ToastModule } from 'primeng/toast';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { InputNumberModule } from 'primeng/inputnumber';




@NgModule({
  declarations: [
    HeaderComponent,
    BreadCrumbComponent,
    SessionExpireComponent,
    InnerPageTitleComponent,
    InputFieldComponent,
    SelectFieldComponent,
    DatePickerComponent,
    CountrySelectionComponent,
    PhoneNumberFiledComponent,
    AlertComponent,
    TravelPolicyHeaderComponent,
    RadioButtonComponent,
    FareDetailsHeaderComponent,
    FooterComponent,
    TotalAmountCardComponent,
    PaymentCardSelectionComponent,
    RadioButtonNolabelComponent,
    CardDetailsSectionComponent,
    MonthYearPickerComponent,
    CheckboxComponent,
    PasswordFieldComponent,
    PreLoaderComponent,
    ForNotForComponent,
    SelectedDestinationCardComponent,
    TextAriaComponent,
    ModalAfterSessionExpiredComponent,
    AffliateComponent,
    LoginComponent,
    CountryWithStateComponent,
    StateSelectionComponent,
    ForgotPasswordComponent,
    TextAreaComponent
    
    
    
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    DropdownModule,
    FormsModule,
    BreadcrumbModule,
    NgbModule,
    CarouselModule,
    AutoCompleteModule,
    CalendarModule,
    CheckboxModule,
    TabViewModule,
    InputTextModule,
    DialogModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    NgxIntlTelInputModule,
    RadioButtonModule,
    PasswordModule,
    TranslateModule.forRoot(),
    MenubarModule,
    NgDynamicBreadcrumbModule,
    ProgressBarModule,
    InputTextareaModule,
    OverlayPanelModule ,
    ToastModule,
    InputNumberModule 


  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    BreadcrumbModule,
    SessionExpireComponent,
    InnerPageTitleComponent,
    InputFieldComponent,
    SelectFieldComponent,
    DatePickerComponent,
    CountrySelectionComponent,
    PhoneNumberFiledComponent,
    AlertComponent,
    TravelPolicyHeaderComponent,
    RadioButtonComponent,
    FareDetailsHeaderComponent,
    TotalAmountCardComponent,
    PaymentCardSelectionComponent,
    CardDetailsSectionComponent,
    PasswordFieldComponent,
    TranslateModule,
    CarouselModule,
    PasswordFieldComponent,
    NgDynamicBreadcrumbModule,
    ProgressBarModule,
    ForNotForComponent,
    PreLoaderComponent,
    SelectedDestinationCardComponent,
    TextAriaComponent,
    ModalAfterSessionExpiredComponent,
    ToastModule,
    TextAreaComponent,
    InputNumberModule,
    OverlayPanelModule 
    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
