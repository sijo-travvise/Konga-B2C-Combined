export class User {
    id: number;
    customerUser_ID: number;
    empRole_ID: number;
    customerProfile_ID: number;
    username: string;
    emailid: string;
    email: string;
    mobileNumber: string;
    password: string;
    firstName: string;
    lastName: string;
    token?: string;
    companyName?: string;
    privilages?: Privilages;
    selectedCustomer?: any;
    associatedCustomer?: CustomerProfileModel;
    userRole?: EmpRoleUIModel;
    businessType?: string;
    custUserManagement?: CustUserManagement;
    distributionChannel?:string;
    customerBalance?:string;
    branchList?: branchList[];
    selectedBranch?: branchList| null
    customerType:number;
    otp:any;
    IPAddress:any;
    latitude:any;
    longitude:any;
    _2FAEnabled:boolean;
    location?:any;
}

export interface Privilages {
    flightService: any[]
    hotelService: any[]
    insuranceServices: any[]
}

export interface branchList {
    name: string;
    value: number;
    code: string;
}

export class EmpRoleUIModel{
    empRoleName: string;
    description: string;
    public permissions: any[]|undefined;
    empRole_ID: number;
    distributionChannel?:string;
    createdUser_ID: number | null;
    modifiedUser_ID: number | null;
    customerProfile_ID: number | null;
}


export class CustomerProfileModel
{
    public primaryCurrency: string="";
    public Reg_CompanyName: string="";
    public CustomerType: string="";
    public AccountCode: string="";
    public PaymentMethod:string="";
    public QBIZNumber: string="";
    public CustomerCategory: string="";
    public CommercialReg_Num: string="";   
    public CommercialReg_Expiry: Date | undefined;
    public FilePath: string="";
    public Address: string="";
    public City: string="";
    public Country_ID: number=0;
    public POBox: string="";
    public LandlineNum: string="";
    public CreatedUser: number=0;
    public ModifiedUser: number=0;
    public ActiveStatus: number=0;
    public PrimaryContactName: string="";
    public PrimaryContactMob: string="";
    public PrimaryContactEmail: number=0;
    public AlternativeContactName: number=0;
    public AlternativeContactMob: string="";
    public AlternativeContactEmail: string="";
    public FinanceContactName: string="";
    public FinanceContactMob: string="";
    public FinanceContactEmail: string="";
    public ilePath: string="";
    public logoURL: string="";
    public businessContactNo :string="";
    public country: string="";
    public regCompanyName: string="";
    public address: string="";
    public customerProfile_ID:number;
}
export class CustUserManagement {
    reportingTo_UserID: number;
    reportingTo: String;
    salesTarget: String;
    discountApprover_UserID: String;
    salesManagerUser_ID: String;
    discountApprover: String;
    discountType: String;
    approvedDiscount: String;
    distributionChannels: String;
}

export interface AuthTokens {
    accessToken: string;
    accessTokenExpiration: string;
}