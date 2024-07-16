import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FlightOrder, GetOffersRequestModel } from 'src/app/Models/flight/Amadeus/flight-order.model';
import { FlightPricingReq, flightPricing } from 'src/app/Models/flight/Amadeus/flight-pricing.model';
import { RegExpValidators } from 'src/app/shared/validators';
import { PassengerInfantNamePrefix, PassengerNamePrefix } from './passenger-details.util';
import { EmailDetailsModel } from 'src/app/Models/Mail/EmailDetailsModel';
import { NavigationEnd, Router } from '@angular/router';
import { FilterService, MessageService } from 'primeng/api';
import { AmadeusService } from 'src/app/services/amadeus.service';
import { FlightService } from 'src/app/services/flight.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-amadeus-passenger-details',
  templateUrl: './amadeus-passenger-details.component.html',
  styleUrls: ['./amadeus-passenger-details.component.scss'],
  providers: [SharedService, FilterService, MessageService],

})
export class AmadeusPassengerDetailsComponent {

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
  totalFareTotalPrice: number =0;
  flightFareInstallementDetails: any = null;

  constructor(
    private router: Router,
    public sharedService: SharedService,
    private _amadeusservice: AmadeusService,
    private _flightService: FlightService,
    private form: FormBuilder,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService,
    private datepipe: DatePipe
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
    this.flightResultData = this.sharedService?.getLocalStore('flightData');
    this.flightFareData = this.sharedService?.getLocalStore('airPricePointSelected'
    );

    this.totalFareTotalPrice =  this.flightFareData?.price?.grandTotal ?? 0
    this.getCountryData();
    this.LoadPassengerDetails();
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
    if (this.flightFareData === undefined || this.flightFareData === null) {
      this.router.navigateByUrl('/');
    } else {
      // this.findPassengerData(this.flightFareData?.flightDetails?.recomentationList?.paxFareProduct);
      this.createPassengerDetailsArray(this.flightFareData?.travelerPricings);
    }
    // this.totalAmount =  this.flightFareData?.selectedFare?.totalAmount ??  (this.flightFareData?.flightDetails?.recomentationList?.recPriceInfo?.totalPrice_modified  ?? 0)

    this.getPricingDetails();
    this.getPricePassengerData();

  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
  createPassengerDetailsArray(passengers: any) {
    passengers.forEach((passenger: any) => {
      this.addItem(passenger?.travelerType, passenger.travelerId);
    });
  }

  getCountryData() {
    this.sharedService.getAllCountry().subscribe((res) => {
      this.countryOptionList = res;
    });
  }

  LoadPassengerDetails() {
    const datepipe: DatePipe = new DatePipe('en-US');
    var journeryDepartureDate = new Date(
      this.flightFareData?.itineraries[0]?.segments[0].departure?.at
    );
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

  createItem(type: string = 'ADULT', ptcCount: number = null) {
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
      associatedInfantId:
        type === 'INF' ? [null, [Validators.required]] : [null],
      associatedAdultId: [1],
      type: [type],
      idType: ['P'],
      age: [0],
      gender: [''],
    });
  }

  addItem(type: string, index: number = null) {
    this.passengerDetailsArray = this.flightPassenger.get(
      'passengerDetailsArray'
    ) as FormArray;
    this.passengerDetailsArray.push(this.createItem(type, index));
  }

