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
  