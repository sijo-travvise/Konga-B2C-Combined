export class Fare_PriceUpsellWithoutPNRUIModel{
    public Fare_PriceUpsellWithoutPNR!:Fare_PriceUpsellWithoutPNR;
    public selectedCustomer!:string;
    public selectedPcc!:string;
}

export class Fare_PriceUpsellWithoutPNR{
    public passengersGroup!:Fare_PriceUpsellWithoutPNRPassengersGroup[];

    public segmentGroup!:Fare_PriceUpsellWithoutPNRSegmentGroup[];

    public pricingOptionGroup!:Fare_PriceUpsellWithoutPNRPricingOptionGroup;
}

export class Fare_PriceUpsellWithoutPNRPassengersGroup{
    public segmentRepetitionControl!:Fare_PriceUpsellWithoutPNRPassengersGroupSegmentRepetitionControl;

    public travellersID!:Fare_PriceUpsellWithoutPNRPassengersGroupTravellersID[];

    public discountPtc!:Fare_PriceUpsellWithoutPNRPassengersGroupDiscountPtc;

}

export class Fare_PriceUpsellWithoutPNRPassengersGroupTravellersID{
    public measurementValue!:string;
   // public  travellerDetails!:Fare_PriceUpsellWithoutPNRPassengersGroupTravellersIDTravellerDetails[];
}

// export class Fare_PriceUpsellWithoutPNRPassengersGroupTravellersIDTravellerDetails{
//     public measurementValue!:string;
// }

export class Fare_PriceUpsellWithoutPNRPassengersGroupDiscountPtc{
    public valueQualifier!:string;
    public fareDetails!:Fare_PriceUpsellWithoutPNRPassengersGroupDiscountPtcFareDetails;
}

export class Fare_PriceUpsellWithoutPNRPassengersGroupDiscountPtcFareDetails{
    public qualifier!:string;
}

export class Fare_PriceUpsellWithoutPNRPassengersGroupSegmentRepetitionControl{
    public segmentControlDetails!:Fare_PriceUpsellWithoutPNRPassengersGroupSegmentRepetitionControlSegmentControlDetails;
}

export class Fare_PriceUpsellWithoutPNRPassengersGroupSegmentRepetitionControlSegmentControlDetails{
    public quantity!:string;

    public numberOfUnits!:string;
}

export class Fare_PriceUpsellWithoutPNRSegmentGroup{
    public segmentInformation!:Fare_PriceUpsellWithoutPNRSegmentGroupSegmentInformation;
}

export class Fare_PriceUpsellWithoutPNRSegmentGroupSegmentInformation{
    public flightDate!:Fare_PriceUpsellWithoutPNRSegmentGroupSegmentInformationFlightDate;

    public boardPointDetails!:Fare_PriceUpsellWithoutPNRSegmentGroupSegmentInformationBoardPointDetails;

    public offpointDetails!:Fare_PriceUpsellWithoutPNRSegmentGroupSegmentInformationOffpointDetails;

    public companyDetails!:Fare_PriceUpsellWithoutPNRSegmentGroupSegmentInformationCompanyDetails;

    public flightIdentification!:Fare_PriceUpsellWithoutPNRSegmentGroupSegmentInformationFlightIdentification;

    public flightTypeDetails!:Fare_PriceUpsellWithoutPNRSegmentGroupSegmentInformationFlightTypeDetails;

    public itemNumber!:string;
}

export class Fare_PriceUpsellWithoutPNRSegmentGroupSegmentInformationFlightTypeDetails{
    public flightIndicator!:string;
}

export class Fare_PriceUpsellWithoutPNRSegmentGroupSegmentInformationFlightIdentification{
        public flightNumber!:string;

        public bookingClass!:string;
}

export class Fare_PriceUpsellWithoutPNRSegmentGroupSegmentInformationCompanyDetails{
    public marketingCompany!:string;

    public operatingCompany!:string;
}

export class Fare_PriceUpsellWithoutPNRSegmentGroupSegmentInformationOffpointDetails{
    public trueLocationId!:string;
}

export class Fare_PriceUpsellWithoutPNRSegmentGroupSegmentInformationBoardPointDetails{
    public trueLocationId!:string;
}

export class Fare_PriceUpsellWithoutPNRSegmentGroupSegmentInformationFlightDate{
        public departureDate!:string;

        public departureTime!:string;

        public arrivalDate!:string;

        public arrivalTime!:string;
}

export class Fare_PriceUpsellWithoutPNRPricingOptionGroup{
    public pricingOptionKey!:Fare_PriceUpsellWithoutPNRPricingOptionGroupPricingOptionKey;

    public optionDetail!:Fare_PriceUpsellWithoutPNRPricingOptionGroupOptionDetail;
}

export class Fare_PriceUpsellWithoutPNRPricingOptionGroupPricingOptionKey{
    public pricingOptionKey!:string;
}

export class Fare_PriceUpsellWithoutPNRPricingOptionGroupOptionDetail{
    public criteriaDetails!:Fare_PriceUpsellWithoutPNRPricingOptionGroupOptionDetailCriteriaDetails;
}

export class Fare_PriceUpsellWithoutPNRPricingOptionGroupOptionDetailCriteriaDetails{
    public attributeType!:string;
}