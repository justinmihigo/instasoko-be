import { ObjectId } from "mongoose";
import { Iaddress } from "./user.type";

export interface Ishop{
    name: string,
    address?: Iaddress,
    phone?: string,
    email?:string,
    owner: String,
    category?: any,
    location: {lat:any, lng:any},
    rating: string,
    images?: string[];
    tagline: string,
    description : string,
    createdAt: Date,
    updatedAt: Date,
}