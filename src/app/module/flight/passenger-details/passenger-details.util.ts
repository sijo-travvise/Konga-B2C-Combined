interface optionList {
    value: string;
    name: string;
  }

export const PassengerNamePrefix: optionList[] = [
    {value: 'Mr', name: 'Mr'},
    {value: 'Ms', name: 'Ms'},
    {value: 'Mrs', name: 'Mrs'},
    // {value: 'SHK', name: 'Sheikh'},
    // {value: 'SHKA', name: 'Sheikha'},
  ];
  export const PassengerInfantNamePrefix: optionList[] = [
    {value: 'Mstr', name: 'Mstr'},
    {value: 'Ms', name: 'Ms'}
  ];
  export class BookingShippingAddress{
    public street!:string;
    public city!:string;
    public state!:string;
    public postalCode!:string;
    public country!:string;
    //public _key!:string;
}

  
export class BookingDeliveryInfo{
  public shippingAddress!: BookingShippingAddress;
}
export class BookingTravelerAddress
{
    public addressName!:string;
    public street!:string;
    public city!:string;
    public state!:string;
    public postalCode!:string;
    public country!:string;
}
export class BookingTravelerPhoneNumber
{
    public countryCode!:string;
    public areaCode!:string;
    public number!:string;
}
  export class AllPassengerDetailsList{
    public passengerDetailsArray!:any[]
    public paxId!:number;
    public associatedInfantId!:number;
    public associatedAdultId!:number;
    public firstName!:string;
    public lastName!:string;
    public prefix!:string;
    public emailID!:string;
    public type!:string;
    public  age!:number;

    public  dOB!:Date;

    public  gender!:string;

    public  nationality!:string;

    public idType!:string;
    public passportNumber!:string;
    public countryOfIssue!:string;
    public dateOfExpiry!:Date;
    public code!:string;

    public freqFlayerNo!:string;
    public carrier!:string;
    public deliveryInfo!: BookingDeliveryInfo;

    public  phoneNumber!:BookingTravelerPhoneNumber;

    public  address!:BookingTravelerAddress;

    public discountType: String | undefined;
    public approvedDiscount: number | undefined;
    public discountApproverUser_ID: String | undefined;
    public discountAmount!: number;
    public discountPercentage!: number;
    public markup!: number;
    public individualTotalPrice!:number;
    public discountApprovalEmailTemplate: String | undefined;
    public ticketingApprovalEmailTemplate: String | undefined;
}

export class Air_SellFromRecommendation{
  public messageActionDetails!:Air_SellFromRecommendationMessageActionDetails;
  public itineraryDetails!:Air_SellFromRecommendationItineraryDetails[];
}
export class Air_SellFromRecommendationMessageActionDetails{
  public messageFunctionDetails!:Air_SellFromRecommendationMessageActionDetailsMessageFunctionDetails;
}
export class Air_SellFromRecommendationItineraryDetails{
  public originDestinationDetails!:Air_SellFromRecommendationItineraryDetailsOriginDestinationDetails;

  public message!:Air_SellFromRecommendationItineraryDetailsMessage;

  public segmentInformation!:Air_SellFromRecommendationItineraryDetailsSegmentInformation[];
}

export class Air_SellFromRecommendationMessageActionDetailsMessageFunctionDetails{
  public messageFunction!:string;

  public additionalMessageFunction!:string;
}
export class Air_SellFromRecommendationItineraryDetailsOriginDestinationDetails{
  public origin!:string;

  public destination!:string;
}
export class Air_SellFromRecommendationItineraryDetailsMessage{
  public messageFunctionDetails!:Air_SellFromRecommendationItineraryDetailsMessageMessageFunctionDetails;
}
export class Air_SellFromRecommendationItineraryDetailsMessageMessageFunctionDetails{
  public messageFunction!:string;
}
export class Air_SellFromRecommendationItineraryDetailsSegmentInformation{
  public travelProductInformation!:Air_SellFromRecommendationItineraryDetailsSegmentInformationTravelProductInformation;

  public relatedproductInformation:Air_SellFromRecommendationItineraryDetailsSegmentInformationRelatedproductInformation;

}
export class Air_SellFromRecommendationItineraryDetailsSegmentInformationTravelProductInformation{
  public flightDate!:Air_SellFromRecommendationItineraryDetailsSegmentInformationTravelProductInformationFlightDate;

