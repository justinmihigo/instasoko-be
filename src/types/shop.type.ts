import { ObjectId } from "mongoose";
import { Iaddress } from "./user.type";

export interface Ishop{
    name: string,
    address?: Iaddress,
    owner: ObjectId,
    category?: any,
    rating: string,
    images?: string[];
    tagline: string,
    description : string,
    createdAt: Date,
    updatedAt: Date,
}