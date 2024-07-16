export interface FlightOrder {
    userid: string;
    b2BCustomer_ID: string;
    userType: string;
    id: string;
    data: {
      type: string;
      flightOffers: FlightOffer[];
      travelers: Traveler[];
      remarks: {
        general: Remark[];
      };
      ticketingAgreement: {
        option: string;
        delay: string;
      };
      contacts: Contact[];
      formOfPayments: {
        other: {
          method: string;
          flightOfferIds: number[];
        };
      }[];
    };
    flightFareInstallementDetails : {} 
  }
  
  interface FlightOffer {
    type: string;
    id: string;
    source: string;
    instantTicketingRequired: boolean;
    nonHomogeneous: boolean;
    paymentCardRequired: boolean;
    lastTicketingDate: string;
    itineraries: Itinerary[];
    price: {
      currency: string;
      total: string;
      base: string;
      fees: Fee[];
    };
    pricingOptions: {
      fareType: string[];
      corporateCodes: string[];
      includedCheckedBagsOnly: boolean;
    };
    validatingAirlineCodes: string[];
    travelerPricings: TravelerPricing[];
  }
  
  interface Itinerary {
    segments: Segment[];
  }
  
  interface Segment {
    departure: {
      iataCode: string;
      terminal: string;
      at: string;
    };
    arrival: {
      iataCode: string;
      terminal: string;
      at: string;
    };
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
  }
  
  interface Fee {
    amount: string;
    type: string;
  }
  
  interface TravelerPricing {
    travelerId: string;
    fareOption: string;
    travelerType: string;
    associatedAdultId: number;
    price: {
      currency: string;
      total: string;
      base: string;
      taxes: Tax[];
    };
    fareDetailsBySegment: FareDetail[];
  }
  
  interface Tax {
    amount: string;
    code: string;
  }
  
  interface FareDetail {
    segmentId: string;
    cabin: string;
    fareBasis: string;
    brandedFare: string;
    class: string;
    includedCheckedBags: {
      quantity: number;
    };
  }
  
  interface Traveler {
    id: string;
    dateOfBirth: string;
    name: {
      firstName: string;
      middleName: string;
      lastName: string;
    };
    gender: string;
    contact: {
      emailAddress: string;
      phones: Phone[];
    };
    documents: Document[];
  }
  
  interface Document {
    documentType: string;
    issuanceDate: string;
    number: string;
    expiryDate: string;
    issuanceCountry: string;
    nationality: string;
    holder: boolean;
  }
  
  interface Phone {
    deviceType: string;
    countryCallingCode: string;
    number: string;
  }
  
  interface Contact {
    emailAddress: string;
    phones: Phone[];
  }
  
  interface Remark {
    subType: string;
    text: string;
  }
  

  export const GetOffersRequestModel : FlightOrder = {
    userid: "",
    id: "0",
    b2BCustomer_ID: "0",
    userType: "",

    data: {
       type: "flight-order",

      flightOffers: [],
      travelers: [
      ],
      remarks: {
        general: [
          {
            subType: "",
            text: ""
          }
        ]
      },
      ticketingAgreement: {
        option: "DELAY_TO_CANCEL",
        delay: "6D"
    },
      contacts: [
        {
          emailAddress: "",
          phones: [
            {
              deviceType: "",
              countryCallingCode: "",
              number: ""
            }
          ]
        }
      ],
      formOfPayments: [
        {
            other: {
                method: "CASH",
                flightOfferIds: [1]
            }
        }
    ],
    },
    flightFareInstallementDetails : {}
  }
  