import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FilterService, MessageService, PrimeNGConfig } from "primeng/api";
import { SearchReqUIModel } from 'src/app/Models/flight/Amadeus/Fare_MasterPricerTravelBoardSearch';
import { FlightService } from 'src/app/services/flight.service';
import { SharedService } from 'src/app/services/shared.service';
import { SelectPassengerComponent } from '../select-passenger/select-passenger.component';
import { amadeusRequestModelObject } from 'src/app/Models/flight/Amadeus/flight-offer.model';
import { FlightSearchRequest } from 'src/app/Models/flight/Amadeus/micro-service-flight.model';
import { log } from 'console';
import { MicroService } from 'src/app/services/micro.service';
// import { default as airLineCity } from "src/assets/json/AirIntCitys.json";

import { debounceTime } from 'rxjs/operators';


const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();
const datepipe: DatePipe = new DatePipe('en-US')
@Component({
  selector: 'app-oneway',
  templateUrl: './oneway.component.html',
  styleUrls: ['./oneway.component.scss'],
  providers: [SharedService, FilterService, MessageService]
})
export class OnewayComponent implements OnInit {

  public flightSearchForm: FormGroup;
  //  public selectedFromCity = new FormControl(null)
  //  public selectedToCity = new FormControl(null)
  @Input() selectedPassengerList: any;
  @Input() searchFlightFormValue: any;
  @Input() prefillFormValue: any;
  @Input() searchType: string = 'oneWay';
  @Input() cities: Array<any> = [];
  public selectedPassengerListData: any;
  public selectedCabinDataData: any;
  minimumDate = new Date();
  public isLoading = false;
  @Output() changedFlightData: EventEmitter<boolean> = new EventEmitter<any>(false);
  @Output() tripFormData: EventEmitter<any> = new EventEmitter<any>();
  // cities: any[];
  filteredCities: any[];
  triptype: string = "One-Way";
  multiCityArray: FormArray;
  public current_date: Date = new Date();
  public max_date: Date = new Date();
  rotate: boolean = false;
  roundTripDateArry: any[] = [];
  // @ViewChild('calendar') private calendar: any;
  rangeDates: Date[] | undefined;
  date1: Date | undefined;
  public amedeusReqModel = amadeusRequestModelObject;
  affiliated_user: any;
  affiliate_user_permission: any;

  searchResultObj = {
    amedeusData: null,
    data: null,
    formData: null,
    requestModel: null,
    amedeusRequestModel: null,
    tripType: null
  }



  supplierList: any[] = [];



  get selectedFromCity() {
    return this.flightSearchForm.get('selectedFromCity') as FormControl<any>;
  }
  get selectedToCity() {
    return this.flightSearchForm.get('selectedToCity') as FormControl<any>;
  }
  get DepartedDate() {
    return this.flightSearchForm.get('DepartedDate') as FormControl<any>;
  }
  get ReturnDate() {
    return this.flightSearchForm.get('ReturnDate') as FormControl<any>;
  }
  get DirectFlights() {
    return this.flightSearchForm.get('DirectFlights') as FormControl<any>;
  }
  get FlexibleDate() {
    return this.flightSearchForm.get('FlexibleDate') as FormControl<any>;
  }
  get NearbyAirports() {
    return this.flightSearchForm.get('NearbyAirports') as FormControl<any>;
  }
  get CabinList() {
    return this.flightSearchForm.get('CabinList') as FormControl<any>;
  }
  get multiCityArrayControl() {
    return this.flightSearchForm?.get('multiCityArray') as FormArray;
  }
  get currentMinDate() {
    return this.flightSearchForm?.get('currentMinDate') as FormArray;
  }

  constructor(private router: Router, private sharedService: SharedService, public form: FormBuilder, private _flightService: FlightService, private messageService: MessageService, private primengConfig: PrimeNGConfig, private _microService: MicroService) { }