      public boardPointDetails!:Air_SellFromRecommendationItineraryDetailsSegmentInformationTravelProductInformationBoardPointDetails;

      public offpointDetails!:Air_SellFromRecommendationItineraryDetailsSegmentInformationTravelProductInformationOffpointDetails;

      public companyDetails!:Air_SellFromRecommendationItineraryDetailsSegmentInformationTravelProductInformationCompanyDetails;

      public flightIdentification!:Air_SellFromRecommendationItineraryDetailsSegmentInformationTravelProductInformationFlightIdentification;
}
export class Air_SellFromRecommendationItineraryDetailsSegmentInformationRelatedproductInformation{
  public quantity!:string;

  public statusCode!:string;
}
export class Air_SellFromRecommendationItineraryDetailsSegmentInformationTravelProductInformationCompanyDetails{
  public marketingCompany!:string;
}



export class Air_SellFromRecommendationItineraryDetailsSegmentInformationTravelProductInformationFlightDate{
      public departureDate!:string;

      public departureTime!:string;

      public arrivalDate!:string;

      public arrivalTime!:string;
}

export class Air_SellFromRecommendationItineraryDetailsSegmentInformationTravelProductInformationBoardPointDetails{
  public trueLocationId!:string;
}

export class Air_SellFromRecommendationItineraryDetailsSegmentInformationTravelProductInformationOffpointDetails{
  public trueLocationId!:string;
}
export class Air_SellFromRecommendationItineraryDetailsSegmentInformationTravelProductInformationFlightIdentification{
  public flightNumber!:string;

  public bookingClass!:string;
}

export class Air_SellFromRecommendationUIModel{
  public air_SellFromRecommendation!: Air_SellFromRecommendation;
  public selectedPcc!:string;
}

export class PNR_AddMultiElements
{

    public pnrActions!:PNR_AddMultiElementsPnrActions;

    public originDestinationDetails!:PNR_AddMultiElementsOriginDestinationDetails;

    public travellerInfo!:PNR_AddMultiElementsTravellerInfo[];

    public dataElementsMaster!:PNR_AddMultiElementsDataElementsMaster;

   // public Session session;
    public sessionDetails!:Session;

}
export class Session{
  public sessionId!:string;

  public sequenceNumber!:string;

  public securityToken!:string;

  public transactionStatusCode!:string;
}
export class PNR_AddMultiElementsPnrActions{
  public optionCode!:string;
}
export class PNR_AddMultiElementsOriginDestinationDetails{
  public originDestination!:string;

  public itineraryInfo!:PNR_AddMultiElementsOriginDestinationDetailsItineraryInfo;
}
export class PNR_AddMultiElementsTravellerInfo{
  public elementManagementPassenger!:PNR_AddMultiElementsTravellerInfoElementManagementPassenger;

  public passengerData!:PNR_AddMultiElementsTravellerInfoPassengerData[];
}
export class PNR_AddMultiElementsTravellerInfoPassengerData{
  public travellerInformation!:PNR_AddMultiElementsTravellerInfoPassengerDataTravellerInformation;

  public dateOfBirth!:PNR_AddMultiElementsTravellerInfoPassengerDataDateOfBirth;
}
export class PNR_AddMultiElementsTravellerInfoPassengerDataTravellerInformation{
  public traveller!:PNR_AddMultiElementsTravellerInfoPassengerDataTravellerInformationTraveller;
  public passenger!:PNR_AddMultiElementsTravellerInfoPassengerDataTravellerInformationPassenger;
}
export class PNR_AddMultiElementsTravellerInfoPassengerDataTravellerInformationPassenger{
  public firstName!:string;
  public type!:string;
  public infantIndicator!:string;
}
export class PNR_AddMultiElementsTravellerInfoPassengerDataTravellerInformationTraveller{
  public surname!:string;
  public quantity!:string;
}
export class PNR_AddMultiElementsTravellerInfoPassengerDataDateOfBirth{
  public dateAndTimeDetails!:PNR_AddMultiElementsTravellerInfoPassengerDataDateOfBirthDateAndTimeDetails;
}
export class PNR_AddMultiElementsTravellerInfoPassengerDataDateOfBirthDateAndTimeDetails{
  public qualifier!:string;
  public date!:string;
}


export class PNR_AddMultiElementsTravellerInfoElementManagementPassenger{
  public reference!:PNR_AddMultiElementsTravellerInfoElementManagementPassengerReference;

