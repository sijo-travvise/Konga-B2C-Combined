import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FlightService } from 'src/app/services/flight.service';
import { SharedService } from 'src/app/services/shared.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';
import { MicroService } from 'src/app/services/micro.service';

@Component({
  selector: 'app-flight-itinerary-details',
  templateUrl:  './flight-itinerary-details.component.html',
  styleUrls: ['./flight-itinerary-details.component.scss'],
  providers: [SharedService, MessageService, FlightService],
})
export class FlightItineraryDetailsComponent implements OnInit {

  universalLocatorCode: any = null;
  merchant_reference: any = null;
  isLoading: boolean = false;
  isCompleted: boolean = false;
  public flightIteneraryData: any = null;
  public paymentSuccess:boolean=undefined;
  public bookingDetailsData: any;
  flightTransactions_ID: any = null;
  pnrRetrieveRes: any;
  currentUser: any;

  public amount: number = 1000;
  public description: string = "Konga Pay";
  public email: string = "";
  public merchant_id: string = "115477"//"konga224";
  public reference: string = "";
  public firstname: string = "";
  public lastname: string = "";
  public phone: string = "";
  public callback: string = "";
  public customerId: string = "";
  public public_key: string = "";
  public mode: string = "";
  public hash: string = "";

 constructor( private route: ActivatedRoute, 
              private messageService: MessageService, 
              private _flightService: FlightService, 
              private _authenticationService: AuthenticationService,
              public _microService: MicroService,
              private sharedService: SharedService){

              this.route.paramMap.subscribe((params: any) => {
                this.flightTransactions_ID = params.get('pnr').toString();
                console.log(this.flightTransactions_ID);
    
              });

              this.currentUser = this._authenticationService.affliateUser;

              
              if (this.flightTransactions_ID !== null)  {
                this.getBookingDetails(this.flightTransactions_ID);
                // this.retrievePNR(this.flightTransactions_ID);
              }

 }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // this.universalLocatorCode = params.get('locatorCode');
      // this.merchant_reference = this.route?.snapshot?.queryParamMap?.get("merchant_reference");
      var paymentStatus = this.route.snapshot.queryParamMap.get("status");
      if (paymentStatus == "success") {
        this.paymentSuccess = true;
      }
      else if(paymentStatus=="failed"){
        this.paymentSuccess = false;
      }
    });
    // if (this.universalLocatorCode != null) {
    //   var paymentStatus = this.route.snapshot.queryParamMap.get("status");
    //   //this.itineraryDetails(paymentStatus);
    // }
    // else if(this.merchant_reference !=null)
    // {
    //   this.universalLocatorCode=this.merchant_reference
    //   var paymentStatus = this.route.snapshot.queryParamMap.get("status");
    //   //this.itineraryDetails(paymentStatus);
    // }
    // else{
    //   var paymentStatus = this.route.snapshot.queryParamMap.get("status");
    //   if (paymentStatus == "success") {
    //     this.paymentSuccess = true;
    //   }
    //   else if(paymentStatus=="failed"){
    //     this.paymentSuccess = false;
    //   }
    //   var flightorderResponse = this.sharedService.getLocalStore('bookingOrderData');
    //   this.flightIteneraryData = [flightorderResponse?.data];
    // }
  }

  

  getBookingDetails(flightTransactions_ID: string) {
    this.isLoading = true;
    this._flightService.getBookingDetails(flightTransactions_ID).subscribe({
      complete: () => { },
      error: (error: any) => { this.isLoading = false; },
      next: (data: any) => {
        if (data !== null && data !== undefined) {
          this.bookingDetailsData = data;
          this.retrievePNR(data)
          // this.getCustomerProfileData(data?.FlightTransactions[0]?.CustomerProfile_ID)
          // this.isLoading = false;
       
        }
        else {
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Oops...',
          // }).then(function () {
          //   window.location.href = "/";
          // })
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went wrong!. Please Try Again',
          });
          this.isLoading = false;
        }
      },
    });
  }


  retrievePNR(bookingData: any): void {

   
    // this.isLoading = true;
    // this.isCompleted = true;
    // const idArray = bookingData.split('-');
    const retrivePNRObj = {
      SupplierId: bookingData?.FlightTransactions[0]?.SUPPLIER_DTID,
      PNRNumber: bookingData?.FlightTransactions[0]?.AirlinePNR,
      AffiliateId: this.currentUser?.customerUser_ID,
      CustomerProfileId: bookingData?.FlightTransactions[0]?.CustomerProfile_ID,
    };
    this._flightService.retrieveAirArabiaPNR(retrivePNRObj).subscribe({
      complete: () => { this.isLoading = false; },
      error: (error: any) => { this.isLoading = false; },
      next: (data: any) => {
        if (data) {
          this.pnrRetrieveRes = data;
      
           this.isLoading = false
       
        }
        else {
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Oops...',
          // }).then(function () {
          //   window.location.href = "/";
          // })
          this.isLoading = false;
          this.isCompleted = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went wrong!. Please Try Again',
          });
        }
      },
    });
  }


  getBaggageData(data: any){
    // data[0]?.travelers?.forEach((traveler_i: any  )=> {
    //    let baggage: string= '0 KG';
    //   data[0]?.flightOffers[0].travelerPricings?.forEach((travelerprice_i: any) => {
    //     if(traveler_i.id === travelerprice_i.travelerId){
    //        baggage= travelerprice_i.fareDetailsBySegment[0].includedCheckedBags?.quantity !== undefined? travelerprice_i.fareDetailsBySegment[0].includedCheckedBags.quantity +" PC" : travelerprice_i.fareDetailsBySegment[0].includedCheckedBags.weight+" KG";
    //     }
    //   });
    //   traveler_i['baggage'] = baggage;
    // });
  }

  // itineraryDetails(paymentStatus:any) {
  //   this.isLoading = true;
  //   this._flightService.flightItenararyDetails(this.universalLocatorCode,paymentStatus)
  //     .subscribe({
  //       complete: () => {  this.isLoading = false;}, // completeHandler
  //       error: (error: any) => {
  //         this.isLoading = false;
  //         this.messageService.add({
  //           severity: 'error',
  //           summary: 'Error',
  //           detail: 'Something went wrong!',
  //         });
  //         this.isLoading = false;
  //       }, // errorHandler
  //       next: (response: any) => {
  //         if (response?.data != null) {
           
  //           // this.getBaggageData(response?.data);
  //           this.isLoading = false;
  //           this.flightIteneraryData = response?.data;

  //           console.log( this.flightIteneraryData);
            
              
  //         }
  //         else{
  //           this.messageService.add({
  //             severity: 'error',
  //             summary: 'Error',
  //             detail: 'Something went wrong!',
  //           });
  //           this.isLoading = false;
  //         }
  //       }

  //     });
  // }



  OnClickPayNow() {
    this.PaymentDetailsLoad();

    this._flightService.GetHash(this.amount, this.public_key, this.reference)
      .subscribe(
        (res2: any) => {
          debugger
          if (res2.statusCode == 200 && res2.result != null && res2.result != undefined) {

            this.hash = res2.result.hashKey;
            this.reference = res2.result.uniqueReference;
            (<HTMLInputElement>document.getElementById('hash')).value = this.hash;
            (<HTMLInputElement>document.getElementById('reference')).value = this.reference;
            (<HTMLInputElement>document.getElementById('amount')).value = this.amount.toString();
            let element = document.getElementById('paymentCallButton') as HTMLElement;
            element.click();
          }
          else {
            //this.toastr.error("Something Went Wrong !");
          }

        },
        (error: any) => {
          //this.toastr.error("Something Went Wrong !");
        });
  }



   PaymentDetailsLoad() {
      //Payment
      this.public_key = environment.publicKey;
      this.mode = environment.mode;
      this.hash = "";
  
      var priceArr = [];
  
      if (this.bookingDetailsData?.fareInstallmentDetails?.isInstallmentApplied){
        priceArr = this.bookingDetailsData?.fareInstallmentDetails?.initialDownPayment.toString()?.split('.');
      }
      else if (this.bookingDetailsData?.FlightTransactions[0]?.sellingPrice != null){
        priceArr = this.bookingDetailsData?.FlightTransactions[0]?.sellingPrice?.toString()?.split('.');
      }
      else{
        
        priceArr = this.bookingDetailsData?.FlightTransactions[0]?.TotalFare?.toString()?.split('.');;
      }
        
      
      var priceWithDecimal;
  
      if (priceArr.length == 1)
        priceWithDecimal = priceArr[0] + "00";
      else {
        if (priceArr[1].length == 1) {
          priceWithDecimal = priceArr[0] + priceArr[1] + "0";
        }
        else {
          priceWithDecimal = priceArr[0] + priceArr[1];
        }
  
      }
  
      //  Number( this.bookingDetailsData[0]?.fareInstallmentDetails?.isInstallmentApplied ?  this.bookingDetailsData[0]?.fareInstallmentDetails?.initialDownPayment : priceWithDecimal);  //1000 
  
      this.amount = Number(priceWithDecimal);  //1000
      this.description = "Konga Pay";
      this.email = this.bookingDetailsData?.FlightTransactionDetails[0]?.Email ?? "";
      this.merchant_id = environment.merchantId;
      this.firstname = this.bookingDetailsData?.FlightTransactionDetails[0]?.FirstName ?? "";
      this.lastname = this.bookingDetailsData?.FlightTransactionDetails[0]?.LastName ?? "";
      this.phone = this.bookingDetailsData?.FlightTransactionDetails[0]?.PhoneNumber ?? "";
      let weburl = environment.webUrl;
      this.callback = weburl + "flight-itinerary/" + this.flightTransactions_ID;
      this.customerId = this.bookingDetailsData?.FlightTransactions[0]?.CustomerProfile_ID?? "";
      this.reference = this.bookingDetailsData?.FlightTransactions[0]?.AirlinePNR ?? "";
      // debugger
    }

    issueTicket() {
      this.isLoading = true;
      let issueTicketBody = {
        "SupplierId":  this.pnrRetrieveRes?.SupplierID,
        "PNRNumber":  this.pnrRetrieveRes?.PNRNumber,
        "BookingID":  this.bookingDetailsData?.FlightTransactions[0]?.FlightTransactions_ID,
        "URN": this.pnrRetrieveRes?.PNRNumber,
        "CommissionPercentage": "string",
        "SupplierConfirmationNumber": "string"
      }
      this._flightService.createIssueTicket(issueTicketBody).subscribe({
        complete: () => { },
        error: (error: any) => { this.isLoading = false; },
        next: (data: any) => {
          if (data?.Error !== null) {
            this.isLoading = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Something went wrong!. Please Try Again',
            });
          }
          else {
            this.isLoading = false;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Ticket issued successfully!' });
          }
        },
      });
    }
  

}
