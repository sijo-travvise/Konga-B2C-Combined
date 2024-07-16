export interface fare_MasterPricerTravelBoardSearchResult {
    replyStatus: ReplyStatus;
    conversionRate: ConversionRate;
    companyIdText?: null;
    flightIndex?: (FlightIndexEntity)[] | null;
    recommendation?: (RecommendationEntity)[] | null;
    serviceFeesGrp: ServiceFeesGrp;
  }
  export interface ReplyStatus {
    status: Status;
  }
  export interface Status {
    advisoryTypeInfo: string;
  }
  export interface ConversionRate {
    conversionRateDetail: ConversionRateDetail;
  }
  export interface ConversionRateDetail {
    currency: string;
  }
  export interface FlightIndexEntity {
    requestedSegmentRef: RequestedSegmentRefOrSegmentRef;
    groupOfFlights?: (GroupOfFlightsEntity)[] | null;
  }
  export interface RequestedSegmentRefOrSegmentRef {
    segRef: string;
  }
  export interface GroupOfFlightsEntity {
    propFlightGrDetail: PropFlightGrDetail;
    flightDetails?: (FlightDetailsEntity)[] | null;
  }
  export interface PropFlightGrDetail {
    flightProposal?: (FlightProposalEntity)[] | null;
  }
  export interface FlightProposalEntity {
    ref: string;
    unitQualifier?: string | null;
  }
  export interface FlightDetailsEntity {
    flightInformation: FlightInformation;
    commercialAgreement?: null;
  }
  export interface FlightInformation {
    productDateTime: ProductDateTime;
    location?: (LocationEntity)[] | null;
    companyId: CompanyId;
    flightOrtrainNumber: string;
    productDetail: ProductDetail;
    addProductDetail: AddProductDetail;
  }
  export interface ProductDateTime {
    dateOfDeparture: string;
    timeOfDeparture: string;
    dateOfArrival: string;
    timeOfArrival: string;
    dateVariation?: null;
    dateVariationSpecified: boolean;
  }
  export interface LocationEntity {
    locationId: string;
    terminal?: string | null;
    terminalSpecified: boolean;
  }
  export interface CompanyId {
    marketingCarrier: string;
    operatingCarrier: string;
  }
  export interface ProductDetail {
    equipmentType: string;
  }
  export interface AddProductDetail {
    electronicTicketing: string;
    productDetailQualifier: string;
  }
  export interface RecommendationEntity {
    itemNumber: ItemNumber;
    recPriceInfo: RecPriceInfo;
    segmentFlightRef?: (SegmentFlightRefEntity)[] | null;
    paxFareProduct: PaxFareProduct;
  }
  export interface ItemNumber {
    itemNumberId: ItemNumberIdOrItemNumberOrItemNumberDetails;
  }
  export interface ItemNumberIdOrItemNumberOrItemNumberDetails {
    number: string;
  }
  export interface RecPriceInfo {
    monetaryDetail?: (MonetaryDetailEntity)[] | null;
  }
  export interface MonetaryDetailEntity {
    amount: number;
  }
  export interface SegmentFlightRefEntity {
    referencingDetail?: (ReferencingDetailEntityOrReferencingDetail)[] | null;
  }
  export interface ReferencingDetailEntityOrReferencingDetail {
    refQualifier: string;
    refNumber: string;
  }
  export interface PaxFareProduct {
    paxFareDetail: PaxFareDetail;
    paxReference: PaxReference;
    fare?: (FareEntity)[] | null;
    fareDetails?: (FareDetailsEntity)[] | null;
  }
  export interface PaxFareDetail {
    paxFareNum: string;
    totalFareAmount: number;
    totalTaxAmount: number;
    codeShareDetails?: (CodeShareDetailsEntity)[] | null;
    pricingTicketing?: (string)[] | null;
  }
  export interface CodeShareDetailsEntity {
    transportStageQualifier?: string | null;
    company: string;
  }
  export interface PaxReference {
    ptc: string;
    traveller: Traveller;
  }
  export interface Traveller {
    ref: string;
  }
  export interface FareEntity {
    pricingMessage: PricingMessage;
    monetaryInformation?: MonetaryInformation | null;
  }
  export interface PricingMessage {
    freeTextQualification: FreeTextQualification;
    description?: (string)[] | null;
  }
  export interface FreeTextQualification {
    textSubjectQualifier: string;
    informationType: string;
  }
  export interface MonetaryInformation {
    monetaryDetail: MonetaryDetail;
  }
  export interface MonetaryDetail {
    amountType: string;
    amount: number;
    currency: string;
  }
  export interface FareDetailsEntity {
    segmentRef: RequestedSegmentRefOrSegmentRef;
    groupOfFares?: (GroupOfFaresEntity)[] | null;
    majCabin: MajCabin;
  }
  export interface GroupOfFaresEntity {
    productInformation: ProductInformation;
  }
  export interface ProductInformation {
    cabinProduct: CabinProduct;
    fareProductDetail: FareProductDetail;
    breakPoint: string;
  }
  export interface CabinProduct {
    rbd: string;
    cabin: string;
    avlStatus: string;
  }
  export interface FareProductDetail {
    fareBasis: string;
    passengerType: string;
  }
  export interface MajCabin {
    bookingClassDetails: BookingClassDetails;
  }
  export interface BookingClassDetails {
    designator: string;
  }
  export interface ServiceFeesGrp {
    serviceTypeInfo: ServiceTypeInfo;
    serviceCoverageInfoGrp?: (ServiceCoverageInfoGrpEntity)[] | null;
    globalMessageMarker: GlobalMessageMarker;
    freeBagAllowanceGrp?: (FreeBagAllowanceGrpEntity)[] | null;
  }
  export interface ServiceTypeInfo {
    carrierFeeDetails: CarrierFeeDetails;
  }
  export interface CarrierFeeDetails {
    type: string;
  }
  export interface ServiceCoverageInfoGrpEntity {
    itemNumberInfo: ItemNumberInfo;
    serviceCovInfoGrp?: (ServiceCovInfoGrpEntity)[] | null;
  }
  export interface ItemNumberInfo {
    itemNumber: ItemNumberIdOrItemNumberOrItemNumberDetails;
  }
  export interface ServiceCovInfoGrpEntity {
    paxRefInfo: PaxRefInfo;
    coveragePerFlightsInfo?: (CoveragePerFlightsInfoEntity)[] | null;
    refInfo: RefInfo;
  }
  export interface PaxRefInfo {
    travellerDetails: TravellerDetails;
  }
  export interface TravellerDetails {
    referenceNumber: string;
  }
  export interface CoveragePerFlightsInfoEntity {
    numberOfItemsDetails: NumberOfItemsDetails;
    lastItemsDetails?: (LastItemsDetailsEntity)[] | null;
  }
  export interface NumberOfItemsDetails {
    referenceQualifier: string;
    refNum: string;
  }
  export interface LastItemsDetailsEntity {
    refOfLeg: string;
  }
  export interface RefInfo {
    referencingDetail: ReferencingDetailEntityOrReferencingDetail;
  }
  export interface GlobalMessageMarker {
  }
  export interface FreeBagAllowanceGrpEntity {
    freeBagAllownceInfo: FreeBagAllownceInfo;
    itemNumberInfo: ItemNumberInfo1;
  }
  export interface FreeBagAllownceInfo {
    baggageDetails: BaggageDetails;
  }
  export interface BaggageDetails {
    freeAllowance: string;
    quantityCode: string;
    unitQualifier?: string | null;
  }
  export interface ItemNumberInfo1 {
    itemNumberDetails: ItemNumberIdOrItemNumberOrItemNumberDetails;
  }
  