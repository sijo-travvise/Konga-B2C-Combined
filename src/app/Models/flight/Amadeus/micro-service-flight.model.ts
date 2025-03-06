export interface FlightSearchRequest {
    device: string;
    from: string;
    to: string;
    depDate: string;
    returnDate: string;
    adt: number;
    chd: number;
    inf: number;
    cls: string;
    aff: string;
    pwd: string;
    currency: string;
    language: string;
    cn: string;
    source: string;
    isDirectSearch: boolean;
    airlinePreference: string;
    isSearchFlexible: boolean;
    UtmSource: string;
    UtmMedium: string;
    Suppliers: string;
  }

  export interface FlightSearchRequestModel {
    NumberOfAdults: number
    NumberOfChildren: number
    NumberOfInfants: number
    CustomerUser_ID: number
    SelectedCurrency: string
    Source: string
    Suppliers: string
    TypeOfTrip: number
    SearchSegments: SearchSegment[],
    ApplicationConfig:ApplicationConfig
  }

  export interface SearchSegment {
    Origin: string
    Destination: string
    DepartureDate: any
    FlightClass: number | undefined
    BoundType: number | undefined,
    AirlinePreference: Array<string>
    //#region BoundType
    // INBOUND = 10,
    // OUTBOUND = 20,
    // PUREBOUND = 30,
    // PUREOUTBOUND = 40,
    // PUREINBOUND = 50
    //#endregion
  }

  export interface ApplicationConfig {
    fareType:number,
    CustomerProfileId :number
  }
  
  export const FlightSearch: FlightSearchRequestModel = {
    NumberOfAdults: 0,
    NumberOfChildren: 0,
    NumberOfInfants: 0,
    CustomerUser_ID: 0,
    SelectedCurrency: "",
    Source: "API",
    Suppliers: "",
    TypeOfTrip: 0,
    SearchSegments: [],
    ApplicationConfig: {
        fareType: 0,
        CustomerProfileId: 0
    }
}
  

export interface SearchSegment {
  Origin: string
  Destination: string
  DepartureDate: any
  FlightClass: number | undefined
  BoundType: number | undefined,
  AirlinePreference: Array<string>
  //#region BoundType
  // INBOUND = 10,
  // OUTBOUND = 20,
  // PUREBOUND = 30,
  // PUREOUTBOUND = 40,
  // PUREINBOUND = 50
  //#endregion
}