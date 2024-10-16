import { ObjectId } from "mongoose";

export default interface IProduct{
    name:string,
    images?: any,
    shopId:ObjectId,
    model?:string,
    price: any,
    discount: number,
    availabilityCount: number,
    cartCount: number,
    color?: string[],
    size?: string[],
    weight: string,
    categoryId?: ObjectId,
    
}