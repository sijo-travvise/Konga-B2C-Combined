import { DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { FilterService, MessageService } from 'primeng/api';
import { AmadeusService } from 'src/app/services/amadeus.service';
import { SharedService } from 'src/app/services/shared.service';
import { RegExpValidators } from 'src/app/shared/validators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {
  FlightPricingReq,
  flightPricing,
} from 'src/app/Models/flight/Amadeus/flight-pricing.model';
import { FlightService } from 'src/app/services/flight.service';
import {
  FlightOrder,
  GetOffersRequestModel,
} from 'src/app/Models/flight/Amadeus/flight-order.model';
import {
  B2CUserAirTransactions,
  PassengerInfantNamePrefix,
  PassengerNamePrefix,
  airArabiaSaveReqModel,
} from './passenger-details.util';
import { EmailDetailsModel } from 'src/app/Models/Mail/EmailDetailsModel';
import { MicroService } from 'src/app/services/micro.service';
import moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-passenger-details',
  templateUrl: './passenger-details.component.html',
  styleUrls: ['./passenger-details.component.scss'],
  providers: [SharedService, FilterService, MessageService],
})
export class PassengerDetailsComponent implements AfterViewInit {

  public emailDetails: EmailDetailsModel = new EmailDetailsModel();
  private footer = '';
  private htmlHead = '';
  private htmlBody = '';
  private flightdetails_header = '';
  private segmentdetails = '';
  private passengerdetails = '';
  private pricedetails = '';
  displayPositionCalc: boolean;
  affiliated_user: any;
  affiliate_user_permission: any;
  flightorderResponse: any;
  position: string;
  display: boolean = false;
  public passengerNamePrefix = PassengerNamePrefix;
  public passengerInfantNamePrefix = PassengerInfantNamePrefix;
  activeTabIndex = 0;
  public maxDate: Date = new Date();
  public flightFareData: any = {};
  public flightResultData: any = {};
  public isLoading: boolean = false;
  public flightPricingReq: flightPricing = FlightPricingReq;
  activeState: number = 0;
  public getOffersRequestModel: FlightOrder = GetOffersRequestModel;
  public flightPassenger: FormGroup;
  passengerDetailsArray: FormArray;
  public countryOptionList: any = [];
  public activeIndex: number = 0;
  public adultMaxDate: any = new Date().toISOString().substr(0, 10);
  public childMinDate: any = new Date().toISOString().substr(0, 10);
  public childMaxDate: any = new Date().toISOString().substr(0, 10);
  public infantMinDate: any = new Date().toISOString().substr(0, 10);
  public passengerPriceData: any = [];
  public farePriceResult: any = null;
  public isRequiredTrigger: boolean = false;
  public isPriceView: boolean = true;
  public isPassengerDetailsPage: boolean = true;
  totalFareTotalPrice: number = 0;
  flightFareInstallementDetails: any = null;
  currentUser: any;
  emailConfiguration:any = {
    DisplayName: 'Konga',
    From: 'travel@konga.com',
    Host: 'smtp.sendgrid.net',
    Password: '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',
    Port: 25,
    UserName: 'apikey',
    UseSSL: false,
    UseStartTls: true,
  }

  //micro service data}
  public priceReConfirmation: any = null;
  public bookingDetailsData: any = null;
  private airArabiaRequestObj = airArabiaSaveReqModel;
  public totalMarkUpValue: number = 0;
  public totalAdditionalServicesValue: number = 0;
  public totalBaggageValue: number = 0;
  public totalMealsValue: number = 0;

  isShowPriceWarning: boolean = false;
  b2CUserAirTransactions = B2CUserAirTransactions
  loadingText ='we are fetching price details';
  
  flightFareFamily: any = {};
  revalidateObj: any ;


