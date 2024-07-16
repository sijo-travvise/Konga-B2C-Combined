import { FlightInformation } from "./Fare_MasterPricerTravelBoardSearchResult";

   
    export interface UnitNumberDetail {
        numberOfUnits: string;
        typeOfUnit: string;
    }

    export interface NumberOfUnit {
        unitNumberDetail: UnitNumberDetail[];
    }

    export interface Traveller {
        ref: string;
        infantIndicator: string|undefined|null;
    }

    export interface PaxReference {
        ptc: string;
        traveller: Traveller[];
    }

    export interface PricingTickInfo {
        pricingTicketing: string[];
    }

    export interface FareOptions {
        pricingTickInfo: PricingTickInfo;
    }

    export interface RequestedSegmentRef {
        segRef: string;
    }

    export interface DeparturePoint {
        locationId: string;
    }

    export interface DepartureLocalization {
        departurePoint: DeparturePoint;
    }

    export interface ArrivalPointDetails {
        distance: string;
        distanceUnit: string;
        locationId: string;
    }

    export interface ArrivalLocalization {
        arrivalPointDetails: ArrivalPointDetails;
    }

    export interface FirstDateTimeDetail {
        date: string|undefined;
    }

    export interface TimeDetails {
        firstDateTimeDetail: FirstDateTimeDetail;
    }

    export interface Itinerary {
        requestedSegmentRef: RequestedSegmentRef;
        departureLocalization: DepartureLocalization;
        arrivalLocalization: ArrivalLocalization;
        timeDetails: TimeDetails;
        flightInfo: FlightInfo;
    }

    export class FlightInfo{
         cabinId: CabinId
         companyIdentity:CompanyIdentity;
    }

    export class CabinId{
        cabinQualifier:string;

        cabin:string;
    }

    export class CompanyIdentity{
        carrierQualifier:string;
        carrierId:string[];
    }

    export interface SearchReqUIModel{
          search:Fare_MasterPricerTravelBoardSearch;
          isCoperateFare:boolean;
    }

    export interface Fare_MasterPricerTravelBoardSearch {
        numberOfUnit: NumberOfUnit;
        paxReference: PaxReference[];
        fareOptions: FareOptions;
        itinerary: Itinerary[];
    }