  getTravellerData(passenger: any, associatedAdultId: number = 0) {

    const datepipe: DatePipe = new DatePipe('en-US');
    let passengerDetailsObj = {
      id: passenger?.paxId,
      dateOfBirth: datepipe.transform(passenger.dOB, 'yyyy-MM-dd'),
      name: {
        firstName:
          (passenger.firstName ?? '') +
          ' ' +
          (passenger.middleName ?? '') +
          '  ' +
          passenger?.prefix?.value,
        middleName: passenger.middleName ?? '',
        lastName: passenger.lastName ?? '',
      },
      // gender: (passenger?.prefix?.value == 'Ms' || passenger?.prefix?.value == 'Mrs' || passenger?.prefix?.value == 'Miss' || passenger?.prefix?.value == 'SHKA') ? 'FEMALE'
      //   : (passenger?.prefix?.value == 'Mr' ||
      //     passenger?.prefix?.value == 'Mstr' ||
      //     passenger?.prefix?.value == 'SHK')
      //     ? 'MALE'
      //     : 'MALE',
      gender: 'UNSPECIFIED',
      contact: {
        emailAddress: this.flightPassenger?.value?.emailID,
        phones: [
          {
            deviceType: 'MOBILE',
            countryCallingCode:
              (this.flightPassenger?.value?.phoneNumber?.dialCode).replace(
                '+',
                ''
              ),
            number:
              this.flightPassenger?.value?.phoneNumber?.e164Number?.replace(
                this.flightPassenger?.value?.phoneNumber?.dialCode,
                ''
              ),
          },
        ],
      },
      documents:
        passenger?.nationality !== '' &&
        passenger?.nationality !== null &&
        passenger.passportNumber !== '' &&
        passenger.passportNumber !== null &&
        passenger.dateOfExpiry !== '' &&
        passenger.dateOfExpiry !== null &&
        passenger?.countryOfIssue !== '' &&
        passenger?.countryOfIssue !== null
          ? [
              {
                documentType: 'PASSPORT',
                issuanceDate:
                  datepipe.transform(new Date(), 'yyyy-MM-dd') ?? '',
                number: passenger?.passportNumber ?? '',
                expiryDate:
                  datepipe.transform(passenger?.dateOfExpiry, 'yyyy-MM-dd') ??
                  '',
                issuanceCountry: passenger?.countryOfIssue?.isoCode ?? '',
                nationality: passenger?.nationality?.isoCode ?? '',
                holder: true,
              },
            ]
          : null,
    };

    if (passenger?.ptc == 'HELD_INFANT') {
      passengerDetailsObj['associatedAdultId'] = associatedAdultId.toString();
    }
    return passengerDetailsObj;
  }

