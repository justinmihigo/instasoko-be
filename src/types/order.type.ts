import { ObjectId } from "mongoose"
export interface IShippingAddress {
    street?: string,
    city?: string,
    state?: string,
    country?: string,
    zipCode?: string
}
export interface IOrder {
    userId: ObjectId,  // Reference to User
    items?: [
        {
            productId: ObjectId,  // Reference to Product
            shopId: ObjectId,  // Reference to Shop
            quantity: Number,
            price: Number
        }
    ],
    totalAmount: Number,
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled',
    shippingAddress?:IShippingAddress,
    paymentMethod: string,
    paymentStatus?: 'pending' | 'paid' | 'failed',
    createdAt: Date,
    updatedAt: Date
};