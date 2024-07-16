export interface IPassengerList {
    passengerType?: string,
    passengerAgeLimit?: string,
    count?: number,
}

export interface ICabinList {
    name?: string,
    value?: string,
    subValue?: string
}

export const PassengerList :IPassengerList[]= [{
    passengerType: 'Adult',
    passengerAgeLimit: 'Above 12 Years',
    count:1
},
{
    passengerType: 'Child',
    passengerAgeLimit: '2 - 12 Years',
    count:0
},
{
    passengerType: 'Infant',
    passengerAgeLimit: 'Less Than 2 Years',
    count:0
}]


export const CabinList :ICabinList[]= [
    {name: 'Economy', value: '0', subValue : 'ECONOMY'  },
    {name: 'Business', value: '1' , subValue : 'BUSINESS' },
    {name: 'First Class', value:'2' , subValue : 'FIRST' },
    {name: 'Premium Economy', value: '4'  , subValue : 'PREMIUM_ECONOMY' },
    {name: 'Premium First', value: '5' , subValue : 'PREMIUM_FIRST' }
]

export interface ICommonResultModel {
     id: string,
     fare: string,
     supplier: string,
     offer: any,
     optionheaderIndex: number,
}

