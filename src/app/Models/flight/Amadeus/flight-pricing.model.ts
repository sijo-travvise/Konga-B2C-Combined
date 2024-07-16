export interface flightPricing {
  userid: string
  b2BCustomer_ID: string
  userType: string
  data: Data
}

 interface Data {
  type: string
  flightOffers: FlightOffer[]
}

 interface FlightOffer {
  type: string
  id: string
  source: string
  instantTicketingRequired: boolean
  nonHomogeneous: boolean
  oneWay: boolean
  lastTicketingDate: string
  numberOfBookableSeats: number
  itineraries: Itinerary[]
  price: Price
  pricingOptions: PricingOptions
  validatingAirlineCodes: string[]
  travelerPricings: TravelerPricing[]
  fareRules: FareRules
}

 interface Itinerary {
  duration: string
  segments: Segment[]
}

 interface Segment {
  departure: Departure
  arrival: Arrival
  carrierCode: string
  number: string
  aircraft: Aircraft
  operating: Operating
  duration: string
  id: string
  numberOfStops: number
  blacklistedInEU: boolean
}

 interface Departure {
  iataCode: string
  at: string
  terminal: string
}

 interface Arrival {
  iataCode: string
  terminal: string
  at: string
}

 interface Aircraft {
  code: string
}

 interface Operating {
  carrierCode: string
}

 interface Price {
  currency: string
  total: string
  base: string
  fees: Fee[]
  grandTotal: string
}

 interface Fee {
  amount: string
  type: string
}

 interface PricingOptions {
  fareType: string[]
  corporateCodes: string[]
  includedCheckedBagsOnly: boolean
}

 interface TravelerPricing {
  travelerId: string
  fareOption: string
  travelerType: string
  associatedAdultId: string
  price: Price2
  fareDetailsBySegment: FareDetailsBySegment[]
}

 interface Price2 {
  currency: string
  total: string
  base: string
}

 interface FareDetailsBySegment {
  segmentId: string
  cabin: string
  fareBasis: string
  class: string
  includedCheckedBags: IncludedCheckedBags
}

 interface IncludedCheckedBags {
  quantity: number
  weight: number
  weightUnit: string
}

 interface FareRules {
  rules: Rule[]
}

 interface Rule {
  category: string
  maxPenaltyAmount: string
  notApplicable: boolean
}


 export const FlightPricingReq:  flightPricing = {
  userid: "0",
  b2BCustomer_ID: "0",
  userType: "",
  data: {
    type: "flight-offers-pricing",
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
        itineraries: [ ],
        price: {
          currency: "string",
          total: "string",
          base: "string",
          fees: [ ],
          grandTotal: "string"
        },
        pricingOptions: {
          fareType: [
            "string"
          ],
          corporateCodes: [
            "string"
          ],
          includedCheckedBagsOnly: true
        },
        validatingAirlineCodes: [
          "string"
        ],
        travelerPricings: [
        
        ],
        fareRules: {
          rules: [
      
          ]
        }
      }
    ]
  }
}