  ngOnInit() {
    // this.getSupplierDetails(); for getting suppliers information (TODO in later versions)
    if (this.sharedService.getLocalStore('affiliate_user') != '' && this.sharedService.getLocalStore('affiliate_user') != undefined) {
      this.affiliated_user = JSON.parse(this.sharedService.getLocalStore('affiliate_user'));;
      this.affiliate_user_permission = this.affiliated_user?.permissions.filter((item: { moduleName: string; }) => item.moduleName == "AIR SERVICES")[0];
    }
    this.primengConfig.ripple = true;

    this.buildForm();
    this.addItem();
    this._flightService.castpassengerCount.subscribe((list) => {
      this.flightSearchForm.get('PassengerList').patchValue(list);
      this.selectedPassengerListData = list;
    });
    this._flightService.castCabinCount.subscribe((cabin) => {
      this.CabinList.patchValue(cabin);
      this.selectedCabinDataData = cabin;

    });

    if (this.prefillFormValue !== null) {

      if (typeof this.prefillFormValue?.selectedFromCity === 'object') {
        this.selectedFromCity.patchValue(this.prefillFormValue?.selectedFromCity)
      }
      if (typeof this.prefillFormValue?.selectedToCity === 'object') {
        this.selectedToCity.patchValue(this.prefillFormValue?.selectedToCity)
      }
    }

    this.serachFormValue();  
  }

  addItem(currentIndex: number = 1) {
    this.current_date = this.multiCityArrayControl?.value[currentIndex - 1].DepartedMultiDate;
    this.multiCityArrayControl.push(this.createItem());
  }

  airLineCity(event: { query: any; }) {
    // console.log(event);

    // // debugger;
    // //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    //     let filtered: any[] = [];
    //     let query = event.query;

    //     for (let i = 0; i < this.cities.length; i++) {
    //       let city = this.cities[i];
    //       if ((city.CityCode.toLowerCase().indexOf(query.toLowerCase()) == 0) || (city.CityName.toLowerCase().indexOf(query.toLowerCase()) == 0)) {
    //         filtered.push(city);
    //       }
    //     }

    //     const losIndex = filtered.findIndex(city => city.CityCode === 'LOS');

    // if (losIndex !== -1) {
    //   // Remove the element with CityCode 'LOS' from the array
    //   const losCity = filtered.splice(losIndex, 1)[0];

    //   // Add the element back to the array at the beginning
    //   filtered.unshift(losCity);
    // }

    //     this.filteredCities = filtered;

    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.cities.length; i++) {
      let city = this.cities[i];
      if ((city.CityName.toLowerCase().indexOf(query.toLowerCase()) == 0) || (city.CityCode.toLowerCase().indexOf(query.toLowerCase()) == 0) || ((city.CityName.replaceAll(' ', '')).toLowerCase().indexOf(query.toLowerCase()) == 0)) {
        filtered.push(city);
      }
    }
    const losIndex = filtered.findIndex(city => city.CityCode === event.query.trim()?.toUpperCase());