  public segmentName!:string;
}
export class PNR_AddMultiElementsTravellerInfoElementManagementPassengerReference{
  public qualifier!:string;

  public number!:string;
}
export class PNR_AddMultiElementsDataElementsMaster{
    
  public marker1!:string;
  public dataElementsIndiv!:PNR_AddMultiElementsDataElementsMasterDataElementsIndiv[];
}
export class PNR_AddMultiElementsOriginDestinationDetailsItineraryInfo{
  public elementManagementItinerary!:PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoElementManagementItinerary;
   public airAuxItinerary!:PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItinerary;
}
export class PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItinerary{
  public travelProduct!:PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItineraryTravelProduct;

  public messageAction!:PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItineraryMessageAction;

  public relatedProduct!:PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItineraryRelatedProduct;

  public freetextItinerary!:PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItineraryFreetextItinerary;
}
export class PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItineraryMessageAction{
  public business!:PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItineraryMessageActionBusiness;
}
export class PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItineraryRelatedProduct{
  public quantity!:string;

  public status!:string;
}
export class PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItineraryMessageActionBusiness{
  public function!:string;
}
export class PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItineraryFreetextItinerary{
  public freetextDetail!:PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItineraryFreetextItineraryFreetextDetail;

  public longFreetext!:string;
}
export class PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItineraryFreetextItineraryFreetextDetail{
  public subjectQualifier!:string;
}
export class PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoElementManagementItinerary{
  public reference!:PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoElementManagementItineraryReference;
  public segmentName!:string;
}
export class PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoElementManagementItineraryReference{
  public qualifier!:string;

  public number!:string;
}


export class PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItineraryTravelProduct{
  public product!:PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItineraryTravelProductProduct;

  public boardpointDetail!:PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItineraryTravelProductBoardpointDetail;

  public offpointDetail!:PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItineraryTravelProductOffpointDetail;

  public company!:PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItineraryTravelProductCompany;
}
export class PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItineraryTravelProductProduct{
  public depDate!:string;
}
export class PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItineraryTravelProductCompany{
  public identification!:string;
}
export class PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItineraryTravelProductBoardpointDetail{
  public cityCode!:string;
}
export class PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItineraryTravelProductOffpointDetail{
  public cityCode!:string;
}
export class PNR_AddMultiElementsDataElementsMasterDataElementsIndiv{
  public elementManagementData!:PNR_AddMultiElementsDataElementsMasterDataElementsIndivElementManagementData;

  public commission!:PNR_AddMultiElementsDataElementsMasterDataElementsIndivCommission;

  public ticketElement!:PNR_AddMultiElementsDataElementsMasterDataElementsIndivTicketElement;

  public formOfPayment!:PNR_AddMultiElementsDataElementsMasterDataElementsIndivFormOfPayment;

  public serviceRequest!:PNR_AddMultiElementsDataElementsMasterDataElementsIndivServiceRequest;

  public frequentTravellerData!:PNR_AddMultiElementsDataElementsMasterDataElementsIndivFrequentTravellerData;

  public referenceForDataElement!:PNR_AddMultiElementsDataElementsMasterDataElementsIndivReferenceForDataElement;

  public extendedRemark!:PNR_AddMultiElementsDataElementsMasterDataElementsIndivExtendedRemark;

  public miscellaneousRemark!:PNR_AddMultiElementsDataElementsMasterDataElementsIndivMiscellaneousRemark;

  public freetextData!:PNR_AddMultiElementsDataElementsMasterDataElementsIndivFreetextData;

  public seatGroup!:PNR_AddMultiElementsDataElementsMasterDataElementsIndivSeatGroup;

  public referenceForDataElement1!:PNR_AddMultiElementsDataElementsMasterDataElementsIndivReference[];
}
export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivReference{
  public qualifier!:string;

  public number!:string;
}

export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivMiscellaneousRemark{
  public remarks!:PNR_AddMultiElementsDataElementsMasterDataElementsIndivMiscellaneousRemarkRemarks;
}
export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivSeatGroup{
  public seatRequest!:PNR_AddMultiElementsDataElementsMasterDataElementsIndivSeatGroupSeatRequest;
}
export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivFreetextData{
  public freetextDetail!:PNR_AddMultiElementsDataElementsMasterDataElementsIndivFreetextDataFreetextDetail;
  public longFreetext!:string;
}
export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivSeatGroupSeatRequest{
  public special!:PNR_AddMultiElementsDataElementsMasterDataElementsIndivSeatGroupSeatRequestSpecial;
}
export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivSeatGroupSeatRequestSpecial{
  public data!:string;
}


