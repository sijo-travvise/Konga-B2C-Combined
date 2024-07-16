export interface amadeusRequestModel {
    userid: string;
    b2BCustomer_ID: string;
    userType: string;
    currencyCode: string;
    originDestinations?: (OriginDestinationsEntity)[] | null;
    travelers?: (TravelersEntity)[] | null;
    sources?: (string)[] | null;
    searchCriteria: SearchCriteria;
  }
   interface OriginDestinationsEntity {
    id: string;
    originLocationCode: string;
    destinationLocationCode: string;
    departureDateTimeRange: DepartureDateTimeRange;
  }
   interface DepartureDateTimeRange {
    date: string;
  }
   interface TravelersEntity {
    id: string;
    travelerType: string;
    fareOptions?: (string)[] | null;
    associatedAdultId?: number | string;
  }
   interface SearchCriteria {
    maxFlightOffers: number;
    additionalInformation: AdditionalInformation;
    pricingOptions: PricingOptions;
    flightFilters: FlightFilters;
  }
   interface AdditionalInformation {
    chargeableCheckedBags: boolean;
    brandedFares: boolean;
    fareRule: boolean;
  }
   interface PricingOptions {
    fareType?: (string)[] | null;
    corporateCodes?: (string)[] | null;
    includedCheckedBagsOnly: boolean;
  }
   interface FlightFilters {
    cabinRestrictions?: (CabinRestrictionsEntity)[] | null;
    carrierRestrictions: CarrierRestrictions | undefined;
  }
   interface CabinRestrictionsEntity {
    cabin: string;
    originDestinationIds?: (string)[] | null;
  }
   interface CarrierRestrictions {
    includedCarrierCodes?: (string)[] | null;
    excludedCarrierCodes?: (string)[] | null;
  }
  

  export const amadeusRequestModelObject : amadeusRequestModel  =  {
    userid: "0",
    b2BCustomer_ID: "0",
    userType: "",
    currencyCode: "NGN",
    originDestinations: [],
    travelers: [],
    sources: ["GDS"],
    searchCriteria: {
      maxFlightOffers: 250,
      additionalInformation: {
        chargeableCheckedBags: true,
        brandedFares: true,
        fareRule: true
      },
      pricingOptions: {
        fareType: ["PUBLISHED","NEGOTIATED"],
        corporateCodes: ["string"],
        includedCheckedBagsOnly: true
      },
      flightFilters: {
        cabinRestrictions: [
          {
            cabin: "ECONOMY",
            originDestinationIds: []
          }
        ],
        carrierRestrictions: undefined
      }
    }
  };
