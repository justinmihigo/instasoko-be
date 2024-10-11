export type role= 'admin' | 'user' | 'merchant'
export interface Iaddress {
    district: string,
    sector:string,
    cell:string,
    village: string,
    houseNo?:string,
    zipcode?:string,
    postalcode?:string,
    street?: string,

};
export interface Iuser {
    email: string;
    name: string;
    password: string;
    address?:Iaddress,
    phoneNo:string,
    dob:Date,
    gender: string,
    role:string,
    createdAt:Date,
    updatedAt: Date,
}