export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivFreetextDataFreetextDetail{
  public subjectQualifier!:string;
  public type!:string;

  public companyId!:string;
}
export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivMiscellaneousRemarkRemarks{
  public type!:string;

  public category!:string;

  public freetext!:string;
}

export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivTicketElement{
  public ticket!:PNR_AddMultiElementsDataElementsMasterDataElementsIndivTicketElementTicket;
}
export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivExtendedRemark{
  public structuredRemark!:PNR_AddMultiElementsDataElementsMasterDataElementsIndivExtendedRemarkStructuredRemark;
}
export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivReferenceForDataElement{
  public reference!:PNR_AddMultiElementsDataElementsMasterDataElementsIndivReferenceForDataElementReference[];
}
export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivFrequentTravellerData{
  public frequentTraveller!:PNR_AddMultiElementsDataElementsMasterDataElementsIndivFrequentTravellerDataFrequentTraveller;
}
export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivFormOfPayment{
  public fop!:PNR_AddMultiElementsDataElementsMasterDataElementsIndivFormOfPaymentFop;
}
export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivServiceRequest{
  public ssr!:PNR_AddMultiElementsDataElementsMasterDataElementsIndivServiceRequestSsr;
}
export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivServiceRequestSsr{
  public type!:string;

  public status!:string;

  public quantity!:string;

  public companyId!:string;

  public freetext!:string;
}
export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivFormOfPaymentFop{
  public identification!:string;
}
export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivExtendedRemarkStructuredRemark{
  public type!:string;

  public freetext!:string;
}
export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivFrequentTravellerDataFrequentTraveller{
  public companyId!:string;

  public membershipNumber!:string;
}
export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivReferenceForDataElementReference{
  public qualifier!:string;

  public number!:string;
}



export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivTicketElementTicket{
  public indicator!:string;
}

export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivCommission{
  public passengerType!:string;

  public commissionInfo!:PNR_AddMultiElementsDataElementsMasterDataElementsIndivCommissionCommissionInfo;
}

export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivCommissionCommissionInfo{
  public percentage!:string;
}

export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivElementManagementData{
  public reference!:PNR_AddMultiElementsDataElementsMasterDataElementsIndivElementManagementDataReference;

  public segmentName!:string;
}

export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivElementManagementDataReference{
  public qualifier!:string;

  public number!:string;
}



//save to db