  saveRq = {
    "flightTransactions": {
        "FlightTransactions_ID": 0,
        "UserTrackID": "Published-LOSDOH2025-03-260DOHLOS2025-03-2801ADT0CHD0INF~1",
        "BookingRefID": "VBU6VF",
        "CurCode": "NGN",
        "Company_ID": 0,
        "CompBranch_ID": 0,
        "Supplier_ID": 1,
        "TravelType": "RT",
        "CabinClass": "Q",
        "BaseOrigin": "LOS",
        "BaseDestination": "LOS",
        "Adult": 1,
        "Child": 0,
        "Infant": 0,
        "SeatFare": 0,
        "MealsFare": 0,
        "BaggageFare": 0,
        "OthersFare": 0,
        "DepartDate": "2025-03-26T00:00:00.000Z",
        "ReturnDate": "2025-03-28T00:00:00.000Z",
        "CustomerProfile_ID": 1,
        "AirlineCode": "QR",
        "CRSPNR": "VBU6VF",
        "AirlinePNR": "VBU6VF",
        "URPNR": "VBU6VF",
        "BaseFare": 817773,
        "Taxes": 611531,
        "TaxInfo": [],
        "Gross": 1427304,
        "DefaultMarkup": 5000,
        "AdditionalMarkup": 0,
        "CancelPenalty": 0,
        "ChangePenalty": 0,
        "TotalFare": 1432304,
        "Status": 2,
        "Remarks": "",
        "BookedByUser_ID": 2,
        "TransactionDate": "2025-03-08T10:29:43.638Z",
        "InvoiceNumber": "",
        "ProductID": 0,
        "PAYMENTSTATUS": 0,
        "CorporateCode": null,
        "PNRDateTime": "2025-03-08T10:29:43.638Z",
        "MarkupRemarks": "",
        "LatestTicketingTime": "2025-03-08T10:29:43.638Z",
        "LeadPaxFirstName": "dasd dasd Mr",
        "LeadPaxLastName": "sdsad",
        "VATKSA": 0,
        "AnyBookingStatusDesc": "",
        "TourCode": "",
        "VAT": 0,
        "MobileNo": "+234 7169542",
        "Emailid": "azeez@gmail.com",
        "BACKOFFICESTATUS": 0,
        "BACKOFFICEREMARKS": "",
        "CouponCode": "",
        "BookedOffice": "",
        "IssuedOffice": "",
        "Landline": "",
        "RefundAmount": 0,
        "CancelRemarks": "",
        "ChangeRefundAmount": 0,
        "ChangeRemarks": "",
        "FMFare": "",
        "ImportPNR": 0,
        "TicketCount": 1,
        "IssueDate": "2025-03-08T10:29:43.638Z",
        "IssuedByUser_ID": 2,
        "DealRevenue": 0,
        "RevenueLoss": 0,
        "RepriceDifference": 0,
        "CCAmt": 0,
        "DCAmt": 0,
        "CHQAmt": 0,
        "PendingAmt": 0,
        "IssuedPCC": "",
        "SplitPayStatus": 0,
        "BookedOfficeCred": "",
        "HOMDPromoCode": "",
        "EarningPoints": 0,
        "FOP": "CASH",
        "BackOfficeINVNo": "",
        "BookingPlatform": "FOS",
        "BACKOFFICEREFUNDSTATUS": 0,
        "BACKOFFICEREFUNDREMARKS": "",
        "BACKOFFICEREFUNDINVNO": "",
        "BackOfficePaymentInfo": "",
        "BACKOFFICEREISSUESTATUS": 0,
        "BACKOFFICEREISSUEREMARKS": "",
        "BACKOFFICEREISSUEINVNO": "",
        "LPONumber": "",
        "BookingType": 0,
        "CardNumber": "",
        "CreditCardVendorCode": "",
        "CardExpiryDate": "",
        "SeriesCode": "",
        "FOP_AMOUNT": 1432304,
        "TicketedDate": "2025-03-08T10:29:43.638Z",
        "CustomerSellCurrency": "NGN",
        "CustomerSellRateTotal": 1432304,
        "ExchangeRateApplied": 1,
        "DiscountAmount": 2000,
        "DiscountApproverUser_ID": 0,
        "DiscountApprovalStatus": 1,
        "TicketingApprovalStatus": 1,
        "TicketingApproverUser_ID": 1,
        "SelectedPccCode": "1A",
        "Segments": "",
        "Pax": "",
        "ResponseData": "",
        "CustomerProfileCode": "",
        "FareType": "",
        "CreatedDate": "2025-03-08T10:29:01.333Z",
        "CreatedUser_ID": 1,
        "lpoFilePath": "",
        "mailDate": null,
        "mailFilePath": "",
        "lpoNumber": "",
        "emailFilePath": "",
        "flightBookingRemarks": ""
    },
    "flightBookingRemarks": null,
    "flightTransactionDetails": [
        {
            "FlightTransactionDetails_ID": "0",
            "FlightTransaction_ID": "0",
            "FlightTransactionCode": "",
            "Prefix": null,
            "FirstName": "dasd dasd Mr",
            "LastName": "sdsad",
            "TravellerType": "ADT",
            "DOB": "2001-03-01T00:00:00.000Z",
            "Age": 0,
            "Gender": "F",
            "PhoneNumber": "+234 7169542",
            "Email": "azeez@gmail.com",
            "FreqFlyerNo": null,
            "TicketNo": null,
            "TicketStatus": "I",
            "TotalPrice": 1432304,
            "BasePrice": 817773,
            "Tax": 611531,
            "DefaultMarkup": 5000,
            "DiscountAmount": 2000,
            "AdditionalMarkup": 0,
            "Gross": 1429304,
            "DiscountType": "",
            "DiscountPercentage": 0,
            "TravelerKey": "ADT0",
            "Type": "TICKET",
            "ServiceReference": null,
            "TaxInfo": "",
            "DealRevenue": 0,
            "DocumentType": "",
            "DocumentNumber": "",
            "NationalityCountry_ID": null,
            "DocumentExpiry": "2025-03-08T10:29:43.638Z",
            "IssuedCountry_ID": "",
            "CreatedDate": "2025-03-08T10:29:43.638Z",
            "CreatedUser_ID": 2
        }
    ],
    "flightTransactionSegmentDetails": [
        {
            "FlightTransactionSegmentDetails_ID": 0,
            "FlightTransactions_ID": "0",
            "FlightTransactionCode": "",
            "Carrier": "QR",
            "CabinClass": "Q",
            "FlightNumber": "QR 1408",
            "ProviderCode": "QR",
            "Origin": "LOS",
            "SegmentReference": null,
            "Destination": "DOH",
            "DepartureTime": "2025-03-26T12:10:00",
            "ArrivalTime": "2025-03-26T22:50:00",
            "TravelTime": "0840",
            "ClassOfService": "N",
            "Equipment": "788",
            "SegmentStatus": "",
            "OriginTerminal": "I",
            "DestinationTerminal": "",
            "AdultBaggage": "",
            "ChildBaggage": "",
            "InfantBaggage": "",
            "AirlinePNR": null
        },
        {
            "FlightTransactionSegmentDetails_ID": 0,
            "FlightTransactions_ID": "0",
            "FlightTransactionCode": "",
            "Carrier": "QR",
            "CabinClass": "Q",
            "FlightNumber": "QR 1405",
            "ProviderCode": "QR",
            "Origin": "DOH",
            "SegmentReference": null,
            "Destination": "LOS",
            "DepartureTime": "2025-03-28T09:25:00",
            "ArrivalTime": "2025-03-28T16:05:00",
            "TravelTime": "0840",
            "ClassOfService": "N",
            "Equipment": "788",
            "SegmentStatus": "",
            "OriginTerminal": "",
            "DestinationTerminal": "I",
            "AdultBaggage": "",
            "ChildBaggage": "",
            "InfantBaggage": "",
            "AirlinePNR": null
        }
    ],
    "Mode": 1
}


pnrRs = {
  "Status": 15,
  "IsAirPaymentRequired": false,
  "SupplierConfirmationNumber": "VBU6VF",
  "PNRNumber": "VBU6VF",
  "SupplierID": 0,
  "AirlinePNR": "VBU6VF",
  "TicketTimeLimit": "2025-03-26",
  "Passengers": [
      {
          "PassangerId": null,
          "Title": 0,
          "PaxTitle": null,
          "Gender": null,
          "PaxType": 1,
          "PaxTypeID": 1,
          "FirstName": "dasd dasd Mr",
          "MiddleName": null,
          "LastName": "sdsad",
          "Fqtv": null,
          "Clid": null,
          "AssociationID": 0,
          "PaxOrder": 0,
          "IsPrimaryPax": false,
          "DOB": "YYYY-DD-03",
          "Nationality": null,
          "TicketNumber": null,
          "DateOfIssue": null,
          "TicketStatusID": null,
          "CountryOfResidenceCode": null,
          "ServiceReference": null,
          "PassportInfo": null,
          "SelectedBaggageInfo": null,
          "SelectedOtherServiceInfo": null,
          "SelectedSeat": null,
          "SelectedMealInfo": null,
          "AncillaryInfo": null,
          "CouponInfo": null
      }
  ],
  "Trips": [
      {
          "BoundType": 20,
          "ResultIndex": 1,
          "FlightIndex": 1,
          "OutFlightIndex": 0,
          "InFlightIndex": 0,
          "Id": 1,
          "SupplierId": 1,
          "SupplierName": "Amadeus",
          "PCC": null,
          "SupplierCode": "1A",
          "Duration": null,
          "FareType": 0,
          "FareTypeCode": null,
          "IsRefundable": false,
          "FareSourceCode": null,
          "ValidatingAirline": "QR",
          "FlightSegments": [
              {
                  "SegmentNumber": 0,
                  "Origin": "LOS",
                  "Status": null,
                  "Destination": "DOH",
                  "DepartureDate": "260325",
                  "ArrivalDate": "260325",
                  "DepartureDt": "0001-01-01T00:00:00",
                  "ArrivalDt": "0001-01-01T00:00:00",
                  "Equipment": "788",
                  "MarketingAirline": "QR",
                  "OperatingAirline": null,
                  "SeatsRemaining": "0",
                  "CabinClass": "Q",
                  "FlightClass": "ECONOMY",
                  "IsEticket": true,
                  "FareBasis": "QJNGP1RX",
                  "FlightRefKey": null,
                  "Duration": "0840",
                  "FlightNumber": "QR 1408",
                  "DepartureTime": "1210",
                  "ArrivalTime": "2250",
                  "StopQuantity": 0,
                  "TerminalInfo": {
                      "FromTerminal": "I",
                      "ToTerminal": null
                  },
                  "BaggageInfo": [
                      {
                          "QuantityAllowed": "2",
                          "QuantityCode": "N",
                          "UnitQualifier": "PC",
                          "paxType": 0
                      }
                  ],
                  "Stops": null,
                  "FlightIndicator": null,
                  "SupplierId": 1,
                  "SegmentKey": "LOSDOHQR 140826032512102603252250",
                  "CompleteSegmentKey": "LOSDOHQR 140826032512102603252250ECONOMYQQJNGP1RX",
                  "SegmentAirlineKey": "QR,",
                  "cabin": null,
                  "operatingAirlineName": null,
                  "marketingAirlineName": null,
                  "AffiliateV1FlightNumber": null,
                  "SupplierMiscAttribute": null,
                  "AirlinePNR": null,
                  "SegmentKeyForSearch": "LOSDOHQRQR 140826032512102603252250"
              }
          ],
          "TripKey": "LOSDOHQR 140826032512102603252250",
          "ATripKey": "LOSDOHQR 140826032512102603252250ECONOMYQQJNGP1RX",
          "TripAirlineKey": "QR,",
          "SearchKey": "LOSDOH2025-03-260*DOHLOS2025-03-280&1&0&0&NGN&",
          "FlightClass": 0,
          "FirstSegment": {
              "SegmentNumber": 0,
              "Origin": "LOS",
              "Status": null,
              "Destination": "DOH",
              "DepartureDate": "260325",
              "ArrivalDate": "260325",
              "DepartureDt": "0001-01-01T00:00:00",
              "ArrivalDt": "0001-01-01T00:00:00",
              "Equipment": "788",
              "MarketingAirline": "QR",
              "OperatingAirline": null,
              "SeatsRemaining": "0",
              "CabinClass": "Q",
              "FlightClass": "ECONOMY",
              "IsEticket": true,
              "FareBasis": "QJNGP1RX",
              "FlightRefKey": null,
              "Duration": "0840",
              "FlightNumber": "QR 1408",
              "DepartureTime": "1210",
              "ArrivalTime": "2250",
              "StopQuantity": 0,
              "TerminalInfo": {
                  "FromTerminal": "I",
                  "ToTerminal": null
              },
              "BaggageInfo": [
                  {
                      "QuantityAllowed": "2",
                      "QuantityCode": "N",
                      "UnitQualifier": "PC",
                      "paxType": 0
                  }
              ],
              "Stops": null,
              "FlightIndicator": null,
              "SupplierId": 1,
              "SegmentKey": "LOSDOHQR 140826032512102603252250",
              "CompleteSegmentKey": "LOSDOHQR 140826032512102603252250ECONOMYQQJNGP1RX",
              "SegmentAirlineKey": "QR,",
              "cabin": null,
              "operatingAirlineName": null,
              "marketingAirlineName": null,
              "AffiliateV1FlightNumber": null,
              "SupplierMiscAttribute": null,
              "AirlinePNR": null,
              "SegmentKeyForSearch": "LOSDOHQRQR 140826032512102603252250"
          },
          "LastSegment": {
              "SegmentNumber": 0,
              "Origin": "LOS",
              "Status": null,
              "Destination": "DOH",
              "DepartureDate": "260325",
              "ArrivalDate": "260325",
              "DepartureDt": "0001-01-01T00:00:00",
              "ArrivalDt": "0001-01-01T00:00:00",
              "Equipment": "788",
              "MarketingAirline": "QR",
              "OperatingAirline": null,
              "SeatsRemaining": "0",
              "CabinClass": "Q",
              "FlightClass": "ECONOMY",
              "IsEticket": true,
              "FareBasis": "QJNGP1RX",
              "FlightRefKey": null,
              "Duration": "0840",
              "FlightNumber": "QR 1408",
              "DepartureTime": "1210",
              "ArrivalTime": "2250",
              "StopQuantity": 0,
              "TerminalInfo": {
                  "FromTerminal": "I",
                  "ToTerminal": null
              },
              "BaggageInfo": [
                  {
                      "QuantityAllowed": "2",
                      "QuantityCode": "N",
                      "UnitQualifier": "PC",
                      "paxType": 0
                  }
              ],
              "Stops": null,
              "FlightIndicator": null,
              "SupplierId": 1,
              "SegmentKey": "LOSDOHQR 140826032512102603252250",
              "CompleteSegmentKey": "LOSDOHQR 140826032512102603252250ECONOMYQQJNGP1RX",
              "SegmentAirlineKey": "QR,",
              "cabin": null,
              "operatingAirlineName": null,
              "marketingAirlineName": null,
              "AffiliateV1FlightNumber": null,
              "SupplierMiscAttribute": null,
              "AirlinePNR": null,
              "SegmentKeyForSearch": "LOSDOHQRQR 140826032512102603252250"
          },
          "SupplierMiscAttribute": null,
          "TripKeyForSearch": "LOSDOHQRQR 140826032512102603252250",
          "FlexiFareDetails": null
      },
      {
          "BoundType": 10,
          "ResultIndex": 1,
          "FlightIndex": 1,
          "OutFlightIndex": 0,
          "InFlightIndex": 0,
          "Id": 2,
          "SupplierId": 1,
          "SupplierName": "Amadeus",
          "PCC": null,
          "SupplierCode": "1A",
          "Duration": null,
          "FareType": 0,
          "FareTypeCode": null,
          "IsRefundable": false,
          "FareSourceCode": null,
          "ValidatingAirline": "QR",
          "FlightSegments": [
              {
                  "SegmentNumber": 0,
                  "Origin": "DOH",
                  "Status": null,
                  "Destination": "LOS",
                  "DepartureDate": "280325",
                  "ArrivalDate": "280325",
                  "DepartureDt": "0001-01-01T00:00:00",
                  "ArrivalDt": "0001-01-01T00:00:00",
                  "Equipment": "788",
                  "MarketingAirline": "QR",
                  "OperatingAirline": null,
                  "SeatsRemaining": "0",
                  "CabinClass": "Q",
                  "FlightClass": "ECONOMY",
                  "IsEticket": true,
                  "FareBasis": "QJNGP1RX",
                  "FlightRefKey": null,
                  "Duration": "0840",
                  "FlightNumber": "QR 1405",
                  "DepartureTime": "0925",
                  "ArrivalTime": "1605",
                  "StopQuantity": 0,
                  "TerminalInfo": {
                      "FromTerminal": null,
                      "ToTerminal": "I"
                  },
                  "BaggageInfo": [
                      {
                          "QuantityAllowed": "2",
                          "QuantityCode": "N",
                          "UnitQualifier": "PC",
                          "paxType": 0
                      }
                  ],
                  "Stops": null,
                  "FlightIndicator": null,
                  "SupplierId": 1,
                  "SegmentKey": "DOHLOSQR 140528032509252803251605",
                  "CompleteSegmentKey": "DOHLOSQR 140528032509252803251605ECONOMYQQJNGP1RX",
                  "SegmentAirlineKey": "QR,",
                  "cabin": null,
                  "operatingAirlineName": null,
                  "marketingAirlineName": null,
                  "AffiliateV1FlightNumber": null,
                  "SupplierMiscAttribute": null,
                  "AirlinePNR": null,
                  "SegmentKeyForSearch": "DOHLOSQRQR 140528032509252803251605"
              }
          ],
          "TripKey": "DOHLOSQR 140528032509252803251605",
          "ATripKey": "DOHLOSQR 140528032509252803251605ECONOMYQQJNGP1RX",
          "TripAirlineKey": "QR,",
          "SearchKey": "LOSDOH2025-03-260*DOHLOS2025-03-280&1&0&0&NGN&",
          "FlightClass": 0,
          "FirstSegment": {
              "SegmentNumber": 0,
              "Origin": "DOH",
              "Status": null,
              "Destination": "LOS",
              "DepartureDate": "280325",
              "ArrivalDate": "280325",
              "DepartureDt": "0001-01-01T00:00:00",
              "ArrivalDt": "0001-01-01T00:00:00",
              "Equipment": "788",
              "MarketingAirline": "QR",
              "OperatingAirline": null,
              "SeatsRemaining": "0",
              "CabinClass": "Q",
              "FlightClass": "ECONOMY",
              "IsEticket": true,
              "FareBasis": "QJNGP1RX",
              "FlightRefKey": null,
              "Duration": "0840",
              "FlightNumber": "QR 1405",
              "DepartureTime": "0925",
              "ArrivalTime": "1605",
              "StopQuantity": 0,
              "TerminalInfo": {
                  "FromTerminal": null,
                  "ToTerminal": "I"
              },
              "BaggageInfo": [
                  {
                      "QuantityAllowed": "2",
                      "QuantityCode": "N",
                      "UnitQualifier": "PC",
                      "paxType": 0
                  }
              ],
              "Stops": null,
              "FlightIndicator": null,
              "SupplierId": 1,
              "SegmentKey": "DOHLOSQR 140528032509252803251605",
              "CompleteSegmentKey": "DOHLOSQR 140528032509252803251605ECONOMYQQJNGP1RX",
              "SegmentAirlineKey": "QR,",
              "cabin": null,
              "operatingAirlineName": null,
              "marketingAirlineName": null,
              "AffiliateV1FlightNumber": null,
              "SupplierMiscAttribute": null,
              "AirlinePNR": null,
              "SegmentKeyForSearch": "DOHLOSQRQR 140528032509252803251605"
          },
          "LastSegment": {
              "SegmentNumber": 0,
              "Origin": "DOH",
              "Status": null,
              "Destination": "LOS",
              "DepartureDate": "280325",
              "ArrivalDate": "280325",
              "DepartureDt": "0001-01-01T00:00:00",
              "ArrivalDt": "0001-01-01T00:00:00",
              "Equipment": "788",
              "MarketingAirline": "QR",
              "OperatingAirline": null,
              "SeatsRemaining": "0",
              "CabinClass": "Q",
              "FlightClass": "ECONOMY",
              "IsEticket": true,
              "FareBasis": "QJNGP1RX",
              "FlightRefKey": null,
              "Duration": "0840",
              "FlightNumber": "QR 1405",
              "DepartureTime": "0925",
              "ArrivalTime": "1605",
              "StopQuantity": 0,
              "TerminalInfo": {
                  "FromTerminal": null,
                  "ToTerminal": "I"
              },
              "BaggageInfo": [
                  {
                      "QuantityAllowed": "2",
                      "QuantityCode": "N",
                      "UnitQualifier": "PC",
                      "paxType": 0
                  }
              ],
              "Stops": null,
              "FlightIndicator": null,
              "SupplierId": 1,
              "SegmentKey": "DOHLOSQR 140528032509252803251605",
              "CompleteSegmentKey": "DOHLOSQR 140528032509252803251605ECONOMYQQJNGP1RX",
              "SegmentAirlineKey": "QR,",
              "cabin": null,
              "operatingAirlineName": null,
              "marketingAirlineName": null,
              "AffiliateV1FlightNumber": null,
              "SupplierMiscAttribute": null,
              "AirlinePNR": null,
              "SegmentKeyForSearch": "DOHLOSQRQR 140528032509252803251605"
          },
          "SupplierMiscAttribute": null,
          "TripKeyForSearch": "DOHLOSQRQR 140528032509252803251605",
          "FlexiFareDetails": null
      }
  ],
  "priceSummary": {
      "AdultBaseFare": 817773,
      "AdultTaxes": 611531,
      "AdultYQTax": 0,
      "AdultTotal": 1432304,
      "ChildBaseFare": 0,
      "ChildTaxes": 0,
      "ChildYQTax": 0,
      "ChildTotal": 0,
      "InfantBaseFare": 0,
      "InfantTaxes": 0,
      "InfantYQTax": 0,
      "InfantTotal": 0,
      "SubTotal": 1432304,
      "PriceTotal": 1432304,
      "TaxTotal": 0,
      "TaxYQTotal": 0,
      "CurrencyExchangeRate": 1,
      "HandlingFee": 0,
      "AdultMarkup": 5000,
      "ChildMarkup": 0,
      "InfantMarkup": 0,
      "AdultDiscount": 2000,
      "ChildDiscount": 0,
      "InfantDiscount": 0,
      "IsRefundable": false,
      "BaseCurrency": null,
      "SelectedCurrency": "NGN",
      "SupplierCurrency": "NGN",
      "Adults": 1,
      "Children": 0,
      "Infants": 0,
      "DropnetDiscount": 0,
      "Commission": 0,
      "SegmentDiscount": 0,
      "SupplierBookingFee": 0,
      "penalty": null
  },
  "Response": null,
  "Error": null,
  "DialCode": "234",
  "MobileNumber": "7169542",
  "EmailAddress": "azeez@gmail.com",
  "flightSearchRequest": {
      "SearchSegments": [
          {
              "Origin": "LOS",
              "Destination": "DOH",
              "DepartureDate": "2025-03-26",
              "BoundType": 20,
              "FlightClass": 0,
              "AirlinePreference": []
          },
          {
              "Origin": "DOH",
              "Destination": "LOS",
              "DepartureDate": "2025-03-28",
              "BoundType": 10,
              "FlightClass": 0,
              "AirlinePreference": []
          }
      ],
      "SearchId": null,
      "CustomerUser_ID": 1,
      "AffiliateName": null,
      "Language": null,
      "TypeOfTrip": 2,
      "Source": "API",
      "Suppliers": null,
      "FirstSegment": {
          "Origin": "LOS",
          "Destination": "DOH",
          "DepartureDate": "2025-03-26",
          "BoundType": 20,
          "FlightClass": 0,
          "AirlinePreference": []
      },
      "LastSegment": {
          "Origin": "DOH",
          "Destination": "LOS",
          "DepartureDate": "2025-03-28",
          "BoundType": 10,
          "FlightClass": 0,
          "AirlinePreference": []
      },
      "IsDirectFlight": false,
      "IsDateFlexible": false,
      "ApplicationConfig": {
          "FareType": 0,
          "CustomerProfileId": 1
      },
      "ActiveAirlines": [],
      "NumberOfInfants": 0,
      "NumberOfChildren": 0,
      "NumberOfAdults": 1,
      "SearchKey": "Published-LOSDOH2025-03-260DOHLOS2025-03-2801ADT0CHD0INF~1",
      "SearchKeyInbound": "DOHDOHLOS2025-03-281ADT0CHD0INF",
      "SearchKeyOutbound": "LOSDOH2025-03-261ADT0CHD0INF",
      "SearchKeyOutboundPlusOne": "LOSDOH2025-03-271ADT0CHD0INF",
      "AffiliateSelectedFlight": null,
      "BlockedAirlines": [],
      "CountryCode": null,
      "SelectedCurrency": "NGN",
      "SupplierId": 1,
      "SupplierName": "Amadeus",
      "OriginCountry": null,
      "DestinationCountry": null,
      "RequestType": null,
      "Cred": "",
      "SearchPassengerType": null,
      "PromoCodes": null,
      "CorporateCodes": null,
      "SearchSource": null,
      "IsDealFare": false
  },
  "CorporateCode": null,
  "RawPrices": [
      {
          "TripId": 0,
          "SegmentId": 0,
          "Quantity": 1,
          "BaseFare": 817773,
          "tempEquiv": 0,
          "Taxes": 611531,
          "SupplierCurrency": "NGN",
          "SupplierExchangeRate": 1,
          "BaseExchangeRate": 1,
          "CommissionType": 1,
          "Commission": 0,
          "PaxType": 1,
          "YQTax": 0,
          "TaxInfo": null
      }
  ],
  "Code": 0,
  "Message": null,
  "IMessage": null
}
  htmlView: any;



