export interface DepartureArrival {
    iataCode: string;
    terminal: string;
    at: string;
  }
  
  export interface Segment {
    departure: DepartureArrival;
    arrival: DepartureArrival;
    carrierCode: string;
    number: string;
    aircraft: {
      code: string;
    };
    operating: {
      carrierCode: string;
    };
    duration: string;
    id: string;
    numberOfStops: number;
    blacklistedInEU: boolean;
  }
  
  export interface Itinerary {
    duration: string;
    segments: Segment[];
  }
  
  export interface Fee {
    amount: string;
    type: string;
  }
  
  export interface PriceData {
    currency: string;
    total: string;
    base: string;
    fees: Fee[];
    grandTotal?: string;
    modified_grandTotal?: number;
    modified_total?: number;
  }
  export interface Price {
    currency: string;
    total: string;
    base: string;
  }
  
  export interface PricingOptions {
    fareType: string[];
    includedCheckedBagsOnly: boolean;
  }
  
  export interface FareDetailBySegment {
    segmentId: string;
    cabin: string;
    fareBasis: string;
    brandedFare: string;
    class: string;
    includedCheckedBags: {
      quantity: number;
    };
  }
  
  export interface TravelerPricing {
    travelerId: string;
    fareOption: string;
    travelerType: string;
    price: Price;
    fareDetailsBySegment: FareDetailBySegment[];
  }
  
  export interface Rule {
    category: string;
    maxPenaltyAmount: string;
    notApplicable: boolean;
  }
  
  export interface FareRules {
    rules: Rule[];
  }
  
  export interface FlightOffer {
    type: string;
    id: string;
    source: string;
    instantTicketingRequired: boolean;
    nonHomogeneous: boolean;
    oneWay: boolean;
    lastTicketingDate: string;
    numberOfBookableSeats: number;
    itineraries: Itinerary[];
    price: PriceData;
    pricingOptions: PricingOptions;
    validatingAirlineCodes: string[];
    travelerPricings: TravelerPricing[];
    fareRules: FareRules;
  }
  
  export interface Payment {
    brand: string;
    binNumber: number;
    flightOfferIds: number[];
  }
  
  export interface Data {
    type: string;
    flightOffers: FlightOffer[];
    payments: Payment[];
  }
   
  export interface flightUpsell {
    userid:any,
    b2BCustomer_ID:any,
    userType:any,
    data: Data;
  }
  export const FlightUpsellReqData :flightUpsell = 	{
    data: {
      type: "flight-offers-upselling",
      flightOffers: [
        {
          type: "string",
          id: "string",
          source: "string",
          instantTicketingRequired: true,
          nonHomogeneous: true,
          oneWay: true,
          lastTicketingDate: "string",
          numberOfBookableSeats: 0,
          itineraries: [],
          price: {
            currency: "string",
            total: "string",
            base: "string",
            fees: [],
            grandTotal: "string",
            modified_grandTotal: 0,
            modified_total: 0
          },
          pricingOptions: {
            fareType: ["string"],
            includedCheckedBagsOnly: true
          },
          validatingAirlineCodes: ["string"],
          travelerPricings: [],
          fareRules: {
            rules: []
          }
        }
      ],
      payments: []
    },
    userid: undefined,
    b2BCustomer_ID: undefined,
    userType: undefined
  }
  

  
  