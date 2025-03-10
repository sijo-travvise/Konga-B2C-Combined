import { SearchReqUIModel } from "src/app/Models/flight/Amadeus/Fare_MasterPricerTravelBoardSearch"


// import { BookingDeliveryInfo, BookingTravelerAddress, BookingTravelerPhoneNumber } from "../1g/AirCreateReservationReqUIModel";
export class PNRAddMultiElementsUIModel{
    public addMultielements!:PNR_AddMultiElements
    public user!:any
    public searchreqModel!:SearchReqUIModel
    public markupIndex:string
    public selectedCurrency!:string
    public exchangeRate!:number
    public customerSellRate!: number
    public selectedPcc!:string
    
    public discountType: String | undefined;
    public approvedDiscount: number | undefined;
    public discountApproverUser_ID: String | undefined;
    
    public discountApprovalEmailTemplate: String | undefined;
    public ticketingApprovalEmailTemplate: String | undefined;
    public bookingTraveler: BookingTravellerDetails[];
}

export class BookingTravellerDetails
{
    public discountAmount!:number;
    public discountPercentage!:number;
    public passengerType:string;
    public prefix:string;
    public firstName:string;
    public lastName:string;
    public markup:number;
    public additionalmarkup: number
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

export class PNR_AddMultiElementsDataElementsMaster{
    
    public marker1!:string;
    public dataElementsIndiv!:PNR_AddMultiElementsDataElementsMasterDataElementsIndiv[];
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

export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivSeatGroup{
    public seatRequest!:PNR_AddMultiElementsDataElementsMasterDataElementsIndivSeatGroupSeatRequest;
}

export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivSeatGroupSeatRequest{
    public special!:PNR_AddMultiElementsDataElementsMasterDataElementsIndivSeatGroupSeatRequestSpecial;
}

export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivSeatGroupSeatRequestSpecial{
    public data!:string;
}

export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivFreetextData{
    public freetextDetail!:PNR_AddMultiElementsDataElementsMasterDataElementsIndivFreetextDataFreetextDetail;
    public longFreetext!:string;
}

export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivFreetextDataFreetextDetail{
    public subjectQualifier!:string;
    public type!:string;

    public companyId!:string;
}

export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivMiscellaneousRemark{
    public remarks!:PNR_AddMultiElementsDataElementsMasterDataElementsIndivMiscellaneousRemarkRemarks;
}

export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivMiscellaneousRemarkRemarks{
    public type!:string;

    public category!:string;

    public freetext!:string;
}

export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivExtendedRemark{
    public structuredRemark!:PNR_AddMultiElementsDataElementsMasterDataElementsIndivExtendedRemarkStructuredRemark;
}

export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivExtendedRemarkStructuredRemark{
        public type!:string;

        public freetext!:string;
}

export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivReferenceForDataElement{
    public reference!:PNR_AddMultiElementsDataElementsMasterDataElementsIndivReferenceForDataElementReference[];
}

export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivReferenceForDataElementReference{
    public qualifier!:string;

    public number!:string;
}

export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivFrequentTravellerData{
    public frequentTraveller!:PNR_AddMultiElementsDataElementsMasterDataElementsIndivFrequentTravellerDataFrequentTraveller;
}

export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivFrequentTravellerDataFrequentTraveller{
    public companyId!:string;

    public membershipNumber!:string;
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

export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivFormOfPayment{
    public fop!:PNR_AddMultiElementsDataElementsMasterDataElementsIndivFormOfPaymentFop;
}

export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivFormOfPaymentFop{
    public identification!:string;
}

export class PNR_AddMultiElementsDataElementsMasterDataElementsIndivTicketElement{
    public ticket!:PNR_AddMultiElementsDataElementsMasterDataElementsIndivTicketElementTicket;
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

export class PNR_AddMultiElementsOriginDestinationDetails{
    public originDestination!:string;

    public itineraryInfo!:PNR_AddMultiElementsOriginDestinationDetailsItineraryInfo;
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

export class PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItineraryFreetextItinerary{
        public freetextDetail!:PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItineraryFreetextItineraryFreetextDetail;

        public longFreetext!:string;
}

export class PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItineraryFreetextItineraryFreetextDetail{
    public subjectQualifier!:string;
}

export class PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItineraryRelatedProduct{
    public quantity!:string;

    public status!:string;
}

export class PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItineraryMessageAction{
    public business!:PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItineraryMessageActionBusiness;
}

export class PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItineraryMessageActionBusiness{
    public function!:string;
}

export class PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItineraryTravelProduct{
        public product!:PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItineraryTravelProductProduct;

        public boardpointDetail!:PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItineraryTravelProductBoardpointDetail;

        public offpointDetail!:PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItineraryTravelProductOffpointDetail;

        public company!:PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItineraryTravelProductCompany;
}

export class PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItineraryTravelProductCompany{
    public identification!:string;
}

export class PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItineraryTravelProductOffpointDetail{
    public cityCode!:string;
}

export class PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItineraryTravelProductBoardpointDetail{
    public cityCode!:string;
}

export class PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoAirAuxItineraryTravelProductProduct{
    public depDate!:string;
}

export class PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoElementManagementItinerary{
    public reference!:PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoElementManagementItineraryReference;
    public segmentName!:string;
}

export class PNR_AddMultiElementsOriginDestinationDetailsItineraryInfoElementManagementItineraryReference{
        public qualifier!:string;

        public number!:string;
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

export class PNR_AddMultiElementsTravellerInfo{
        public elementManagementPassenger!:PNR_AddMultiElementsTravellerInfoElementManagementPassenger;

        public passengerData!:PNR_AddMultiElementsTravellerInfoPassengerData[];
}

export class PNR_AddMultiElementsTravellerInfoElementManagementPassenger{
    public reference!:PNR_AddMultiElementsTravellerInfoElementManagementPassengerReference;

    public segmentName!:string;
}

export class PNR_AddMultiElementsTravellerInfoElementManagementPassengerReference{
        public qualifier!:string;

        public number!:string;
}

export class PNR_AddMultiElementsTravellerInfoPassengerData{
    public travellerInformation!:PNR_AddMultiElementsTravellerInfoPassengerDataTravellerInformation;

    public dateOfBirth!:PNR_AddMultiElementsTravellerInfoPassengerDataDateOfBirth;
}

export class PNR_AddMultiElementsTravellerInfoPassengerDataTravellerInformation{
        public traveller!:PNR_AddMultiElementsTravellerInfoPassengerDataTravellerInformationTraveller;
        public passenger!:PNR_AddMultiElementsTravellerInfoPassengerDataTravellerInformationPassenger;
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

export class PNR_AddMultiElementsTravellerInfoPassengerDataTravellerInformationPassenger{
        public firstName!:string;
        public type!:string;
        public infantIndicator!:string;
}


export class AllPassengerDetailsList{
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

export class BookingTravelerPhoneNumber
{
    public countryCode!:string;
    public areaCode!:string;
    public number!:string;
}

export class BookingDeliveryInfo{
    public shippingAddress!: BookingShippingAddress;
}

export class BookingShippingAddress{
    public street!:string;
    public city!:string;
    public state!:string;
    public postalCode!:string;
    public country!:string;
    //public _key!:string;
}

/// <remarks/>
export class BookingTravelerAddress
{
    public addressName!:string;
    public street!:string;
    public city!:string;
    public state!:string;
    public postalCode!:string;
    public country!:string;
}