  constructor(
    private router: Router,
    public sharedService: SharedService,
    private _amadeusservice: AmadeusService,
    private _flightService: FlightService,
    private form: FormBuilder,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService,
    private datepipe: DatePipe,
    private _authenticationService: AuthenticationService,
    public _microService: MicroService,
    private sanitizer: DomSanitizer
  ) {
    // this.fare_PriceUpsell_Res_AllList= this.sharedService?.getLocalStore("airPricePointSelected");
    if (
      this.sharedService.getLocalStore('affiliate_user') != '' &&
      this.sharedService.getLocalStore('affiliate_user') != undefined
    ) {
      this.affiliated_user = JSON.parse(
        this.sharedService.getLocalStore('affiliate_user')
      );
      this.affiliate_user_permission = this.affiliated_user?.permissions.filter(
        (item: { moduleName: string }) => item.moduleName == 'AIR SERVICES'
      )[0];
    }

    this.currentUser = this._authenticationService.affliateUser;

    this.getCurrentPath();
  }


  get passengerDetailsArrayControl() {
    // return this.flightPassenger.controls;
    return this.flightPassenger?.get('passengerDetailsArray') as FormArray;
  }
  get travelInsuranceID() {
    return this.flightPassenger?.get('travelInsuranceID') as FormControl;
  }
  get refundableBooking() {
    return this.flightPassenger?.get('refundableBooking') as FormControl;
  }
  get sms() {
    return this.flightPassenger?.get('sms') as FormControl;
  }
  get emailID() {
    return this.flightPassenger?.get('emailID') as FormControl;
  }
  get phoneNumber() {
    return this.flightPassenger?.get('phoneNumber') as FormControl;
  }