export const airArabiaSaveReqModel = {
  flightTransactions: {
    FlightTransactions_ID: 0,
    UserTrackID: "",
    BookingRefID: "",
    Company_ID: 0,
    CompBranch_ID: 0,
    Supplier_ID: 0,
    TravelType: "0",
    CabinClass: "",
    BaseOrigin: "",
    BaseDestination: "",
    Adult: 1,
    Child: 0,
    Infant: 0,
    SeatFare: 0,
    MealsFare: 0,
    BaggageFare: 0,
    OthersFare: 0,
    DepartDate: "",
    ReturnDate: "",
    CustomerProfile_ID: 0,
    AirlineCode: "",
    CRSPNR: "",
    AirlinePNR: "",
    URPNR: "QU4KR",
    BaseFare: 0,
    Taxes: 0,
    TaxInfo: [],
    Gross: 0,
    DefaultMarkup: 0,
    AdditionalMarkup: 0,
    CancelPenalty: 0,
    ChangePenalty: 0,
    TotalFare: 0,
    Status: 1,
    Remarks: "",
    BookedByUser_ID: 0,
    TransactionDate: "2023-11-14T07:11:56.903",
    InvoiceNumber: "",
    ProductID: 0,
    PAYMENTSTATUS: 0,
    CorporateCode: "",
    PNRDateTime: "2023-11-14T07:11:56.903",
    MarkupRemarks: "",
    LatestTicketingTime: "2023-11-14T00:00:00",
    LeadPaxFirstName: "",
    LeadPaxLastName: "0",
    VATKSA: 0,
    AnyBookingStatusDesc: "",
    TourCode: "",
    VAT: 0,
    MobileNo: "",
    Emailid: "",
    BACKOFFICESTATUS: 0,
    BACKOFFICEREMARKS: "",
    CouponCode: "",
    BookedOffice: "",
    IssuedOffice: "",
    Landline: "",
    RefundAmount: 0,
    CancelRemarks: "",
    ChangeRefundAmount: 0,
    ChangeRemarks: "",
    FMFare: "",
    ImportPNR: 0,
    TicketCount: 1,
    IssueDate: "2023-11-14T07:11:56.903",
    IssuedByUser_ID: 0,
    DealRevenue: 0,
    RevenueLoss: 0,
    RepriceDifference: 0,
    CCAmt: 0,
    DCAmt: 0,
    CHQAmt: 0,
    PendingAmt: 0,
    IssuedPCC: "",
    SplitPayStatus: 0,
    BookedOfficeCred: "",
    HOMDPromoCode: "",
    EarningPoints: 0,
    FOP: "CASH",
    BackOfficeINVNo: "",
    BookingPlatform: "B2C",
    BACKOFFICEREFUNDSTATUS: 0,
    BACKOFFICEREFUNDREMARKS: "",
    BACKOFFICEREFUNDINVNO: "",
    BackOfficePaymentInfo: "",
    BACKOFFICEREISSUESTATUS: 0,
    BACKOFFICEREISSUEREMARKS: "",
    BACKOFFICEREISSUEINVNO: "",
    LPONumber: "",
    BookingType: 0,
    CardNumber: "",
    CreditCardVendorCode: "",
    CardExpiryDate: "",
    SeriesCode: "",
    FOP_AMOUNT: 0,
    TicketedDate: "2023-11-14T07:11:56.903",
    CustomerSellCurrency: "",
    CustomerSellRateTotal: 390,
    ExchangeRateApplied: 1,
    DiscountAmount: 0,
    DiscountApproverUser_ID: 0,
    DiscountApprovalStatus: 1,
    TicketingApprovalStatus: 1,
    TicketingApproverUser_ID: 1,
    SelectedPccCode: "1A",
    Segments: "",
    Pax: "",
    ResponseData: "",
    CustomerProfileCode: "",
    FlightTransactionCode: "",
    FareType: "",
    CreatedDate: new Date().toISOString(),
    CreatedUser_ID: 1,
    lpoFilePath: '',
    mailDate:'',
    mailFilePath: '',
    lpoNumber: ''

  },
  flightTransactionDetails: [{}],
  flightTransactionSegmentDetails: [{}
  ],
  Mode: 1
}





// save to db request

interface IMicroServiceAirTransaction {
  TransactionID: number;
  UserID: number;
  BaseFare: number;
  TotalFare: number;
  MarkupAmt: number;
  DiscountAmt: number;
  SellingPrice: number;
  Currency: string;
  Supplier: string;
  CabinClass: string;
  BaseOrigin: string;
  BaseDestination: string;
  Adult: number;
  Child: number;
  Infant: number;
  DepartDate: string;
  ReturnDate: string;
  AirlineCode: string;
  CRSPNR: string;
  AirlinePNR: string;
  TransactionDate: string;
  LeadPaxFirstName: string;
  LeadPaxLastName: string;
  MobileNo: string;
  Emailid: string;
  ResponseData: string;
  BookingType: number;
}

interface IMicroServiceSaveToDb {
  b2BCustomerAirTransactions: IMicroServiceAirTransaction[];
  b2CUserAirTransactions: IMicroServiceAirTransaction[];
  Mode: number;
   RevalidateKey:string,
}


export const B2CUserAirTransactions: IMicroServiceSaveToDb = {
  b2BCustomerAirTransactions: [],
  b2CUserAirTransactions: [
    {
      TransactionID: 0,
      UserID: 0,
      BaseFare: 0.0,
      TotalFare: 0.0,
      MarkupAmt: 0.0,
      DiscountAmt: 0.0,
      SellingPrice: 0.0,
      Currency: "",
      Supplier: "",
      CabinClass: "",
      BaseOrigin: "",
      BaseDestination: "",
      Adult: 0,
      Child: 0,
      Infant: 0,
      DepartDate: "",
      ReturnDate: "",
      AirlineCode: "",
      CRSPNR: "",
      AirlinePNR: "",
      TransactionDate: "",
      LeadPaxFirstName: "",
      LeadPaxLastName: "",
      MobileNo: "",
      Emailid: "",
      ResponseData: "",
      BookingType: 0
    }
  ],
  Mode: 0,
   RevalidateKey: "",
};






