    if (losIndex !== -1) {
      const losCity = filtered.splice(losIndex, 1)[0];
      filtered.unshift(losCity);
    }
    this.filteredCities = filtered;
  }

  selectEvent(event: any) {
    this.tripFormData.emit(this.flightSearchForm.value);
  }


  addTravellingData(travvelType: string = 'oneWay', id: number = 0, travelDetails: any) {
    // debugger
    const datepipe: DatePipe = new DatePipe('en-US');
    let travellingData = {
      id: id.toString(),
      originLocationCode: travvelType === 'oneWay' ? travelDetails.origin : travelDetails.destination,
      destinationLocationCode: travvelType === 'oneWay' ? travelDetails.destination : travelDetails.origin,
      departureDateTimeRange: {
        date: (travvelType === 'oneWay' && this.searchType !== 'roundTrip') ? datepipe.transform(travelDetails.date, 'yyyy-MM-dd') : (this.searchType === 'roundTrip' && travvelType === 'oneWay') ? datepipe.transform(travelDetails.date, 'yyyy-MM-dd').toString() : datepipe.transform(travelDetails.ReturnDate, 'yyyy-MM-dd').toString()
      }
    }
    return travellingData;
  }

  passengerData(passCount: number = 0, type: string = 'ADULT', index: number = 0) {

    let passengerDetails = {
      id: passCount.toString(),
      travelerType: type,
      fareOptions: ["STANDARD"]
    };
    if (type === 'HELD_INFANT') {
      passengerDetails['associatedAdultId'] = (index + 1).toString();
    }
    return passengerDetails;
  }

  //  for airabia



  submitTravelData(searchRequestModel: FlightSearchRequest) {
    this.isLoading = true;
    this.searchResultObj.requestModel = searchRequestModel;
    this._flightService.flightSearchRequest(searchRequestModel).subscribe({
      complete: () => { }, // completeHandler
      error: (error: any) => { this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error Fetching Flight Data. Please Try Again' }); this.isLoading = false;
      
      if(this.searchResultObj.amedeusData !== null && this.searchResultObj.amedeusData !== undefined){
        this.resultPageRouter();
      }
    
    },    // errorHandler 
      next: (data: any) => {
        if (data !== undefined && data !== null) {

          if (data?.CombinedBound !== null) {
            this.isLoading = false;
            var SupplierName = "";
            data.CombinedBound = (Object.keys(data?.CombinedBound).map(key => ({ amount: key, flights: data.CombinedBound[key], additionalMarkupAmount: 0 }))?.sort((a: any, b: any) => a.amount - b.amount));
            data['totalFlights'] = 0;
          }
          this.searchResultObj.data = data;
          this.resultPageRouter();
        }

        else {
          this.isLoading = false;
          this.resultPageRouter();
        }
      }
    });

  }

  resultPageRouter() {
    this.sharedService?.setLocalStore("flightData", this.searchResultObj);
    if (this.searchResultObj.amedeusData !== null || this.searchResultObj.data !== null) {
      this.router.navigateByUrl('/result-page');
      this.changedFlightData.emit(true);
    }

    this.isLoading = false;
  }

  submitTravelAmeadiusData(searchRequst: any = null, isSearch: boolean = false) {
    this.isLoading = true;
    if (this.affiliated_user != undefined) {
      this.amedeusReqModel.userid = String(this.affiliated_user.id);
      this.amedeusReqModel.b2BCustomer_ID = this.affiliated_user.b2BCustomer_ID == undefined ? '0' : this.affiliated_user.b2BCustomer_ID;
      this.amedeusReqModel.userType = this.affiliated_user.userType == undefined ? '' : this.affiliated_user.userType;
    }
    this.searchResultObj.amedeusRequestModel = this.amedeusReqModel;
    this._flightService.FlightOfferlist(this.amedeusReqModel).subscribe({
      complete: () => { }, // completeHandler
      error: (error: any) => { this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error Fetching Flight Data. Please Try Again' }); this.isLoading = false; this.submitTravelData(searchRequst); },    // errorHandler 
      next: (data: any) => {
        if (data !== null && data !== undefined) {
          this.searchResultObj.amedeusData = data;
          // console.log(data);
          // let states = {
          //   data: data,
          //   formData: this.flightSearchForm?.value,
          //   requestModel: this.amedeusReqModel,
          //   tripType: this.searchType
          // }
          // this.sharedService.setLocalStore("selectedCurrencyFromResult", data.selectedCurrency);

          if (isSearch) {
            this.submitTravelData(searchRequst);

          }


          // this.sharedService?.setLocalStore("flightData", states);
          // this.isLoading = false;
          // this.router.navigateByUrl('/result-page');
          // this.changedFlightData.emit(true)
          // this.isLoading = false;
        }
        else {
          this.isLoading = false;
          if (isSearch) {

            this.submitTravelData(searchRequst);
          }

        }
      }
    });
  }

  searchResult(searchType: string = 'oneway') {

    //For Amadeus search

    this.amedeusReqModel.originDestinations.length = 0;
    this.amedeusReqModel.travelers.length = 0;
    this.amedeusReqModel.searchCriteria.flightFilters.cabinRestrictions[0].originDestinationIds.length = 0;
    this.searchResultObj.amedeusData = null;
    this.searchResultObj.data = null;
    var passCount = 0
    this.selectedPassengerListData.forEach((passengerData: any, index: number) => {

      // this.amedeusReqModel.travelers?.push(this.passengerData())
      if (passengerData.passengerType === "Adult" && passengerData.count > 0) {
        for (var i = 0; i < passengerData.count; i++) {
          passCount++;
          this.amedeusReqModel.travelers?.push(this.passengerData(passCount, 'ADULT'));
        }
      }
      else if (passengerData.passengerType === "Child" && passengerData.count > 0) {
        for (var i = 0; i < passengerData.count; i++) {
          passCount++;
          this.amedeusReqModel.travelers?.push(this.passengerData(passCount, 'CHILD'));
        }

      }
      else if (passengerData.passengerType === "Infant" && passengerData.count > 0) {
        for (var i = 0; i < passengerData.count; i++) {
          passCount++;
          this.amedeusReqModel.travelers?.push(this.passengerData(passCount, 'HELD_INFANT', i));
        }

      }
    });
    this.amedeusReqModel.searchCriteria.flightFilters.cabinRestrictions[0].cabin = this.selectedCabinDataData.subValue.toUpperCase();
    let parameters: FlightSearchRequest = null;

    //for micro service\

    //   formData: this.flightSearchForm?.value,
    //   requestModel: searchRequestModel,
    this.searchResultObj.tripType = this.searchType;
    this.searchResultObj.formData = this.flightSearchForm?.value;

    if (this.searchType?.toLowerCase() === 'oneway' || this.searchType?.toLowerCase() === 'roundtrip') {


      (this.flightSearchForm.get('multiCityArray') as FormArray).controls.forEach(control => {
        control.markAsUntouched();
      });

      const destinationIds = this.searchType === 'roundTrip' ? ['1', '2'] : ['1'];
      this.amedeusReqModel.searchCriteria.flightFilters.cabinRestrictions[0].originDestinationIds.push(...destinationIds);

      if (this.selectedFromCity.valid && this.selectedToCity.valid && this.DepartedDate.valid) {

        if (this.selectedFromCity.value.CityName === undefined || this.selectedFromCity.value.CityName === null) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select  the origin(Departed from?)' });
          this.selectedFromCity.setErrors({ 'incorrect': true });
          return;
        }
        else if (this.selectedToCity.value.CityName === undefined || this.selectedToCity.value.CityName === undefined === null) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select the destination(To where?)' });
          this.selectedToCity.setErrors({ 'incorrect': true });
          return;
        }
        if (this.searchType === 'roundTrip' && (this.DepartedDate?.value == null || this.ReturnDate?.value == null)) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select a valid date' });
          return;
        }
        else {
          parameters = {
            device: "desktop",
            from: this.selectedFromCity.value?.CityCode,
            to: this.selectedToCity.value?.CityCode,
            depDate: datepipe.transform(this.DepartedDate.value, 'yyyy-MM-dd'),
            returnDate: this.searchType === 'roundTrip' ? datepipe.transform(this.ReturnDate.value, 'yyyy-MM-dd') : '',
            adt: this.selectedPassengerListData.find((passenger: any) => passenger?.passengerType?.toLowerCase() === 'adult')?.count,
            chd: this.selectedPassengerListData.find((passenger: any) => passenger?.passengerType?.toLowerCase() === 'child')?.count,
            inf: this.selectedPassengerListData.find((passenger: any) => passenger?.passengerType?.toLowerCase() === 'infant')?.count,
            cls: this.CabinList.value?.value ?? '0',
            aff: "1",
            pwd: "aff",
            currency: 'NGN',
            language: "en-GB",
            cn: "qa",
            source: "API",
            isDirectSearch: false,
            airlinePreference: "",
            isSearchFlexible: false,
            UtmSource: "",
            UtmMedium: "",
            ///Suppliers: '1,2'
            Suppliers: '2'
          };


          let travelDetails = {
            origin: this.selectedFromCity.value?.CityCode,
            destination: this.selectedToCity.value?.CityCode,
            date: this.DepartedDate.value,
            ReturnDate: this.ReturnDate.value,
          }

          if (this.searchType === 'roundTrip') {
            this.amedeusReqModel.originDestinations.push(this.addTravellingData('oneWay', 1, travelDetails));
            this.amedeusReqModel.originDestinations.push(this.addTravellingData('roundTrip', 2, travelDetails));
          }

          else {
            this.amedeusReqModel.originDestinations.push(this.addTravellingData('oneWay', 1, travelDetails));
          }

        }

        this.submitTravelAmeadiusData(parameters, true);


      }
      else {

        this.flightSearchForm.markAllAsTouched();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields' });

      }


    }
    else {

      this.selectedFromCity.markAsUntouched();
      this.selectedToCity.markAsUntouched();
      this.DepartedDate.markAsUntouched();
      this.multiCityArrayControl.markAllAsTouched();

      if (this.multiCityArrayControl.invalid) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields' });
        return;
      }
      else {
        this.multiCityArrayControl.value.forEach((cityData: any, index: number) => {
          this.amedeusReqModel.searchCriteria.flightFilters.cabinRestrictions[0].originDestinationIds.push((index + 1).toString());
          // this.requestModel?.searchAirLeg.push(this.travelingMultiData(cityData));

          let travelDetails = {
            origin: cityData.selectedMultiFromCity?.CityCode,
            destination: cityData.selectedMultiToCity?.CityCode,
            date: cityData.DepartedMultiDate
          }

          this.amedeusReqModel.originDestinations.push(this.addTravellingData('oneWay', (index + 1), travelDetails));

        });
        this.isLoading = true;
        this.submitTravelAmeadiusData(parameters, true);
      }
    }

  }


  getSupplierDetails() {
    this.isLoading = true;
    const supplierType = 1;
    this.sharedService.GetAllSuppliers().subscribe({
      complete: () => { }, // completeHandler
      error: (error: any) => { this.isLoading = false; },    // errorHandler 
      next: (data: any) => {
        if (data?.length) {
          this.isLoading = false;
          this.supplierList = data;
        }
      },
    });
  }

  buildForm() {
    this.flightSearchForm = this.form.group({
      selectedFromCity: ['', [Validators.required]],
      selectedToCity: ['', [Validators.required]],
      DepartedDate: [new Date(), [Validators.required]],
      ReturnDate: [new Date(), [Validators.required]],
      DirectFlights: false,
      FlexibleDate: false,
      NearbyAirports: false,
      CabinList: [''],
      PassengerList: [''],
      multiCityArray: this.form.array([this.createItem()]),
    });
    this.DepartedDate.valueChanges.subscribe((data: any) => {
    })
    // this.selectedFromCity.valueChanges.pipe(debounceTime(300)).subscribe((data: any) => {
    //   this.tripFormData.emit(this.flightSearchForm.value);
    //   console.log(this.flightSearchForm.value);
    // });
    // this.selectedToCity.valueChanges.subscribe((data: any) => {
    //   this.tripFormData.emit(this.flightSearchForm.value);
    //   console.log(this.flightSearchForm.value);
    // });
  }


  serachFormValue() {
    if (this.searchFlightFormValue !== undefined && this.searchFlightFormValue !== null) {

      let checkDate =   new Date(this.searchFlightFormValue?.DepartedDate)  > new Date(this.searchFlightFormValue?.ReturnDate) ? new Date(this.searchFlightFormValue?.DepartedDate)  :  new Date(this.searchFlightFormValue?.ReturnDate)

      this.flightSearchForm.patchValue({
        selectedFromCity: this.searchFlightFormValue?.selectedFromCity,
        selectedToCity: this.searchFlightFormValue?.selectedToCity,
        DepartedDate: this.searchType === 'oneWay' ? new Date(this.searchFlightFormValue?.DepartedDate ?? this.minimumDate) : (Array.isArray(this.searchFlightFormValue?.DepartedDate) ? [new Date(this.searchFlightFormValue?.DepartedDate?.at(0) ?? this.minimumDate), new Date(this.searchFlightFormValue?.DepartedDate[1] ?? this.minimumDate)] : new Date(this.searchFlightFormValue?.DepartedDate)),
        ReturnDate: checkDate,
        DirectFlights: this.searchFlightFormValue?.DirectFlights,
        FlexibleDate: this.searchFlightFormValue?.FlexibleDate,
        NearbyAirports: this.searchFlightFormValue?.NearbyAirports,
        multiCityArray: this.multiArrayFill(this.searchFlightFormValue?.multiCityArray)
      })
    }

    console.log(this.flightSearchForm.value);
  }

  multiArrayFill(fromData: any) {
    let val = [];
    fromData?.map((data: any, index: number) => {
      if (index > 1) {
        this.multiCityArrayControl.push(this.createItem());
      }
      val.push({
        selectedMultiFromCity: data?.selectedMultiFromCity,
        selectedMultiToCity: data?.selectedMultiToCity,
        DepartedMultiDate: new Date(data?.DepartedMultiDate),
        currentMinDate: new Date(data?.currentMinDate),
        swapCity: data?.currentMinDate

      })
    })
    return val
  }

  showDelay(control: boolean) {
    // if (control) {
    //   setTimeout(() => {
    //     return false
    //   }, 1000);
    // }
    // return true

  }

  multiCitySearch(index: number, control: string,) {
    return (this.flightSearchForm?.get('multiCityArray') as FormArray)
    ['at'](index)
      .get(control) as FormControl<any>;
  }

  createItem() {
    return this.form.group({
      selectedMultiFromCity: ['', [Validators.required]],
      selectedMultiToCity: ['', [Validators.required]],
      DepartedMultiDate: [this.current_date, [Validators.required]],
      currentMinDate: [this.current_date],
      swapCity: [true],

    });
  }
  deleteRow(index: number) {
    // var delBtn = confirm(" Do you want to delete ?");
    let controlsLength: number = this.multiCityArrayControl?.controls?.length;
    const getCurrentMin = this.multiCitySearch(index, 'currentMinDate').value;
    if (index < (controlsLength - 1)) {
      this.multiCitySearch(index + 1, 'currentMinDate').setValue(getCurrentMin);
    }
    (this.multiCityArrayControl).removeAt(index);
  }

  swapCity(searchType: string = 'oneWay', index: number = 0) {
    this.rotate = !this.rotate;
    if (searchType == 'oneWay') {
      const control1Value = this.selectedFromCity?.value;
      const control2Value = this.selectedToCity?.value;
      this.selectedFromCity.setValue(control2Value);
      this.selectedToCity.setValue(control1Value);
    }
    else {
      let formArrayControl = this.multiCityArrayControl['at'](index);
      let prevSwapCityValue = formArrayControl.get('swapCity')?.value;
      const control1Value = formArrayControl.get('selectedMultiFromCity')?.value;
      const control2Value = formArrayControl.get('selectedMultiToCity')?.value;
      formArrayControl.get('selectedMultiFromCity')?.setValue(control2Value);
      formArrayControl.get('selectedMultiToCity')?.setValue(control1Value);
      formArrayControl.get('swapCity')?.setValue(!prevSwapCityValue);
    }
  }

  onSelect(event: any) {
    // this.roundTripDateArry.push(event);
    // if (this.roundTripDateArry.length == 2) {
    //   this.roundTripDateArry.length = 0;
    // }
    if (new Date(this.DepartedDate?.value) > new Date(this.ReturnDate.value)) {
      this.ReturnDate.patchValue(this.DepartedDate?.value);
    }
  }

  dateChange(event: any, index: number) {
    let previousValue = new Date();
    (this.multiCityArrayControl)?.controls?.forEach((cityControls: any, controlIndex: number) => {
      if ((index < controlIndex && (cityControls?.value?.DepartedMultiDate < event))) {
        cityControls?.controls?.DepartedMultiDate.patchValue(event);
      }
      if (index < controlIndex) {
        cityControls?.controls?.currentMinDate.setValue(previousValue);
      }
      previousValue = cityControls?.controls?.DepartedMultiDate?.value;

    });
  }






  ngOnChanges(changes: SimpleChanges) {
    if (this.searchType === 'oneWay' && this.flightSearchForm) {

      this.DepartedDate?.patchValue(new Date());
      this.serachFormValue();
    }
    else if (this.searchType === 'roundTrip' && this.flightSearchForm) {
      this.DepartedDate?.patchValue(new Date());
      this.serachFormValue();

    }
  }
}