  passengerSubmitBtn() {
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
      // this.passengerDetailsArrayControl!.controls?.forEach((element: any, index: number) => {
      //   if (this.passengerDetailsArray['at'](index)?.status === 'INVALID') {
      //     this.activeTabIndex = index;
      //     throw new Error("Break the loop.");
      //   }
      // });

      this.isLoading = true;
      this.getOffersRequestModel.data.travelers = [];
      this.getOffersRequestModel.data.flightOffers = [];
      this.getOffersRequestModel.data.contacts[0].phones = [];
      let associatedadultId = 0;
      this.getOffersRequestModel.data.formOfPayments[0].other.flightOfferIds =
        [];
      this.passengerDetailsArray?.value.forEach((passenger: any) => {
        if (passenger.ptc === 'HELD_INFANT') {
          associatedadultId++;
        }

        this.getOffersRequestModel.data.travelers.push(
          this.getTravellerData(passenger, associatedadultId)
        );
      });
      this.getOffersRequestModel.data.formOfPayments[0].other.flightOfferIds.push(
        this.flightFareData.id
      );
      this.getOffersRequestModel.data.contacts[0].emailAddress =
        this.flightPassenger?.value?.emailID;
      this.getOffersRequestModel.data.contacts[0].phones.push({
        deviceType: 'MOBILE',
        countryCallingCode:
          (this.flightPassenger?.value?.phoneNumber?.dialCode).replace('+', ''),
        number: this.flightPassenger?.value?.phoneNumber?.e164Number.replace(
          this.flightPassenger?.value?.phoneNumber?.dialCode,
          ''
        ),
      });
      this.getOffersRequestModel.data.flightOffers.push(this.flightFareData);
      this.getOffersRequestModel.data.remarks = null;
      let pricingAssociatedadultId = 0;
      this.getOffersRequestModel.data.flightOffers[0].travelerPricings.map(
        (travellers: any) => {
          if (travellers?.travelerType === 'HELD_INFANT') {
            pricingAssociatedadultId++;
            travellers['associatedAdultId'] =
              pricingAssociatedadultId.toString();
          }
        }
      );

      this.isLoading = true;
      let universalLocatorCode: string = '';
      if (this.affiliated_user != undefined) {
        this.getOffersRequestModel.id = String(this.affiliated_user.id);
        this.getOffersRequestModel.b2BCustomer_ID =
          this.affiliated_user.b2BCustomer_ID == undefined
            ? '0'
            : this.affiliated_user.b2BCustomer_ID;
        this.getOffersRequestModel.userType =
          this.affiliated_user.userType == undefined
            ? ''
            : this.affiliated_user.userType;
      }
      this.getOffersRequestModel.flightFareInstallementDetails = this.flightFareInstallementDetails;
      this._flightService.FlightOrders(this.getOffersRequestModel).subscribe({
        complete: () => {}, // completeHandler
        error: (error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error to order flight. Please Try Again',
          });
          this.isLoading = false;
        }, // errorHandler
        next: (response: any) => {
          if (
            response !== null &&
            response !== undefined &&
            response?.result?.data
          ) {
            this.flightorderResponse = response.result;

            // this.fare_PriceUpsell_Res = data;
            this.isLoading = false;
            this.sharedService.setLocalStore(
              'bookingOrderData',
              response.result
            );
            let pnr = response?.result?.data?.associatedRecords[0]?.reference;
            this.LoadFlightBookingSuccessTemplate();
            this.sendOrderCreationMail();
            this.router.navigate(['/1A-flight-itinerary', pnr]);
            // this.farePriceResult = response;
            // this.flightFareData = response?.result?.data?.flightOffers[0]
            // if(response?.results && response?.results?.data ){
            //   universalLocatorCode = response?.results?.data?.associatedRecords[0]?.reference;

            // }
          } else {
            this.isLoading = false;
          }
        },
      });
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

  LoadFlightBookingSuccessTemplate() {
    var bookingdate = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm');
    var crspnr = this.flightorderResponse.data.associatedRecords[0].reference;

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
    this.flightorderResponse.data.flightOffers[0].itineraries?.forEach(
      (itinerary_i) => {
        itinerary_i.segments?.forEach((segment_i) => {
          this.segmentdetails =
            this.segmentdetails +
            "<tr><td style='line-height: 5px;'>&nbsp;</td>" +
            '</tr>' +
            "<tr bgcolor='#9f9f9f' style='vertical-align:middle;border: 1px solid #9f9f9f;' class='grey'>" +
            "<td style='padding:7px 10px;vertical-align:middle;font-size:12px;text-align:left;margin-top:0px;color:#fff;'>" +
            "<img src='https://travel.konga.com/assets/img/common/FlightDeparture.png' width='20px' style='margin-right: 5px;'/> Flight Details (" +
            segment_i.departure.cityName +
            ',' +
            segment_i.departure.airPortName +
            '(' +
            segment_i.departure.iataCode +
            ') to ' +
            segment_i.arrival.cityName +
            ',' +
            segment_i.arrival.airPortName +
            '(' +
            segment_i.arrival.iataCode +
            '))' +
            "<p style='display: block;'>*Please verify flight times with the airlines prior to departure</p></td>" +
            '</tr>';

          var dep_date = this.datepipe.transform(
            segment_i.departure.at,
            'dd/MM/yyyy HH:mm'
          );
          var arrival_date = this.datepipe.transform(
            segment_i.arrival.at,
            'dd/MM/yyyy HH:mm'
          );
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
            segment_i.carrierCode +
            ".gif' alt='img'></div>" +
            "<div style='font-weight: bold; color: #666;'>" +
            segment_i.carrierCode +
            ' ' +
            segment_i.number +
            '</div>' +
            "<div style='font-weight: bold; color: #666;'>" +
            segment_i.aircraft.code +
            '</div>' +
            "<div style='font-weight: normal; color: #777;'>Cabin: " +
            this.flightorderResponse.data.flightOffers[0].travelerPricings[0]
              .fareDetailsBySegment[0].cabin +
            '</div>' +
            '</td>' +
            "<td style='padding: 5px; background: #fff;'>" +
            "<div style='font-weight: bold;'>" +
            segment_i.departure.airPortName +
            '</div>' +
            "<div style='font-weight: bold; color: #666;'>" +
            dep_date +
            '</div>' +
            '</td>' +
            "<td style='padding: 5px; background: #fff;'>" +
            "<div style='font-weight: bold;'>" +
            segment_i.arrival.airPortName +
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
      }
    );
    //passenger details
    var baggage =
      this.flightorderResponse.data.flightOffers[0].travelerPricings[0]
        .fareDetailsBySegment[0].includedCheckedBags?.quantity != undefined
        ? this.flightorderResponse.data.flightOffers[0].travelerPricings[0]
            .fareDetailsBySegment[0].includedCheckedBags.quantity + ' PC'
        : this.flightorderResponse.data.flightOffers[0].travelerPricings[0]
            .fareDetailsBySegment[0].includedCheckedBags.weight + ' KG';

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

    this.flightorderResponse.data.travelers?.forEach((traveler_i) => {
      this.flightorderResponse.data.flightOffers[0].travelerPricings?.forEach(
        (travelerprice_i) => {
          if (traveler_i.id == travelerprice_i.travelerId) {
            var trav_type =
              travelerprice_i.travelerType == 'HELD_INFANT'
                ? 'INFANT'
                : travelerprice_i.travelerType;
            this.passengerdetails +=
              "<tr style='font-size: 13px;'>" +
              "<td style='padding: 2px 5px; background: #fff;'>" +
              traveler_i.id +
              '</td>' +
              "<td style='padding: 2px 5px; background: #fff;'><strong>" +
              traveler_i.name.firstName.toUpperCase() +
              ' ' +
              traveler_i.name.lastName.toUpperCase() +
              '</strong></td>' +
              "<td style='padding: 2px 5px; background: #fff;'>" +
              trav_type +
              '</td>' +
              "<td style='padding: 2px 5px; background: #fff;'>" +
              baggage +
              '</td>' +
              "<td style='padding: 2px 5px; background: #fff; text-align:center;'>Pending</td>" +
              '</tr>';
          }
        }
      );
    });
    this.passengerdetails += '</table>' + '</td>' + '<td></td>' + '</tr>';
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
      this.flightorderResponse.data.flightOffers[0].price.grandTotal +
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
      this.flightorderResponse.data.travelers[0].contact.phones[0]
        .countryCallingCode +
      this.flightorderResponse.data.travelers[0].contact.phones[0].number +
      '</strong> </td>' +
      "<td style='padding: 5px 0px 9px;width:55%;text-align: right;color:#555;font-weight:normal;background:#fff;font-size:12px;'>E-mail :<strong>" +
      this.flightorderResponse?.data?.travelers[0]?.contact?.emailAddress +
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

  sendOrderCreationMail() {
    this.emailDetails.EmailSubject = 'Flight Booking Details';
    this.emailDetails.IsPaymentSuccess = true;
    this.emailDetails.EmailContent =
      this.htmlHead +
      this.htmlBody +
      this.flightdetails_header +
      this.segmentdetails +
      this.passengerdetails +
      this.pricedetails +
      this.footer;

    for (var i = 0; i < this.flightorderResponse.data.travelers.length; i++) {
      if (i != 0) {
        var toAdd = true;
        for (var j = 0; j < i; j++) {
          if (
            this.flightorderResponse?.data?.travelers[i]?.contact
              ?.emailAddress ==
            this.flightorderResponse?.data?.travelers[j].contact?.emailAddress
          ) {
            toAdd = false;
          }
        }
        if (toAdd == true) {
          this.emailDetails.ToMailList.push({
            Name:
              this.flightorderResponse.data.travelers[i].name.firstName +
              ' ' +
              this.flightorderResponse.data.travelers[i].name.lastName,
            MailId:
              this.flightorderResponse.data.travelers[i]?.contact?.emailAddress,
          });
        }
      } else {
        this.emailDetails.ToMailList.push({
          Name:
            this.flightorderResponse.data.travelers[i].name.firstName +
            ' ' +
            this.flightorderResponse.data.travelers[i].name.lastName,
          MailId:
            this.flightorderResponse.data.travelers[i]?.contact?.emailAddress,
        });
      }
    }

    if (this.emailDetails != null && this.emailDetails != undefined) {
      this._flightService
        .SendConfirmationEmail(this.emailDetails)
        .pipe()
        .subscribe(
          (data: any) => {
            console.log('Mail Success');
          },
          (error: any) => {
            console.log('Mail Error');
          }
        );
    }
  }

  getPricePassengerData() {
    const counts = {};
    const totals = {};
    this.flightFareData?.travelerPricings.forEach((item) => {
      counts[item.travelerType] = (counts[item.travelerType] || 0) + 1;
    });

    for (const [type, count] of Object.entries(counts)) {
      const totalPrice =
        this.flightFareData?.travelerPricings.find(
          (p: any) => p.travelerType === type
        )?.price.grandTotal || '0';
      this.passengerPriceData.push({ type, count, totalPrice });
    }
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
    let associatedPassengerId: number = 1;
    this.flightFareData?.travelerPricings?.map((fare: any) => {
      if (fare?.travelerType === 'HELD_INFANT') {
        fare['associatedAdultId'] = associatedPassengerId.toString();
        associatedPassengerId++;
      }
    });
    this.flightPricingReq.data.flightOffers[0] = Object.assign(
      this.flightPricingReq.data.flightOffers[0],
      this.flightFareData
    );
    this.isLoading = true;
    if (this.affiliated_user != undefined) {
      this.flightPricingReq.userid = String(this.affiliated_user.id);
      this.flightPricingReq.b2BCustomer_ID =
        this.affiliated_user.b2BCustomer_ID == undefined
          ? '0'
          : this.affiliated_user.b2BCustomer_ID;
      this.flightPricingReq.userType =
        this.affiliated_user.userType == undefined
          ? ''
          : this.affiliated_user.userType;
    }
    this._flightService.flightPriceData(this.flightPricingReq).subscribe({
      complete: () => {}, // completeHandler
      error: (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error Fetching Flight Data. Please Try Again',
        });
        this.isLoading = false;
      }, // errorHandler
      next: (response: any) => {
        if (response !== null && response !== undefined) {
          console.log(response);
          // this.fare_PriceUpsell_Res = data;
          this.isLoading = false;
          debugger;
          const flightFareInstallementDetails =  this.flightFareData?.flightFareInstallementDetails ?? null;
          this.flightFareData = response?.result?.data?.flightOffers[0];
          this.flightFareData['flightFareInstallementDetails'] = flightFareInstallementDetails ?? null;
          this.flightFareData['installmentAmount'] = this.sharedService.getInstallmentAmount(this.flightFareData?.price?.grandTotal ?? 0, 20);
          this.flightFareData['isInstallmentApplicable'] = this.sharedService.getInstallationDateDuration(this.flightFareData?.itineraries[0].segments[0]?.departure.at) ?? false;
          if(flightFareInstallementDetails !== null){
            this.installmentAppliedChanged(this.flightFareData?.flightFareInstallementDetails);
          }
          else{
            this.totalFareTotalPrice = this.flightFareData?.price?.grandTotal ?? 0;
          }

        } else {
          this.isLoading = false;
        }
      },
    });
  }

  selectedIndex: number = 0; // Index of the currently selected tab
  items: any[] = [
    { header: 'Tab 1', content: 'Content for Tab 1' },
    { header: 'Tab 2', content: 'Content for Tab 2' },
    // Add more items as needed
  ];

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
      this.isPassengerDetailsPage =    this.router.url === '/passenger-details-1A'
      }
    });
  }

  installmentAppliedChanged(event: any) {
    this.totalFareTotalPrice = event.initialDownPayment ?? 0;
    this.flightFareInstallementDetails = event;
    this.displayPositionCalc = false;
  }

}