  ngOnInit() {
    // this.LoadFlightBookingSuccessTemplate(this.pnrRs);

    // const emailTemplate = this.htmlHead +
    // this.htmlBody +
    // this.flightdetails_header +
    // this.segmentdetails +
    // this.pricedetails +
    // this.footer;

    // this.htmlView = this.sanitizer.bypassSecurityTrustHtml(emailTemplate)
    this.flightResultData = this.sharedService?.getLocalStore('flightData');
    this.flightFareData = this.sharedService?.getLocalStore('airPricePointSelected');
    this.flightFareFamily = this.sharedService?.getLocalStore('fareFamily');
    // this.totalFareTotalPrice = this.flightFareData?.price?.grandTotal ?? 0
    this.getCountryData();
    // this.LoadPassengerDetails();
    this.flightPassenger = this.form.group({
      // passengerDetailsArray: this.form.array([this.createItem()])
      emailID: [
        '',
        [Validators.required, Validators.pattern(RegExpValidators.email)],
      ],
      phoneNumber: ['', [Validators.required]],
      travelInsuranceID: ['Y'],
      refundableBooking: ['N'],
      sms: ['Y'],
      passengerDetailsArray: this.form.array([]),
    });
    if (this.flightFareData != undefined && this.flightFareData != null)  {
     this.revalidateObj = null;
     this.revalidateObj = {
        SelectedTripFareKeys: [
          {
            RevalidateKey: this.flightFareData?.FSC,
          }
        ]
      }
      this.flightRevalidate(this.revalidateObj);
    } else if(this.flightFareFamily != undefined && this.flightFareFamily != null){

      this.revalidateObj = null;
      this.revalidateObj = {
        CustomerProfileId:this.currentUser.customerProfile_ID,
        SelectedTripFareKeys: [
          {
            RevalidateKey: this.flightFareFamily?.FSC,
            selectedFareFamilies: [{
              id:this.flightFareFamily.selectedFare.ServiceId,
              boundType:this.flightFareFamily.boundType
            }]
          }
        ]
      }
      this.flightRevalidate(this.revalidateObj);
    }else {
      this.router.navigateByUrl('/');
    }
    // this.totalAmount =  this.flightFareData?.selectedFare?.totalAmount ??  (this.flightFareData?.flightDetails?.recomentationList?.recPriceInfo?.totalPrice_modified  ?? 0)

    // this.getPricingDetails();
    // this.getPricePassengerData();

  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  createPassengerDetailsArray(passengers: any) {
    this.passengerDetailsArray = this.flightPassenger?.get('passengerDetailsArray') as FormArray;
    let travellerIndex = 0;
    for (let i = 0; i < passengers?.PriceSummary?.Adults; i++) {
      this.passengerDetailsArray.push(this.createItem('Adult', travellerIndex, passengers?.PriceSummary));
      travellerIndex++;
    }
    for (let i = 0; i < passengers?.PriceSummary?.Children; i++) {
      this.passengerDetailsArray.push(this.createItem('Child', travellerIndex, passengers?.PriceSummary));
      travellerIndex++;
    }
    for (let i = 0; i < passengers?.PriceSummary?.Infants; i++) {
      this.passengerDetailsArray.push(this.createItem('Infant', travellerIndex, passengers?.PriceSummary, i));
      travellerIndex++;
    }
  }


  flightRevalidate(revalidateObj) {

    

    this.isLoading = true;
    this._flightService.flightFareRevalidate(revalidateObj)
      .subscribe({
        complete: () => { this.isLoading = false; },
        error: (error: any) => { this.isLoading = false; },
        next: (data: any) => {
          if (data?.Error !== null) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data?.Error?.Message ?? 'Oops! Something went wrong' });
            setTimeout(() => {
              this.router.navigate(['/result-page']);
            }, 1000)

          }
          else {
            this.isShowPriceWarning = ((data.FlightItinerary?.PriceSummary.SubTotal ?? 0) - (this.flightFareData?.PriceSummary?.SubTotal ?? 0)) !== 0
            this.priceReConfirmation = data;
            this.priceReConfirmation.FlightItinerary?.Trips?.forEach((trips: any, tripIndex: number) => {
              trips.selectedFareIndex = null;
              // trips['vendorName'] = this.getAirlineName(trips?.ValidatingAirline);
              // trips?.FlightSegments?.map((segments: any) => segments['vendorName'] = this.getAirlineName(segments?.MarketingAirline));
            });
            this.isLoading = false;
            this.createPassengerDetailsArray(data?.FlightItinerary);
            // this.totalMarkUpValue = 0;

            this.LoadPassengerDetails();
            const departTime = this._microService?.getFormatedFlightDate(this.priceReConfirmation?.FlightItinerary?.Trips[0]?.FlightSegments[0]?.DepartureDate)

            this.priceReConfirmation['installmentAmount'] = this.sharedService.getInstallmentAmount(this.priceReConfirmation?.FlightItinerary?.PriceSummary?.SubTotal ?? 0, 20);
            this.priceReConfirmation['isInstallmentApplicable'] = this.sharedService.getInstallationDateDuration(departTime) ?? false;

            if(this.flightFareData != undefined && this.flightFareData != null) {
              if (this.flightFareData?.flightFareInstallementDetails) {
                this.installmentAppliedChanged(this.flightFareData?.flightFareInstallementDetails);
              }
              else {
                this.totalFareTotalPrice = this.priceReConfirmation?.FlightItinerary.PriceSummary?.SubTotal ?? 0;
              }
            }else {
              if (this.flightFareFamily?.flightFareInstallementDetails) {
                this.installmentAppliedChanged(this.flightFareFamily?.flightFareInstallementDetails);
              }
              else {
                this.totalFareTotalPrice = this.priceReConfirmation?.FlightItinerary.PriceSummary?.SubTotal ?? 0;
              }
            }
           
            if (data?.Error?.Code === 203) {

              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Transaction Invalid or Expired ' });

            }
          }
        },
      });
  }

  getCountryData() {
    this.sharedService.getAllCountry().subscribe((res) => {
      this.countryOptionList = res;
    });
  }

  LoadPassengerDetails() {
    const datepipe: DatePipe = new DatePipe('en-US');
    var journeryDepartureDate = new Date(this._microService?.getFormatedFlightDate(this.priceReConfirmation?.FlightItinerary?.Trips[0]?.FlightSegments[0]?.DepartureDate));
    //alert(journeryDepartureDate)
    var dateJourney = journeryDepartureDate.toISOString().substr(0, 10);
    var arr = dateJourney.split('-');
    let year = Number(arr[0]);
    let month = Number(arr[1]);
    let day = Number(arr[2]);
    let adultYear = year - 12;
    let infantYear = year - 2;
    let childYear = year - 2;
    let childMinYear = year - 12;
    let infantMonth = month;
    let childMinMonth = month;

    var is31 = this.checkMonth31(month.toString());

    let infantDay = 1;
    let childMinDay = 1;

    if (is31 == true && day == 31) {
      if (infantMonth == 12) {
        infantMonth = 1;
        infantYear = infantYear + 1;
      } else {
        infantMonth = infantMonth + 1;
      }
      if (childMinMonth == 12) {
        childMinMonth = 1;
        childMinYear = childMinYear + 1;
      } else {
        childMinMonth = childMinMonth + 1;
      }
    } else if (is31 == false && day == 30) {
      // infantMonth=infantMonth+1;
      // childMonth=childMonth+1;
      if (infantMonth == 12) {
        infantMonth = 1;
        infantYear = infantYear + 1;
      } else {
        infantMonth = infantMonth + 1;
      }
      if (childMinMonth == 12) {
        childMinMonth = 1;
        childMinYear = childMinYear + 1;
      } else {
        childMinMonth = childMinMonth + 1;
      }
    } else if (month == 2 && day == 29) {
      infantMonth = infantMonth + 1;
      childMinMonth = childMinMonth + 1;
    } else if (month == 2 && day == 28) {
      if (this.isLeapYear(childMinYear) == false) {
        childMinMonth = childMinMonth + 1;
      } else {
        childMinDay = day + 1;
      }
      if (this.isLeapYear(infantYear) == false) {
        infantMonth = infantMonth + 1;
      } else {
        infantDay = day + 1;
      }
    } else {
      infantDay = day + 1;
      childMinDay = day + 1;
    }

    let infMonth = infantMonth.toString();
    let chMinMonth = childMinMonth.toString();
    let infDay = infantDay.toString();
    let chMinDay = childMinDay.toString();
    if (new String(infantMonth).length == 1) {
      infMonth = '0' + infantMonth.toString();
    }
    if (new String(childMinMonth).length == 1) {
      chMinMonth = '0' + childMinMonth.toString();
    }
    if (new String(infantDay).length == 1) {
      infDay = '0' + infantDay.toString();
    }
    if (new String(childMinDay).length == 1) {
      chMinDay = '0' + childMinDay.toString();
    }

    this.adultMaxDate = new Date(
      adultYear.toString() + '-' + arr[1] + '-' + arr[2]
    );
    this.childMinDate = new Date(
      childMinYear.toString() + '-' + chMinMonth + '-' + chMinDay.toString()
    );
    this.childMaxDate = new Date(
      childYear.toString() + '-' + arr[1] + '-' + arr[2]
    );
    this.infantMinDate = new Date(
      infantYear.toString() + '-' + infMonth + '-' + infDay.toString()
    );
  }

  passengerDetailsArrayControls(
    index: number,
    control: string,
    array: string = 'passengerDetailsArray'
  ) {
    return (this.flightPassenger?.get(array) as FormArray)
    ['at'](index)
      .get(control) as FormControl<any>;
  }

  checkMonth31(mon: string) {
    switch (mon) {
      case '1':
        return true;
        break;
      case '2':
        return false;
        break;
      case '3':
        return true;
        break;
      case '4':
        return false;
        break;
      case '5':
        return true;
        break;
      case '6':
        return false;
        break;
      case '7':
        return true;
        break;
      case '8':
        return true;
        break;
      case '9':
        return false;
        break;
      case '10':
        return true;
        break;
      case '11':
        return false;
        break;
      case '12':
        return true;
        break;
      default:
        return true;
        break;
    }
  }

  isLeapYear(year: number) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  createItem(type: string = 'Adult', ptcCount: number = null, priceSummary: any, associationID: number = 0) {
    return this.form.group({
      ptc: [type],
      paxId: [ptcCount],
      prefix: ['', [Validators.required]],
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
          Validators.pattern(RegExpValidators.alphaLettersName),
        ],
      ],
      middleName: [
        '',
        [
          Validators.minLength(1),
          Validators.maxLength(30),
          Validators.pattern(RegExpValidators.alphaLettersName),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(30),
          Validators.pattern(RegExpValidators.alphaLettersName),
        ],
      ],
      // lastName: ['', [Validators.required, Validators.pattern(RegExpValidators.alphaLettersName)]],
      dOB: ['', [Validators.required]],
      // accountNumber: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern(RegExpValidators.alphaNumeric)]],
      nationality: ['', []],
      passportNumber: [
        '',
        [
          Validators.minLength(4),
          Validators.pattern(RegExpValidators.alphaNumeric),
        ],
      ],
      countryOfIssue: ['', []],
      dateOfExpiry: ['', []],
      address: [''],
      discountType: [''],
      approvedDiscount: [''],
      discountApproverUser_ID: [''],
      discountApprovalEmailTemplate: [''],
      ticketingApprovalEmailTemplate: [''],
      discountAmount: [0],
      discountPercentage: [0],
      // markup: this.GetMarkupAmount(paxReference),
      // individualTotalPrice:this.GetIndividualPassengerAmount(paxReference),
      paxTypeID: type === 'Adult' ? 1 : type === 'Child' ? 2 : 3,
      associatedInfantId:
        type === 'INF' ? [0, [Validators.required]] : [0],
      associatedAdultId: [1],
      type: [type],
      idType: ['P'],
      age: [0],
      gender: [''],
    });
  }



  getTravellerData(passenger: any, associatedAdultId: number = 0) {
    // console.log(
    //   passenger?.nationality !== '' &&
    //   passenger?.nationality !== null &&
    //   passenger.passportNumber !== '' &&
    //   passenger.passportNumber !== null &&
    //   passenger.dateOfExpiry !== '' &&
    //   passenger.dateOfExpiry !== null &&
    //   passenger?.countryOfIssue !== '' &&
    //   passenger?.countryOfIssue !== null
    // );
    // const datepipe: DatePipe = new DatePipe('en-US');
    // console.log(this.flightPassenger);

    // let passengerDetailsObj = {
    //   id: passenger?.paxId,
    //   dateOfBirth: datepipe.transform(passenger.dOB, 'yyyy-MM-dd'),
    //   name: {
    //     firstName:
    //       (passenger.firstName ?? '') +
    //       ' ' +
    //       (passenger.middleName ?? '') +
    //       '  ' +
    //       passenger?.prefix?.value,
    //     middleName: passenger.middleName ?? '',
    //     lastName: passenger.lastName ?? '',
    //   },
    //   // gender: (passenger?.prefix?.value == 'Ms' || passenger?.prefix?.value == 'Mrs' || passenger?.prefix?.value == 'Miss' || passenger?.prefix?.value == 'SHKA') ? 'FEMALE'
    //   //   : (passenger?.prefix?.value == 'Mr' ||
    //   //     passenger?.prefix?.value == 'Mstr' ||
    //   //     passenger?.prefix?.value == 'SHK')
    //   //     ? 'MALE'
    //   //     : 'MALE',
    //   gender: 'UNSPECIFIED',
    //   contact: {
    //     emailAddress: this.flightPassenger?.value?.emailID,
    //     phones: [
    //       {
    //         deviceType: 'MOBILE',
    //         countryCallingCode:
    //           (this.flightPassenger?.value?.phoneNumber?.dialCode).replace(
    //             '+',
    //             ''
    //           ),
    //         number:
    //           this.flightPassenger?.value?.phoneNumber?.e164Number?.replace(
    //             this.flightPassenger?.value?.phoneNumber?.dialCode,
    //             ''
    //           ),
    //       },
    //     ],
    //   },
    //   documents:
    //     passenger?.nationality !== '' &&
    //       passenger?.nationality !== null &&
    //       passenger.passportNumber !== '' &&
    //       passenger.passportNumber !== null &&
    //       passenger.dateOfExpiry !== '' &&
    //       passenger.dateOfExpiry !== null &&
    //       passenger?.countryOfIssue !== '' &&
    //       passenger?.countryOfIssue !== null
    //       ? [
    //         {
    //           documentType: 'PASSPORT',
    //           issuanceDate:
    //             datepipe.transform(new Date(), 'yyyy-MM-dd') ?? '',
    //           number: passenger?.passportNumber ?? '',
    //           expiryDate:
    //             datepipe.transform(passenger?.dateOfExpiry, 'yyyy-MM-dd') ??
    //             '',
    //           issuanceCountry: passenger?.countryOfIssue?.isoCode ?? '',
    //           nationality: passenger?.nationality?.isoCode ?? '',
    //           holder: true,
    //         },
    //       ]
    //       : null,
    // };

    // if (passenger?.ptc == 'HELD_INFANT') {
    //   passengerDetailsObj['associatedAdultId'] = associatedAdultId.toString();
    // }
    // return passengerDetailsObj;
  }

  passengerSubmitBtn(a) {
    if(a == 1) {

      // this.LoadFlightBookingSuccessTemplate(this.pnrRs);
      // this.sendOrderCreationMail(this.pnrRs, this.saveRq);
      this.router.navigate(['/flight-itinerary', '21']);
    }else {
      this.passengerDetailsArrayControl!.controls?.forEach(
        (passControls: any, controlIndex: number) => {
          if (
            (passControls?.controls?.nationality?.value !== '' &&
              passControls?.controls?.nationality?.value !== null) ||
            (passControls?.controls?.passportNumber?.value !== '' &&
              passControls?.controls?.passportNumber?.value !== null) ||
            (passControls?.controls?.dateOfExpiry?.value !== '' &&
              passControls?.controls?.dateOfExpiry?.value !== null) ||
            (passControls?.controls?.countryOfIssue?.value !== '' &&
              passControls?.controls?.countryOfIssue?.value !== null)
          ) {
            passControls?.controls['nationality']?.setValidators(
              Validators.required
            );
            passControls?.controls['countryOfIssue']?.setValidators(
              Validators.required
            );
            passControls?.controls['dateOfExpiry']?.setValidators(
              Validators.required
            );
            passControls?.controls['passportNumber']?.setValidators([
              Validators.required,
              Validators.minLength(4),
              Validators.pattern(RegExpValidators.alphaNumeric),
            ]);
            this.isRequiredTrigger = true;
          } else {
            passControls?.controls['nationality']?.clearValidators();
            passControls?.controls['countryOfIssue']?.clearValidators();
            passControls?.controls['dateOfExpiry']?.clearValidators();
            passControls?.controls['passportNumber']?.setValidators([
              Validators.minLength(4),
              Validators.pattern(RegExpValidators.alphaNumeric),
            ]);
            this.isRequiredTrigger = false;
          }
  
          passControls?.controls['nationality']?.updateValueAndValidity();
          passControls?.controls['countryOfIssue']?.updateValueAndValidity();
          passControls?.controls['dateOfExpiry']?.updateValueAndValidity();
          passControls?.controls['passportNumber']?.updateValueAndValidity();
  
        }
      );
  
      if (this.flightPassenger?.valid) {
  
        this.isLoading = true;
  
        let createPnrRequest = {
          bookingRequest: {
            DialCode: this.flightPassenger.value.phoneNumber?.dialCode?.replace('+', ''),
            MobileNumber: this.flightPassenger.value.phoneNumber?.number?.replace(/\s/g, ''),
            EmailAddress: this.flightPassenger.value.emailID,
            // SupplierPaymentCard: {},
            Passengers: this.getPassengerData(this.flightPassenger.value.passengerDetailsArray),
          },
          BookingRefNumber: Math.floor(10000 + Math.random() * 90000).toString(),
          RevalidateKey: this.priceReConfirmation?.RevalidateKey,
          Affiliate: 5,
          SelectedTripFareKeys: this.revalidateObj?.SelectedTripFareKeys,
          CustomerUser_ID: this.currentUser?.customerUser_ID,
          CustomerProfileId: this.currentUser.customerProfile_ID,
          TicketProcessType: 2
        }
        this.createPnr(createPnrRequest)
  
      } else {
        let s = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Please fill all required fields',
        });
        this.flightPassenger.markAllAsTouched();
        try {
          this.passengerDetailsArrayControl!.controls?.forEach(
            (element: any, index: number) => {
              if (this.passengerDetailsArray['at'](index)?.status === 'INVALID') {
                this.activeTabIndex = index;
                throw new Error('Break the loop.');
              }
            }
          );
        } catch (error) {
          this.isLoading = false;
        }
      }
    }
   
  }


  getPassportData(passDetails: any) {
    if (passDetails.passportNumber !== (null || '') && passDetails.countryOfIssue !== (null || '') && this.datepipe.transform(passDetails?.dateOfExpiry, 'YYYY-DD-MM')?.toString() !== (null || '')) {
      return {
        Number: passDetails?.passportNumber,
        IssueCountryCode: passDetails?.countryOfIssue?.isoCode,
        IssueCity: '',
        IssueDate: '',
        ExipryDate: this.datepipe.transform(passDetails?.dateOfExpiry, 'YYYY-MM-dd')?.toString(),
      }
    }
    else {
      return null;
    }
  }

  getAdditionalServiceDetails(passDetails: any, type: string = 'baggageInfo') {
    let serviceData: any = [];
    if (type === 'baggageInfo') {
      passDetails?.baggageInfoArray?.forEach((baggageInfoArray: any) => {

        let SegmentBaggages: any = [];
        // let segmentsData: any =[{
        //   SegmentBaggages:[]
        // }];
        if (baggageInfoArray?.selectType !== null) {
          SegmentBaggages.push(
            {
              BaggageCode: baggageInfoArray?.selectType?.BaggageCode,
            }
          )
          serviceData.push({ SegmentBaggages: SegmentBaggages })
        }

      });
    }
    else {
      passDetails?.mealsArray?.forEach((mealsInfo: any) => {

        let segmentMeals: any = [];
        // let segmentsData: any =[{
        //   segmentMeals:[]
        // }];

        if (mealsInfo?.selectType !== null) {
          segmentMeals.push(
            {
              MealCode: mealsInfo?.selectType?.MealCode,
              MealQuantity: 1

            }
          )
          serviceData.push({ BoundType: mealsInfo?.boundType, SegmentMeals: segmentMeals })
        }

      });
    }


    return serviceData

  }


  getPassengerData(passDetails: any) {
    const male = ['Mr', 'SHK', 'Mstr'];
    const female = ['Ms', 'Mrs', 'SHKA']
    let passengerDetailsArray: any = [];
    passDetails.forEach((passDetails: any, index: number) => {
      passengerDetailsArray.push({
        PassangerId: (index + 1).toString(),
        PaxTitle: passDetails?.prefix?.value,
        Gender: male.includes(passDetails?.prefix?.value) ? 'Male' : female.includes(passDetails?.prefix?.value) ? 'Female' : 'Others',
        PaxTypeID: passDetails?.paxTypeID,
        FirstName: passDetails?.firstName,
        MiddleName: passDetails?.middleName,
        LastName: passDetails?.lastName,
        AssociationID: passDetails?.associationID,
        PaxOrder: index,
        IsPrimaryPax: index === 0 ? true : false,
        DOB: this.datepipe.transform(passDetails.dOB, 'YYYY-MM-dd'),
        Nationality: passDetails?.nationality?.isoCode,
        TicketNumber: '',
        PassportInfo: this.getPassportData(passDetails),
        // DateOfIssue: this._userProfile.convertToData(passDetails?.dateOfExpiry).toString(),
        TicketStatusID: 0,
        CountryOfResidenceCode: passDetails?.nationality?.isoCode,
        SelectedBaggageInfo: this.getAdditionalServiceDetails(passDetails, 'baggageInfo'),
        SelectedMealInfo: this.getAdditionalServiceDetails(passDetails, 'mealInfo'),
      })
    });

    return passengerDetailsArray;
  }

  LoadFlightBookingSuccessTemplate(pnrData: any) {
    var bookingdate = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm');
    var crspnr = pnrData?.AirlinePNR;

    this.htmlHead =
      '<html><head><style>.page-break { clear: both; margin-bottom: 20px; } .print_btn_area { text-align: center; margin-bottom: 20px; } td { color: #555; } p { margin: 0 0 8px;} ol { padding-left: 15px; } /* button:not (.btn-checked ) .select { display: none; } */  .page-break { page-break-after: always; } header, .main-footer, .main-header, .navbar, .main-sidebar, .print_btn_area, .not_print_area, footer, .sinupsec, .comonfooter, .footercopy { display: none !important; } .skin-black-light .content-wrapper, .skin-black-light .main-footer {border-left:0px !important;} table { width: 100% !important; white-space: normal !important; } p { margin-bottom: 5px; } .irctc { background-color: #da1e26 !important; -webkit-print-color-adjust: exact; } .colr {color: #fff !important;} .mntbl { border: none !important;} </style> </head>';
    this.htmlBody =
      "<body> <div class='page-break'></div> <table style='border-collapse: collapse; background: #ffffff; border: 2px solid #e3e3e3; font-size: 12px; margin: 0 auto; font-family: arial; max-width:900px' width='100%' cellpadding='0' cellspacing='0' border='0'> <tbody> <tr> <td style='border-collapse: collapse; padding: 15px;'> <table width='100%' style='border-collapse: collapse;' cellpadding='0' cellspacing='0' border='0'> <tr> <td style='width: 50%; text-align: left; padding: 10px 0px; line-height: 20px;' class='logocvr'> <div class='address-details'> <img src='https://travel.konga.com/assets/img/common/logo_trav.png' width='140' alt='logo' /><br /> <br /> <img src='https://www.kongapay.com/img/phoneIcon.png?v=1662434120' width='20' style='margin-right: 5px;'/><b><strong style='font-size: 15px;'> (+234) 8094605555, (+234) 7080635700 </strong></b> </div> </td> <td style='width: 50%; text-align: left; padding: 0 0px 10px; line-height: 20px;' class='logocvr'> <table style='width: 100%;'> <tr> <td style='padding: 5px 10px; background: #f5f5f5; border: 1px solid #fff;'><strong>Booking Date</strong> </td> <td style='padding: 5px 10px; color: #1a8282; background: #f5f5f5; border: 1px solid #fff;'>" +
      bookingdate +
      "</td> </tr> <tr> <td style='padding: 5px 10px; background: #f5f5f5; border: 1px solid #fff;'><strong>Booking Reference</strong> </td> <td style='padding: 5px 10px; color: #1a8282; background: #f5f5f5; border: 1px solid #fff;'>" +
      crspnr +
      "</td> </tr> <tr> <td style='padding: 5px 10px; background: #f5f5f5; border: 1px solid #fff;'><strong>Booking Status</strong> </td> <td style='padding: 5px 10px; color: #1a8282; background: #f5f5f5; border: 1px solid #fff;'>CONFIRMED</td> </tr> </table> </td> </tr>" +
      "<tr><td colspan='2'><table cellpadding='0' cellspacing='0' border='0' width='100%' style='border-collapse: collapse;'>";

    this.flightdetails_header =
      "<tr bgcolor='#E5077F' class='bookbg'>" +
      "<td width='100%' class='bookbg' style='padding: 7px 10px; font-size: 14px; text-align: center; color: #fff; font-weight: bold;'>Flight  Details</td>" +
      '</tr>' +
      '<tr>' +
      "<td colspan='4' style='margin-top: 10px; display: inline-block; width: 100%;'>" +
      "<table style='width: 100%;'>" +
      '<tr>' +
      "<td style='width: 70%; padding: 10px; line-height: 20px;'>" +
      "<div style='font-weight: bold; float: left'>" +
      '</div>' +
      "<div style='font-weight: bold; float: left; margin-left: 30px;'></br>" +
      '</div>' +
      '</td>' +
      "<td style='width: 30%; padding: 0px 10px; vertical-align: top; height: 60px;'>" +
      "<div style='width: 100%; font-weight: 700; text-align: center; line-height: 20px; background: #fff; border:1px solid #ccc; padding:5px 0px;'>" +
      "<p style='margin: 0px 0px; color:#333; font-weight: 700; font-size: 12px; padding: 5px; text-align:center;'><span style='color:#444;'>GDS PNR:</span> " +
      crspnr +
      '</p>' +
      '</div>' +
      '</td>' +
      '</tr>' +
      '</table>' +
      '</td>' +
      '</tr>';
    //ITINERARY
    pnrData?.Trips.forEach((trips: any) => {
        trips?.FlightSegments?.forEach((segments: any) =>{

          this.segmentdetails =
            this.segmentdetails +
            "<tr><td style='line-height: 5px;'>&nbsp;</td>" +
            '</tr>' +
            "<tr bgcolor='#9f9f9f' style='vertical-align:middle;border: 1px solid #9f9f9f;' class='grey'>" +
            "<td style='padding:7px 10px;vertical-align:middle;font-size:12px;text-align:left;margin-top:0px;color:#fff;'>" +
            "<img src='https://travel.konga.com/assets/img/common/FlightDeparture.png' width='20px' style='margin-right: 5px;'/> Flight Details (" +
            segments.Origin + ' to ' +
            segments.Destination +
            ')'  +
            "<p style='display: block;'>*Please verify flight times with the airlines prior to departure</p></td>" +
            '</tr>';

          var dep_date =  this._microService?.getFormatedFlightDate(segments.DepartureDate, true,"EE , d&nbsp;MMM&nbsp;''''yy");
            
          var arrival_date =   this._microService?.getFormatedFlightDate(segments.ArrivalDate,true,"EE , d&nbsp;MMM&nbsp;''''yy")
          this.segmentdetails =
            this.segmentdetails +
            '<tr>' +
            "<td width='100%' style='border: 1px solid #eee; width: 100%; display: inline-block;'>" +
            "<table width='100%' cellpadding='5' style='padding: 0px; font-size: 12px;'>" +
            '<tr>' +
            "<td style='padding: 2px 5px; width:20%; background: #f5f5f5; color: #555;'><strong>Flight</strong></td>" +
            "<td style='padding: 2px 5px; background: #f5f5f5; color: #555;'><strong>" +
            "<img src='https://travel.konga.com/assets/img/common/FlightDepartureBlack.png' width='20px' style='margin-right: 5px;'/>Departing</strong>" +
            '</td>' +
            "<td style='padding: 2px 5px; background: #f5f5f5; color: #555;'><strong>" +
            "<img src='https://travel.konga.com/assets/img/common/FlightArrivalBlack.png' width='20px' style='margin-right: 5px;'/>Arriving</strong>" +
            '</td>' +
            //  "<td style='padding: 2px 5px; background: #f5f5f5; color: #555;'><strong>Duration</strong></td>"+
            '</tr>' +
            "<tr style='padding-bottom: 20px; font-size: 13px; line-height: 20px; vertical-align: top;'>" +
            "<td style='padding: 5px; background: #fff;'>" +
            "<div style='font-weight: bold;'><img src='https://travel.konga.com/assets/img/Airlogo/sm" +
            segments?.MarketingAirline +
            ".gif' alt='img'></div>" +
            "<div style='font-weight: bold; color: #666;'>" +
            segments?.MarketingAirline +
            ' ' +
            segments?.FlightNumber +
            '</div>' +
            "<div style='font-weight: bold; color: #666;'>" +
            segments?.Equipment +
            '</div>' +
            "<div style='font-weight: normal; color: #777;'>Cabin: " +
            segments?.FlightClass +
            '</div>' +
            '</td>' +
            "<td style='padding: 5px; background: #fff;'>" +
            "<div style='font-weight: bold;'>" +
            segments.Origin +
            '</div>' +
            "<div style='font-weight: bold; color: #666;'>" +
            dep_date +
            '</div>' +
            '</td>' +
            "<td style='padding: 5px; background: #fff;'>" +
            "<div style='font-weight: bold;'>" +
            segments.Destination +
            '</div>' +
            "<div style='font-weight: bold; color: #666;'>" +
            arrival_date +
            '</div>' +
            '</td>' +
            //  "<td style='padding: 5px 15px; background: #fff;'>"+
            //     "<div style='font-weight: normal; color: #666'>"+segment_i.duration+"</div>"+
            //  "</td>"+
            '</tr>' +
            '</table>' +
            '</td>' +
            '</tr>';
        
      });


      this.passengerdetails =
      '<tr><td>&nbsp;</td></tr>' +
      "<tr bgcolor='#fff'>" +
      "<td style='padding: 5px 10px;width:100%;font-size: 13px;text-align:left;display:table-cell;background: #9f9f9f;margin-top:17px;color:#fff;'><i class='fa fa-users' style='margin-right: 8px;'></i>Passenger(s) Details " +
      '</td>' +
      '</tr>' +
      '<tr>' +
      "<td style='border: 1px solid #eee;'>" +
      "<table width='100%' cellpadding='5' style='padding: 0px; font-size: 12px;'>" +
      '<tr>' +
      "<td style='padding: 2px 5px; width: 10%; background: #f5f5f5; color: #555;'>Sr No.</td>" +
      "<td style='padding: 2px 5px; width:20%; background: #f5f5f5; color: #555;'>Passenger(s) Name</td>" +
      "<td style='padding: 2px 5px; width:10%; background: #f5f5f5; color: #555;'>Type</td>" +
      "<td style='padding: 2px 5px; width:10%; background: #f5f5f5; color: #555;'>Baggage</td>" +
      "<td style='padding: 2px 5px; background: #f5f5f5; width:25%; color: #555; text-align:center;'>Ticket Status.</td>" +
      '</tr>';

      pnrData?.Passengers?.forEach((passenger: any, index: number) => {
        let baggage = '---';
        if(trips.FlightSegments[0]?.BaggageInfo != null && trips.FlightSegments[0]?.BaggageInfo.length> 0) {

          trips.FlightSegments[0]?.BaggageInfo.forEach(baggage=> {
            if(baggage.paxType == passenger?.PaxType) {
              baggage = baggage.QuantityAllowed + " "+ baggage.UnitQualifier;
            }
          });
        }

            var trav_type =
              passenger?.PaxType === 1 ? 'Adult' :  passenger?.PaxType === 2 ? 'Child' : 'Infant'
            
            this.passengerdetails +=
              "<tr style='font-size: 13px;'>" +
              "<td style='padding: 2px 5px; background: #fff;'>" +
              (index +1) +
              '</td>' +
              "<td style='padding: 2px 5px; background: #fff;'><strong>" +
              (passenger.PaxTitle ? passenger.PaxTitle.toUpperCase() + ' ' : '') +
              (passenger.FirstName ? passenger.FirstName.toUpperCase() + ' ' : '') +
              (passenger.MiddleName ? passenger.MiddleName.toUpperCase() + ' ' : '') +
              (passenger.LastName ? passenger.LastName.toUpperCase() : '') +
              '</strong></td>' +
              "<td style='padding: 2px 5px; background: #fff;'>" +
              trav_type +
              '</td>' +
              "<td style='padding: 2px 5px; background: #fff;'>" +
              baggage +
              '</td>' +
              "<td style='padding: 2px 5px; background: #fff; text-align:center;'>Pending</td>" +
              '</tr>';
  
    });
    this.passengerdetails += '</table>' + '</td>' + '<td></td>' + '</tr>';
    this.segmentdetails += this.passengerdetails

      }
    );
    //passenger details
    // var baggage =
    //   this.flightorderResponse.data.flightOffers[0].travelerPricings[0]
    //     .fareDetailsBySegment[0].includedCheckedBags?.quantity != undefined
    //     ? this.flightorderResponse.data.flightOffers[0].travelerPricings[0]
    //       .fareDetailsBySegment[0].includedCheckedBags.quantity + ' PC'
    //     : this.flightorderResponse.data.flightOffers[0].travelerPricings[0]
    //       .fareDetailsBySegment[0].includedCheckedBags.weight + ' KG';

   
    this.pricedetails =
      '<tr><td>&nbsp;</td></tr>' +
      "<tr bgcolor='#fff'>" +
      "<td colspan='2' style='width: 100%'>" +
      "<table style='width: 100%; border: 1px solid #eee' class='fare-details'>" +
      '<tr>' +
      "<td style='padding: 10px; width: 50%; font-size: 13px; text-align: center; display: table-cell; background: #fff; margin: 2% 1%; margin-left: 0px; color: #fff; font-weight: bold;'>" +
      "<table style='width: 100%'>" +
      '<tr>' +
      "<td style='padding: 2px 10px; width: 50%; text-align: left; background: #fff; color: #333; border-bottom: 1px solid #eee;'><strong>Payment Details</strong>" +
      '</td>' +
      "<td style='padding: 2px 10px; font-weight: normal; text-align: right; width: 50%; color: #555; background: #fff; border-bottom: 1px solid #eee;'>Amount(NGN)" +
      '</td>' +
      '</tr>' +
      // "<tr>"+
      //    "<td style='padding: 2px 10px; width: 50%; text-align: left; background: #fff; color: #555; font-weight: normal;'>Base Fare</td>"+
      //    "<td style='padding: 2px 10px; width: 50%; text-align: right; color: #555; background: #fff; font-weight: normal;'>"+this.flightorderResponse.data.flightOffers[0].price.base+"</td>"+
      // "</tr>"+
      '<tr>' +
      "<td style='padding: 2px 10px; width: 50%; text-align: left; background: #fff; color: #555; border-top: 1px solid #ccc; font-weight: normal;'>Total</td>" +
      "<td style='padding: 2px 10px; width: 50%; text-align: right; color: #555; background: #fff; border-top: 1px solid #ccc; font-weight: normal;'>" +
      pnrData?.priceSummary?.SubTotal +
      '</td>' +
      '</tr>' +
      '</table>' +
      '</td>' +
      '</tr>' +
      '</table>' +
      '</td>' +
      '</tr>' +
      "<tr bgcolor='#fff'>" +
      '<td>' +
      "<table style='width: 100%;' class='address-details'>" +
      '<tr>' +
      "<td style='padding: 5px 0px 9px;width:25%;font-weight:normal;/* border-right:1px solid #d9d9d9; */text-align:left;background:#fff;color:#333;font-size:12px;'>Customer Contact Details : <strong>+" +
      (pnrData?.DialCode) + (pnrData?.MobileNumber) +
      '</strong> </td>' +
      "<td style='padding: 5px 0px 9px;width:55%;text-align: right;color:#555;font-weight:normal;background:#fff;font-size:12px;'>E-mail :<strong>" +
      pnrData?.EmailAddress +
      '</strong></td>' +
      '</tr>' +
      '</table>' +
      '</td>' +
      '</tr>';

    this.footer =
      "<tr bgcolor='#fff' style='height: 30px;'><td style='padding: 5px 10px;width:100%;font-size: 13px;text-align:left;display:table-cell;background: #9f9f9f;margin-top:17px;color:#fff;'>Terms and Conditions</td></tr>" +
      '<tr>' +
      "<td width='100%'>" +
      "<table width='100%' cellpadding='5'" +
      "style='padding: 0;font-size:12px;border: 1px solid #eee;'>" +
      '<tr>' +
      "<td style='padding: 10px;'>" +
      "<p style='margin:0 0 8px;'> All Guests, including children and infants, must present valid identification at check-in.</p>" +
      "<p style='margin:0 0 8px;'> Check-in begins 2 hours prior to the flight for seat assignment and closes 45 minutes prior to the scheduled departure.</p>" +
      "<p style='margin:0 0 8px;'> Carriage and other services provided by the carrier are subject to conditions of carriage, which are hereby incorporated by reference. These conditions may be obtained from the issuing carrier.</p>" +
      "<p style='margin:0 0 8px;'> In case of cancellations less than 6 hours before departure please cancel with the airlines directly. We are not responsible for any losses if the request is received less than 6 hours before departure.</p>" +
      "<p style='margin:0 0 8px;'>Please contact airlines for Terminal Queries.</p>" +
      "<p style='margin:0 0 8px;'>Due to security reasons / Government regulations, passengers travelling on flights from certain station like Jammu, Srinagar, etc. are not allowed to carry any Hand Baggage.</p>" +
      "<p style='margin:0 0 8px;'>If the basic fare is less than cancellation charges then only statutory taxes would be refunded.</p>" +
      "<p style='margin:0 0 8px;'> We are not be responsible for any Flight delay/Cancellation from airline's end.</p>" +
      "<p style='margin:0 0 8px;'>Kindly contact the airline at least 24 hrs before to reconfirm your flight detail giving reference of Airline PNR Number.</p>" +
      "<p style='margin:0 0 8px;'> We are a travel agent and all reservations made through our website are as per the terms and conditions of the concerned airlines. All modifications, cancellations and refunds of the airline tickets shall be strictly in accordance with the policy of the concerned airlines and we disclaim all liability in connection thereof.</p>" +
      "<p style='margin:0 0 8px;'> All Guests, including children and infants, must present valid identification at check-in.</p>" +
      "<p style='margin:0 0 8px;'> Check-in begins 2 hours prior to the flight for seat assignment and closes 45 minutes prior to the scheduled departure.</p>" +
      "<p style='margin:0 0 8px;'> Carriage and other services provided by the carrier are subject to conditions of carriage, which are hereby incorporated by reference. These conditions may be obtained from the issuing carrier.</p>" +
      "<p style='margin:0 0 8px;'> In case of cancellations less than 6 hours before departure please cancel with the airlines directly. We are not responsible for any losses if the request is received less than 6 hours before departure.</p>" +
      "<p style='margin:0 0 8px;'>Please contact airlines for Terminal Queries.</p>" +
      "<p style='margin:0 0 8px;'>Due to security reasons / Government regulations, passengers travelling on flights from certain station like Jammu, Srinagar, etc. are not allowed to carry any Hand Baggage.</p>" +
      "<p style='margin:0 0 8px;'>If the basic fare is less than cancellation charges then only statutory taxes would be refunded.</p>" +
      "<p style='margin:0 0 8px;'> We are not be responsible for any Flight delay/Cancellation from airline's end.</p>" +
      "<p style='margin:0 0 8px;'>Kindly contact the airline at least 24 hrs before to reconfirm your flight detail giving reference of Airline PNR Number.</p>" +
      "<p style='margin:0 0 8px;'> We are a travel agent and all reservations made through our website are as per the terms and conditions of the concerned airlines. All modifications, cancellations and refunds of the airline tickets shall be strictly in accordance with the policy of the concerned airlines and we disclaim all liability in connection thereof.</p>" +
      "<p style='margin:0 0 8px;'>Do not hesitate to contact your ticketing Agent for further clarifications, if any." +
      '</p>' +
      "<p style='margin:0'>" +
      '<strong>Thanks For choosing us as your ticket provider.Wish you a happy journey</strong>' +
      '</p>' +
      '</td>' +
      '</tr>' +
      '</table>' +
      '</td>' +
      '</tr>' +
      '<tr>' +
      "<td style='width: 100%; text-align: right; padding: 10px 0px 0; font-size: 13px; line-height: 20px;' class='logocvr'>" +
      "<h4 style='margin: 0px; font-size: 13px;'>Konga Travel & Tours</h4>" +
      "<small style='font-size: 12px;'>3B Cocoa Road, Off Akilo Road, Ogba Lagos. Nigeria</small>" +
      '</td></tr></table></td></tr></table></td></tr></tbody></table></body></html>';
  }

  sendOrderCreationMail(pnrData:  any, saveRq) {
    this.emailDetails.EmailSubject = 'Flight Booking Details';
    this.emailDetails.IsPaymentSuccess = true;
    this.emailDetails.EmailContent = this.htmlHead +
                                     this.htmlBody +
                                     this.flightdetails_header +
                                     this.segmentdetails +
                                     this.passengerdetails +
                                     this.pricedetails +
                                     this.footer;

      this.emailDetails.ToMailList = [{Name :'Abiola Bakare', MailId: 'abiola.bakare@konga.com'}, 
                                      {Name :'Yusuf Babatunde', MailId: 'yusuf.babatunde@konga.com'}, 
                                      {Name:'Joy Okorie', MailId:'joy.okorie@konga.com'}, 
                                      { Name: 'Akeem Adeyemi', MailId: 'akeem.adeyemi@konga.com' }];

      let fileName = 'TICKET ITINERARY/' + pnrData?.SupplierConfirmationNumber + ".pdf";
      let subject = 'E - TICKET ITINERARY - ' + pnrData?.SupplierConfirmationNumber;

      let reqmodel = {
        receiverID: saveRq?.flightTransactions.BookedByUser_ID,
        displayName: 'KONGA',
        to: ['abdul.azeez@travvise.com'],
        cc: [],
        from: this.emailConfiguration.From,
        body: this.emailDetails.EmailContent,
        fileName: fileName,
        subject: subject,
        emailConfig: this.emailConfiguration,
        orderID: pnrData?.SupplierConfirmationNumber,
      };
      this._flightService.SendConfirmationEmail(reqmodel).subscribe(data=> {
        if (data?.successMSG != null) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Mail Sent Successfully' });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to Send Mail',
          });
        }
      }, error=> {
        console.log(error);
        
      })














    // for (var i = 0; i < this.flightorderResponse.data.travelers.length; i++) {
    //   if (i != 0) {
    //     var toAdd = true;
    //     for (var j = 0; j < i; j++) {
    //       if (
    //         this.flightorderResponse?.data?.travelers[i]?.contact
    //           ?.emailAddress ==
    //         this.flightorderResponse?.data?.travelers[j].contact?.emailAddress
    //       ) {
    //         toAdd = false;
    //       }
    //     }
    //     if (toAdd == true) {
    //       this.emailDetails.ToMailList.push({
    //         Name:
    //           this.flightorderResponse.data.travelers[i].name.firstName +
    //           ' ' +
    //           this.flightorderResponse.data.travelers[i].name.lastName,
    //         MailId:
    //           this.flightorderResponse.data.travelers[i]?.contact?.emailAddress,
    //       });
    //     }
    //   } else {
    //     this.emailDetails.ToMailList.push({
    //       Name:
    //         this.flightorderResponse.data.travelers[i].name.firstName +
    //         ' ' +
    //         this.flightorderResponse.data.travelers[i].name.lastName,
    //       MailId:
    //         this.flightorderResponse.data.travelers[i]?.contact?.emailAddress,
    //     });
    //   }
    // }
    

    const uniqueEmails = new Set();
    // bookingData?.AirTransaction?.forEach((traveler: any) => {
    //   const email = traveler?.Emailid;
    
    //   if (email && !uniqueEmails.has(email)) {
    //     uniqueEmails.add(email);
    //     this.emailDetails.ToMailList.push({
    //       Name: `${traveler.LeadPaxName}`,
    //       MailId: email,
    //     });
    //   }
    // });
    


    // if (this.emailDetails != null && this.emailDetails != undefined) {
    //   this._flightService
    //     .SendConfirmationEmail(this.emailDetails)
    //     .pipe()
    //     .subscribe(
    //       (data: any) => {
    //         console.log('Mail Success');
    //       },
    //       (error: any) => {
    //         console.log('Mail Error');
    //       }
    //     );
    // }
  }

  getPricePassengerData() {
    // const counts = {};
    // const totals = {};
    // this.flightFareData?.travelerPricings.forEach((item) => {
    //   counts[item.travelerType] = (counts[item.travelerType] || 0) + 1;
    // });

    // for (const [type, count] of Object.entries(counts)) {
    //   const totalPrice =
    //     this.flightFareData?.travelerPricings.find(
    //       (p: any) => p.travelerType === type
    //     )?.price.grandTotal || '0';
    //   this.passengerPriceData.push({ type, count, totalPrice });
    // }
  }

  itemChanged(event: any, index: number, paxId: any = 0) {
    let value = event?.value;
    (
      (this.flightPassenger?.get('passengerDetailsArray') as FormArray)
      ['at'](+value - 1)
        .get('associatedInfantId') as FormControl<any>
    ).patchValue(paxId);
    (
      (this.flightPassenger?.get('passengerDetailsArray') as FormArray)
      ['at'](index)
        .get('associatedAdultId') as FormControl<any>
    ).patchValue(value.toString());
  }

  getPricingDetails() {
    // let associatedPassengerId: number = 1;
    // this.flightFareData?.travelerPricings?.map((fare: any) => {
    //   if (fare?.travelerType === 'HELD_INFANT') {
    //     fare['associatedAdultId'] = associatedPassengerId.toString();
    //     associatedPassengerId++;
    //   }
    // });
    // this.flightPricingReq.data.flightOffers[0] = Object.assign(
    //   this.flightPricingReq.data.flightOffers[0],
    //   this.flightFareData
    // );
    // console.log(this.flightPricingReq, 'sonme gssgsg');

    // this.isLoading = true;
    // if (this.affiliated_user != undefined) {
    //   this.flightPricingReq.userid = String(this.affiliated_user.id);
    //   this.flightPricingReq.b2BCustomer_ID =
    //     this.affiliated_user.b2BCustomer_ID == undefined
    //       ? '0'
    //       : this.affiliated_user.b2BCustomer_ID;
    //   this.flightPricingReq.userType =
    //     this.affiliated_user.userType == undefined
    //       ? ''
    //       : this.affiliated_user.userType;
    // }
    // this._flightService.flightPriceData(this.flightPricingReq).subscribe({
    //   complete: () => { }, // completeHandler
    //   error: (error: any) => {
    //     this.messageService.add({
    //       severity: 'error',
    //       summary: 'Error',
    //       detail: 'Error Fetching Flight Data. Please Try Again',
    //     });
    //     this.isLoading = false;
    //   }, // errorHandler
    //   next: (response: any) => {
    //     if (response !== null && response !== undefined) {
    //       console.log(response);
    //       // this.fare_PriceUpsell_Res = data;
    //       this.isLoading = false;
    //       // this.farePriceResult = response;
    //       this.flightFareData = response?.result?.data?.flightOffers[0];
    //       this.totalFareTotalPrice = this.flightFareData?.price?.grandTotal ?? 0;
    //       this.flightFareData['installmentAmount'] = this.sharedService.getInstallmentAmount(this.flightFareData?.price?.grandTotal ?? 0, 20);
    //       this.flightFareData['isInstallmentApplicable'] = this.sharedService.getInstallationDateDuration(this.flightFareData?.itineraries[0].segments[0]?.departure.at) ?? false;

    //     } else {
    //       this.isLoading = false;
    //     }
    //   },
    // });
  }

  selectedIndex: number = 0; // Index of the currently selected tab


  openNextTab(index: number): void {
    this.selectedIndex =
      index % this.passengerDetailsArrayControl.controls.length;
  }

  toggle(index: number) {
    this.activeState = index + 1;
  }

  sessionCompleted(session: string) {
    if (session == 'sessionCompleted') {
      this.display = true;
    } else {
      this.display = false;
    }
  }

  changesPannel(event: any) {
  }
  showCalculateDialog(position: string) {
    this.position = position;
    this.displayPositionCalc = true;
  }

  getCurrentPath() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isPassengerDetailsPage = this.router.url === '/passenger-details'
      }
    });
  }

  installmentAppliedChanged(event: any) {
    debugger;
    // this.priceReConfirmation


    let installmentArray = Object.keys(event.installementSplitAmount.installmentDetails).map((key) => event.installementSplitAmount.installmentDetails[key]);

    let date = this.datepipe.transform(new Date(this.sharedService?.getFormatDate(this.priceReConfirmation.FlightItinerary?.Trips[0].FlightSegments[0].DepartureDate),), 'yyyy-MM-dd');
    
    let FlightFareEMICalculatorDetails = [];
    
    installmentArray.forEach((amount, index)=> {
      FlightFareEMICalculatorDetails.push({
        InstallmentNo: index+ 1, InstallmentAmount: amount,CreatedUser_ID: this.currentUser?.customerUser_ID})
    });

    this.flightFareInstallementDetails = {
      FlightFareEMICalculator: {
        DateOfDeparture : date,
        TotalFare: event.totalFare,
        Currency:"NGN",
        MinimumDownPayment: event.minimumDownPayment,
        InitialDownPayment: event.initialDownPayment,
        SplitInstallmentCount: event.splitInstallmentCount,
        CreatedUser_ID: this.currentUser?.customerUser_ID
      },
      FlightFareEMICalculatorDetails: FlightFareEMICalculatorDetails
    };


    this.totalFareTotalPrice = event.initialDownPayment ?? 0;
    this.displayPositionCalc = false;



  }

  flightSavePNR(createPnrRes: any = {}) {
    this.airArabiaRequestObj.flightTransactionDetails = [];
    this.airArabiaRequestObj.flightTransactionSegmentDetails = [];

    let ticketCount: number = 0;
    createPnrRes.Passengers?.forEach((passenger: any, index: number) => {
      if (passenger?.PaxTypeID === 1 || passenger?.PaxTypeID === 2) {
        ticketCount++;
      }

      const priceTotalAmount = createPnrRes?.priceSummary?.PriceTotal +  this.totalMarkUpValue;

      const totalPrice =
        passenger?.PaxTypeID === 1?
        createPnrRes?.priceSummary?.AdultBaseFare+ createPnrRes?.priceSummary.AdultTaxes:
        passenger?.PaxTypeID === 2?
        createPnrRes?.priceSummary?.ChildBaseFare+ createPnrRes?.priceSummary.ChildTaxes:
        createPnrRes?.priceSummary?.InfantBaseFare+ createPnrRes?.priceSummary.InfantTaxes;

      const basePrice =
        passenger?.PaxTypeID === 1?
        createPnrRes?.priceSummary?.AdultBaseFare:
        passenger?.PaxTypeID === 2?
        createPnrRes?.priceSummary?.ChildBaseFare:
        createPnrRes?.priceSummary?.InfantBaseFare;
      

      const taxTotal =
        passenger?.PaxTypeID === 1?
        createPnrRes?.priceSummary?.AdultTaxes:
        passenger?.PaxTypeID === 2?
        createPnrRes?.priceSummary?.ChildTaxes:
        createPnrRes?.priceSummary?.InfantTaxes;

      let passengerData: any = {
        FlightTransactionDetails_ID: '0',
        FlightTransaction_ID: '0',
        FlightTransactionCode: '',
        Prefix: passenger?.PaxTitle,
        FirstName: passenger?.FirstName,
        LastName: passenger?.LastName,
        TravellerType:
          passenger?.PaxTypeID === 1? 'ADT'
          : passenger?.PaxTypeID === 2? 'CHD'
          : 'INF',
        DOB: new Date(moment(passenger.DOB).format('YYYY-MM-DD')).toISOString(),
        Age: 0,
        Gender: passenger?.Gender === 'Male' ? 'M' : 'F',
        PhoneNumber:
          '+' + createPnrRes?.DialCode + ' ' + createPnrRes?.MobileNumber,
        Email: createPnrRes?.EmailAddress,
        FreqFlyerNo: passenger?.Fqtv,
        TicketNo: passenger?.TicketNumber,
        TicketStatus: 'I',
        // TotalPrice:      ((createPnrRes?.priceSummary?.PriceTotal) + this.totalMarkUpValue + createPnrRes?.priceSummary?.Markup) ?? 0,
        TotalPrice:
          totalPrice +
          (passenger?.PaxTypeID === 1 ? createPnrRes.priceSummary?.AdultMarkup : passenger?.PaxTypeID === 2 ? createPnrRes.priceSummary?.ChildMarkup : createPnrRes.priceSummary?.InfantMarkup) -
          (passenger?.PaxTypeID === 1 ? createPnrRes.priceSummary?.AdultDiscount : passenger?.PaxTypeID === 2 ? createPnrRes.priceSummary?.ChildDiscount : createPnrRes.priceSummary?.InfantDiscount),
        // BasePrice:  createPnrRes?.priceSummary?.AdultBaseFare +  createPnrRes?.priceSummary?.ChildBaseFare + createPnrRes?.priceSummary?.InfantBaseFare,
        BasePrice: basePrice,
        Tax: taxTotal,
        // Tax:  createPnrRes?.priceSummary?.AdultBaseFare +  createPnrRes?.priceSummary?.ChildBaseFare + createPnrRes?.priceSummary?.InfantBaseFare,
        DefaultMarkup: (passenger?.PaxTypeID === 1 ? createPnrRes.priceSummary?.AdultMarkup : passenger?.PaxTypeID === 2 ? createPnrRes.priceSummary?.ChildMarkup : createPnrRes.priceSummary?.InfantMarkup),
        DiscountAmount: (passenger?.PaxTypeID === 1 ? createPnrRes.priceSummary?.AdultDiscount : passenger?.PaxTypeID === 2 ? createPnrRes.priceSummary?.ChildDiscount : createPnrRes.priceSummary?.InfantDiscount),
        AdditionalMarkup:  0,
        Gross: totalPrice,
        DiscountType: '',
        DiscountPercentage: 0,
        //TravelerKey: ((passenger?.PaxTypeID === 1 ? 'ADT' : passenger?.PaxTypeID === 2 ? 'CHD' : 'INF') + index).toString(),
        TravelerKey: (passenger?.PassangerId !== null && passenger?.PassangerId !== "" && passenger?.PassangerId !== "null") ? passenger?.PassangerId?.toString() : ((passenger?.PaxTypeID === 1 ? 'ADT' : passenger?.PaxTypeID === 2 ? 'CHD' : 'INF') + index).toString(),
        Type: 'TICKET',
        ServiceReference: passenger?.ServiceReference,
        TaxInfo: '',
        DealRevenue: 0,
        DocumentType: '',
        DocumentNumber: passenger?.PassportInfo?.Number ?? '',
        NationalityCountry_ID: passenger?.Nationality,
        DocumentExpiry:
          passenger?.PassportInfo?.ExipryDate ?? new Date().toISOString(),
        IssuedCountry_ID: passenger?.PassportInfo?.IssueCountryCode ?? '',
        CreatedDate: new Date().toISOString(),
        CreatedUser_ID: this.currentUser?.customerUser_ID,
      };

      this.airArabiaRequestObj.flightTransactionDetails.push(passengerData);
    })

    createPnrRes?.Trips?.forEach((trips: any) => {
      trips?.FlightSegments?.forEach((segments: any) => {
        let date: any = this.sharedService?.getFormatDate(
          segments?.DepartureDate
        );
        let date2: any = this.sharedService?.getFormatDate(
          segments?.ArrivalDate
        );
        const deptDate = this.datepipe.transform(new Date(date), 'yyyy-MM-dd');
        const arrDate = this.datepipe.transform(new Date(date2), 'yyyy-MM-dd');
        let tripsDetails = {
          FlightTransactionSegmentDetails_ID: 0,
          FlightTransactions_ID: '0',
          FlightTransactionCode: '',
          Carrier: segments?.MarketingAirline ?? '',
          CabinClass: segments?.CabinClass,
          FlightNumber: segments?.FlightNumber,
          ProviderCode: segments?.MarketingAirline,
          Origin: segments?.Origin,
          SegmentReference: segments?.FlightRefKey,
          Destination: segments?.Destination,
          DepartureTime:
            deptDate +
            'T' +
            this.sharedService?.getFormatedTime(
              segments?.DepartureTime
            ) +
            ':00',
          ArrivalTime:
            arrDate +
            'T' +
            this.sharedService?.getFormatedTime(
              segments?.ArrivalTime
            ) +
            ':00',
          TravelTime: segments?.Duration ?? 0,
          ClassOfService: 'N',
          Equipment: segments?.Equipment ?? '',
          SegmentStatus: segments?.Status ?? '',
          OriginTerminal: segments?.TerminalInfo?.FromTerminal ?? '',
          DestinationTerminal: segments?.TerminalInfo?.ToTerminal ?? '',
          AdultBaggage: segments?.BaggageInfo?.find((item: any)=> item?.paxType== 1)?.QuantityAllowed|| '',
          ChildBaggage: segments?.BaggageInfo?.find((item: any)=> item?.paxType== 2)?.QuantityAllowed|| '',
          InfantBaggage: segments?.BaggageInfo?.find((item: any)=> item?.paxType== 3)?.QuantityAllowed|| '',
          AirlinePNR: segments?.AirlinePNR
        };
        this.airArabiaRequestObj.flightTransactionSegmentDetails.push(
          tripsDetails
        );
      });
    });


    const baseFareTotal =
      (createPnrRes?.priceSummary?.AdultBaseFare || 0) *
      (createPnrRes?.priceSummary?.Adults || 0) +
      (createPnrRes?.priceSummary?.ChildBaseFare || 0) *
      (createPnrRes?.priceSummary?.Children || 0) +
      (createPnrRes?.priceSummary?.InfantBaseFare || 0) *
      (createPnrRes?.priceSummary?.Infants || 0)


    const customerMarkupTotal =
      (createPnrRes?.priceSummary?.AdultMarkup || 0) *
      (createPnrRes?.priceSummary?.Adults || 0) +
      (createPnrRes?.priceSummary?.ChildMarkup || 0) *
      (createPnrRes?.priceSummary?.Children || 0) +
      (createPnrRes?.priceSummary?.InfantMarkup || 0) *
      (createPnrRes?.priceSummary?.Infants || 0)

      const discountTotal =
      (createPnrRes?.priceSummary?.AdultDiscount || 0) *
      (createPnrRes?.priceSummary?.Adults || 0) +
      (createPnrRes?.priceSummary?.ChildDiscount || 0) *
      (createPnrRes?.priceSummary?.Children || 0) +
      (createPnrRes?.priceSummary?.InfantDiscount || 0) *
      (createPnrRes?.priceSummary?.Infants || 0)

      this.airArabiaRequestObj.flightTransactions.BookingRefID =
      createPnrRes?.AirlinePNR;
    this.airArabiaRequestObj.flightTransactions.FlightTransactions_ID = 0;
    this.airArabiaRequestObj.flightTransactions.UserTrackID =
      createPnrRes?.flightSearchRequest?.SearchKey;
    this.airArabiaRequestObj.flightTransactions.Company_ID = 0;
    this.airArabiaRequestObj.flightTransactions.CompBranch_ID = 0;

    this.airArabiaRequestObj.flightTransactions.Supplier_ID =
      createPnrRes?.Trips[0]?.SupplierId;
    this.airArabiaRequestObj.flightTransactions.TravelType =
      createPnrRes?.Trips?.length === 1
        ? 'OW'
        : createPnrRes?.Trips?.length === 2
          ? 'RT'
          : 'MC';
    //this.airArabiaRequestObj.flightTransactions.CabinClass = createPnrRes?.flightSearchRequest?.FirstSegment?.CabinClass;
    this.airArabiaRequestObj.flightTransactions.BaseOrigin =
      createPnrRes?.flightSearchRequest?.FirstSegment?.Origin;
    this.airArabiaRequestObj.flightTransactions.BaseDestination =
      createPnrRes?.flightSearchRequest?.LastSegment?.Destination;
    this.airArabiaRequestObj.flightTransactions.Adult =
      createPnrRes?.priceSummary?.Adults;
    this.airArabiaRequestObj.flightTransactions.Child =
      createPnrRes?.priceSummary?.Children;
    this.airArabiaRequestObj.flightTransactions.Infant =
      createPnrRes?.priceSummary?.Infants;
    this.airArabiaRequestObj.flightTransactions.SeatFare = 0;
    this.airArabiaRequestObj.flightTransactions.MealsFare =
      this.totalMealsValue ?? 0;
    this.airArabiaRequestObj.flightTransactions.BaggageFare = 0;
    this.airArabiaRequestObj.flightTransactions.OthersFare = 0
    this.airArabiaRequestObj.flightTransactions.DepartDate = new Date(
      createPnrRes?.flightSearchRequest?.FirstSegment?.DepartureDate
    ).toISOString();
    this.airArabiaRequestObj.flightTransactions.ReturnDate = new Date(
      createPnrRes?.flightSearchRequest?.LastSegment?.DepartureDate
    ).toISOString();
    this.airArabiaRequestObj.flightTransactions.CustomerProfile_ID = this.currentUser.customerProfile_ID
    this.airArabiaRequestObj.flightTransactions.AirlineCode =
      createPnrRes?.Trips[0]?.ValidatingAirline;
    this.airArabiaRequestObj.flightTransactions.CRSPNR =
      createPnrRes?.AirlinePNR;
    this.airArabiaRequestObj.flightTransactions.AirlinePNR =
      createPnrRes?.AirlinePNR;
    this.airArabiaRequestObj.flightTransactions.URPNR = createPnrRes?.AirlinePNR;
    (this.airArabiaRequestObj.flightTransactions.BaseFare = baseFareTotal),
      // this.airArabiaRequestObj.flightTransactions.Taxes = createPnrRes?.priceSummary?.AdultTaxes + createPnrRes?.priceSummary?.ChildTaxes + createPnrRes?.priceSummary?.InfantTaxes;
      (this.airArabiaRequestObj.flightTransactions.Taxes =
        (createPnrRes?.priceSummary?.AdultTaxes || 0) *
        (createPnrRes?.priceSummary?.Adults || 0) +
        (createPnrRes?.priceSummary?.ChildTaxes || 0) *
        (createPnrRes?.priceSummary?.Children || 0) +
        (createPnrRes?.priceSummary?.InfantTaxes || 0) *
        (createPnrRes?.priceSummary?.Infants || 0));

    (this.airArabiaRequestObj.flightTransactions.Gross =
      (createPnrRes?.priceSummary?.PriceTotal - (customerMarkupTotal ?? 0))),
      // (this.airArabiaRequestObj.flightTransactions.DefaultMarkup =
      //   createPnrRes?.priceSummary?.Markup),
    this.airArabiaRequestObj.flightTransactions.AdditionalMarkup = this.totalMarkUpValue;
    this.airArabiaRequestObj.flightTransactions.CancelPenalty = 0;
    this.airArabiaRequestObj.flightTransactions.ChangePenalty = 0;
    this.airArabiaRequestObj.flightTransactions.DefaultMarkup = customerMarkupTotal;

    this.airArabiaRequestObj.flightTransactions.TotalFare = Math.ceil(createPnrRes?.priceSummary?.PriceTotal);
        
    this.airArabiaRequestObj.flightTransactions.Status = 1;
    this.airArabiaRequestObj.flightTransactions.Remarks = '';
    this.airArabiaRequestObj.flightTransactions.BookedByUser_ID =
      this.currentUser?.customerUser_ID;
    this.airArabiaRequestObj.flightTransactions.TransactionDate =
      new Date().toISOString();
    this.airArabiaRequestObj.flightTransactions.InvoiceNumber = '';
    this.airArabiaRequestObj.flightTransactions.ProductID = 0;
    this.airArabiaRequestObj.flightTransactions.PAYMENTSTATUS = 0;
    this.airArabiaRequestObj.flightTransactions.CorporateCode =
      createPnrRes?.CorporateCode;
    this.airArabiaRequestObj.flightTransactions.PNRDateTime =
      new Date().toISOString();
    this.airArabiaRequestObj.flightTransactions.MarkupRemarks = '';
    this.airArabiaRequestObj.flightTransactions.LatestTicketingTime =
      new Date().toISOString();
    this.airArabiaRequestObj.flightTransactions.LeadPaxFirstName =
      createPnrRes?.Passengers.filter((passenger:any)=>passenger?.PaxTypeID === 1)[0]?.FirstName;
    this.airArabiaRequestObj.flightTransactions.LeadPaxLastName =
      createPnrRes?.Passengers.filter((passenger:any)=>passenger?.PaxTypeID === 1)[0]?.LastName;
    this.airArabiaRequestObj.flightTransactions.VATKSA = 0;
    this.airArabiaRequestObj.flightTransactions.AnyBookingStatusDesc = '';
    this.airArabiaRequestObj.flightTransactions.TourCode = '';
    this.airArabiaRequestObj.flightTransactions.VAT = 0;
    (this.airArabiaRequestObj.flightTransactions.MobileNo =
      '+' + createPnrRes?.DialCode + ' ' + createPnrRes?.MobileNumber),
      (this.airArabiaRequestObj.flightTransactions.Emailid =
        createPnrRes.EmailAddress);
    this.airArabiaRequestObj.flightTransactions.BACKOFFICESTATUS = 0;
    this.airArabiaRequestObj.flightTransactions.BACKOFFICEREMARKS = '';
    this.airArabiaRequestObj.flightTransactions.CouponCode = '';
    this.airArabiaRequestObj.flightTransactions.BookedOffice = '';
    this.airArabiaRequestObj.flightTransactions.IssuedOffice = '';
    this.airArabiaRequestObj.flightTransactions.Landline = '';
    this.airArabiaRequestObj.flightTransactions.RefundAmount = 0;
    this.airArabiaRequestObj.flightTransactions.CancelRemarks = '';
    this.airArabiaRequestObj.flightTransactions.ChangeRefundAmount = 0;
    this.airArabiaRequestObj.flightTransactions.ChangeRemarks = '';
    this.airArabiaRequestObj.flightTransactions.FMFare = '';
    this.airArabiaRequestObj.flightTransactions.ImportPNR = 0;
    this.airArabiaRequestObj.flightTransactions.TicketCount = ticketCount;
    this.airArabiaRequestObj.flightTransactions.IssueDate =
      new Date().toISOString();
    this.airArabiaRequestObj.flightTransactions.IssuedByUser_ID =  this.currentUser?.customerUser_ID;
    this.airArabiaRequestObj.flightTransactions.DealRevenue = 0;
    this.airArabiaRequestObj.flightTransactions.RevenueLoss = 0;
    this.airArabiaRequestObj.flightTransactions.RepriceDifference = 0;
    this.airArabiaRequestObj.flightTransactions.CCAmt = 0;
    this.airArabiaRequestObj.flightTransactions.DCAmt = 0;
    this.airArabiaRequestObj.flightTransactions.CHQAmt = 0;
    this.airArabiaRequestObj.flightTransactions.PendingAmt = 0;
    this.airArabiaRequestObj.flightTransactions.IssuedPCC = '';
    this.airArabiaRequestObj.flightTransactions.SplitPayStatus = 0;
    this.airArabiaRequestObj.flightTransactions.BookedOfficeCred = '';
    this.airArabiaRequestObj.flightTransactions.HOMDPromoCode = '';
    this.airArabiaRequestObj.flightTransactions.EarningPoints = 0;
    this.airArabiaRequestObj.flightTransactions.FOP = 'CASH';
    this.airArabiaRequestObj.flightTransactions.BackOfficeINVNo = '';
    this.airArabiaRequestObj.flightTransactions.BookingPlatform = 'FOS';
    this.airArabiaRequestObj.flightTransactions.BACKOFFICEREFUNDSTATUS = 0;
    this.airArabiaRequestObj.flightTransactions.BACKOFFICEREFUNDREMARKS = '';
    this.airArabiaRequestObj.flightTransactions.BACKOFFICEREFUNDINVNO = '';
    this.airArabiaRequestObj.flightTransactions.BackOfficePaymentInfo = '';
    this.airArabiaRequestObj.flightTransactions.BACKOFFICEREISSUESTATUS = 0;
    this.airArabiaRequestObj.flightTransactions.BACKOFFICEREISSUEREMARKS = '';
    this.airArabiaRequestObj.flightTransactions.BACKOFFICEREISSUEINVNO = '';
    this.airArabiaRequestObj.flightTransactions.LPONumber = '';
    // this.airArabiaRequestObj.flightTransactions.BookingType = 0;
    this.airArabiaRequestObj.flightTransactions.CardNumber = '';
    this.airArabiaRequestObj.flightTransactions.CreditCardVendorCode = '';
    this.airArabiaRequestObj.flightTransactions.CardExpiryDate = '';
    this.airArabiaRequestObj.flightTransactions.SeriesCode = '';
    this.airArabiaRequestObj.flightTransactions.FOP_AMOUNT =
      createPnrRes?.priceSummary?.PriceTotal +
      this.totalMarkUpValue;
    this.airArabiaRequestObj.flightTransactions.TicketedDate =
      new Date().toISOString();
    this.airArabiaRequestObj.flightTransactions.CurCode =
      createPnrRes?.priceSummary?.SupplierCurrency;
    this.airArabiaRequestObj.flightTransactions.CustomerSellCurrency =
      createPnrRes?.priceSummary?.SelectedCurrency;
    this.airArabiaRequestObj.flightTransactions.CustomerSellRateTotal = Math.ceil(createPnrRes?.priceSummary?.PriceTotal);
    this.airArabiaRequestObj.flightTransactions.ExchangeRateApplied = 1;
    this.airArabiaRequestObj.flightTransactions.DiscountAmount =discountTotal;
    this.airArabiaRequestObj.flightTransactions.DiscountApproverUser_ID = 0;
    this.airArabiaRequestObj.flightTransactions.DiscountApprovalStatus = 1;
    this.airArabiaRequestObj.flightTransactions.TicketingApprovalStatus = 1;
    this.airArabiaRequestObj.flightTransactions.TicketingApproverUser_ID = 1;
    //this.airArabiaRequestObj.flightTransactions.SelectedPccCode = createPnrRes?.Trips[0]?.SupplierCode;
    this.airArabiaRequestObj.flightTransactions.SelectedPccCode = createPnrRes?.Trips[0]?.SupplierCode;
    this.airArabiaRequestObj.flightTransactions.Segments = '';
    this.airArabiaRequestObj.flightTransactions.Pax = '';
    this.airArabiaRequestObj.flightTransactions.ResponseData = '';
    this.airArabiaRequestObj.flightTransactions.CustomerProfileCode = '';
    this.airArabiaRequestObj.flightTransactions.FlightTransactionCode =
      createPnrRes?.priceSummary?.PNRNumber;
    this.airArabiaRequestObj.flightTransactions.FareType = '';
    this.airArabiaRequestObj.flightTransactions.CabinClass =
      createPnrRes?.Trips[0]?.FlightSegments[0]?.CabinClass;
    this.airArabiaRequestObj.flightTransactions.lpoNumber =  '';
    this.airArabiaRequestObj.flightTransactions.lpoFilePath =  '';
    this.airArabiaRequestObj.flightTransactions.mailDate = null
    this.airArabiaRequestObj.flightTransactions.emailFilePath = '';
    this.airArabiaRequestObj.Mode = 1;
    this.airArabiaRequestObj.flightBookingRemarks = null;
    
    if(this.flightFareInstallementDetails != null && Object.keys(this.flightFareInstallementDetails).length> 0) {
      this.airArabiaRequestObj.FlightFareEMICalculatorDetails =  JSON.stringify(this.flightFareInstallementDetails);
    }
        
    this._flightService.savePnrData(this.airArabiaRequestObj)
      .subscribe({
        complete: () => { },
        error: (error: any) => { },
        next: (data: any) => {
          this.isLoading = false;
          if (data?.length && data[0]?.Status === 'SUCCESS') {
            this.LoadFlightBookingSuccessTemplate(createPnrRes);
            this.sendOrderCreationMail(createPnrRes, this.airArabiaRequestObj);
            this.router.navigate(['/flight-itinerary', data[0]?.FlightTransactions_ID]);
            
          }
          else {
            this.isLoading = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Something went wrong!. Please Try Again',
            });
          }
        },

      });



  }


  createPnr(createPnrRequest: any) {
    this.loadingText = 'Confirming your booking request ....'
    this._flightService.createFlightPNR(createPnrRequest).subscribe({
      complete: () => { }, // completeHandler
      error: (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error to order flight. Please Try Again',
        });
        this.isLoading = false;
      }, // errorHandler
      next: (response: any) => {
        if (response?.AirlinePNR !== null && response?.AirlinePNR !== undefined) {

          this.flightSavePNR(response);
        } else {
          if (response?.Error !== null) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response?.Error?.Message ?? 'Error occurred while booking. Please try again',
            });
          }
          this.isLoading = false;
        }
      },
    });

  }
  

  

}
