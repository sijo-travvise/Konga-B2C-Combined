import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MicroService } from 'src/app/services/micro.service';
import { SharedService } from 'src/app/services/shared.service';
interface splitType {
  name: string;
  code: string;
}
@Component({
  selector: 'app-pay-as-earn-calculator',
  templateUrl: './pay-as-earn-calculator.component.html',
  styleUrls: ['./pay-as-earn-calculator.component.scss']
})
export class PayAsEarnCalculatorComponent {
  @Input() BookedFlightData: any;
  @Input() isPassengerDetailsPage: boolean = false;
  @Input() flighInstallementDetails: any = null;
  public installmentAmount: number = 0;
  splitType = [
    { name: '1 Time', code: 1 },
    { name: '2 Times', code: 2 },
    { name: '3 Times', code: 3 },
    { name: '4 Times', code: 4 },
    { name: '5 Times', code: 5 },
    { name: '6 Times', code: 6 },
  ];
  payPercentage = new FormControl(20, [Validators.min(20), Validators.max(100)]);
  PayBySplitType = new FormControl({ name: '1 Time', code: 1 });
  installmentArray = [];

  @Output() installmentApplied: EventEmitter<any> = new EventEmitter()


  constructor(private formBuilder: FormBuilder, private sharedService: SharedService, public _microService: MicroService, private router: Router) { }

  ngOnInit() {
    console.log(this.BookedFlightData, this.flighInstallementDetails);
    this.calclateInstallMentData(this.payPercentage.value, this.PayBySplitType.value.code);
  
   
    this.installmentAmount = this.sharedService.getInstallmentAmount(this.BookedFlightData?.PriceSummary?.SubTotal ?? 0, 20);
    if(this.flighInstallementDetails !== null && this.flighInstallementDetails !== undefined){
      const installmentArrayLength = Object.keys(this.flighInstallementDetails?.installementSplitAmount?.installmentDetails)?.length;
      this.payPercentage.setValue(this.flighInstallementDetails.minimumDownPayment ?? 20)
      this.PayBySplitType.setValue({ name: `${this.flighInstallementDetails?.splitInstallmentCount ?? 1} Time${(this.flighInstallementDetails?.splitInstallmentCount ?? 1) > 1 ? 's': ''}`, code: this.flighInstallementDetails?.splitInstallmentCount ?? 1 });
       this.calclateInstallMentData(this.payPercentage.value, installmentArrayLength ?? 1);
       this.installmentAmount = this.sharedService.getInstallmentAmount(this.BookedFlightData?.PriceSummary?.SubTotal ?? 0, this.flighInstallementDetails?.minimumDownPayment );
    }
  }

  inputValueChanges(event: any) {
    this.installmentAmount = this.sharedService.getInstallmentAmount(this.BookedFlightData?.PriceSummary?.SubTotal ?? 0, (event.value < 20 ? 20 : event.value > 100 ? 100 : event.value));
    this.calclateInstallMentData(event.value, this.PayBySplitType.value.code)
  }

  onChangeItem(event: any) {
    this.calclateInstallMentData(this.payPercentage.value, event.value.code)
  }

  calclateInstallMentData(percentage: any, installmentsTimes: number) {
    const defaultValue = this.BookedFlightData?.PriceSummary?.SubTotal ?? 0;
    this.installmentArray = [];
    const balancePercentage = (100 - (percentage < 20 ? 20 : percentage > 100 ? 100 : percentage)) / 100;

    const eachInstallmentAmount = (defaultValue * balancePercentage) / (installmentsTimes);
    let balanceInstallment = (defaultValue * balancePercentage);

    if (installmentsTimes !== undefined) {
      for (let i = 0; i < installmentsTimes; i++) {
        const totalAmount = ((balanceInstallment * 0.05) + eachInstallmentAmount);
        this.installmentArray.push({
          title: (i + 1) + (i == 0 ? 'st' : i == 1 ? 'nd' : i === 3 ? 'rd' : 'th') + ' Payment',
          amount: totalAmount.toFixed(1)
        });
        balanceInstallment = (balanceInstallment - eachInstallmentAmount);

      }
    }
  }


  getDeadlineDate(date: string) {
    const givenDate = new Date(date);
    const sevenDaysBefore = new Date(givenDate);
    sevenDaysBefore.setDate(givenDate.getDate() - 7);
    return sevenDaysBefore.toISOString();
  }


  payAsYouAmount(showType: boolean = true) {

    const installmentDetails = {};
    this.installmentArray.forEach((item: any, index) => { installmentDetails[index + 1] = Number(item.amount) })

    let flightFareInstallementDetails = {
      dateOfDeparture: this._microService?.getFormatedFlightDate(this.BookedFlightData?.Trips[0]?.FlightSegments[0]?.DepartureDate),
      totalFare: this.BookedFlightData?.PriceSummary?.SubTotal,
      currency: 'NGN',
      minimumDownPayment: this.payPercentage.value,
      initialDownPayment: Number(this.installmentAmount ?? 0),
      splitInstallmentCount: this.PayBySplitType?.value?.code,
      installementSplitAmount: {
        installmentDetails: installmentDetails
      }
    }
    

    if (showType) {
      this.installmentApplied.emit(flightFareInstallementDetails);
    }
    else {
      this.BookedFlightData.flightFareInstallementDetails = flightFareInstallementDetails;
      this.sharedService.setLocalStore("airPricePointSelected", this.BookedFlightData );
      this.router.navigateByUrl('/passenger-details');
    }

  }
}
