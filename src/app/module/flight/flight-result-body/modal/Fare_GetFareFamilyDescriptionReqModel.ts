export class Fare_GetFareFamilyDescriptionUIModel{
    public fare_GetFareFamilyDescription!:Fare_GetFareFamilyDescription;
    public selectedPcc!: string;
}

export class Fare_GetFareFamilyDescription{

    public bookingDateInformation!:Fare_GetFareFamilyDescriptionBookingDateInformation;

    public standaloneDescriptionRequest!:Fare_GetFareFamilyDescriptionStandaloneDescriptionRequest[];
    public session!:Session;
    public sessionDetails!: Session;
    public selectedPcc!: string;
}

export class Fare_GetFareFamilyDescriptionBookingDateInformation{
    public dateTime!:Fare_GetFareFamilyDescriptionBookingDateInformationDateTime;
}

export  class Fare_GetFareFamilyDescriptionBookingDateInformationDateTime
{
     public year!:string;

    public month!:string;

    public day!:string; 
}

export class Fare_GetFareFamilyDescriptionStandaloneDescriptionRequest{
    public fareInformation!:Fare_GetFareFamilyDescriptionStandaloneDescriptionRequestFareInformation;

    public itineraryInformation!:Fare_GetFareFamilyDescriptionStandaloneDescriptionRequestItineraryInformation;

    public carrierInformation!:Fare_GetFareFamilyDescriptionStandaloneDescriptionRequestCarrierInformation;
}

export class Fare_GetFareFamilyDescriptionStandaloneDescriptionRequestFareInformation{
    public discountDetails!:Fare_GetFareFamilyDescriptionStandaloneDescriptionRequestFareInformationDiscountDetails;
}

export class Fare_GetFareFamilyDescriptionStandaloneDescriptionRequestFareInformationDiscountDetails{
    public fareQualifier!:string;

    public rateCategory!:string;
}

export class Fare_GetFareFamilyDescriptionStandaloneDescriptionRequestItineraryInformation{
    public origin!:string;

    public destination!:string;
}

export class Fare_GetFareFamilyDescriptionStandaloneDescriptionRequestCarrierInformation{
    public companyIdentification!:Fare_GetFareFamilyDescriptionStandaloneDescriptionRequestCarrierInformationCompanyIdentification;
}

export class Fare_GetFareFamilyDescriptionStandaloneDescriptionRequestCarrierInformationCompanyIdentification{
    public otherCompany!:string;
}

export class Session{
    public sessionId!:string;

    public sequenceNumber!:string;

    public securityToken!:string;

    public transactionStatusCode!:string;
}