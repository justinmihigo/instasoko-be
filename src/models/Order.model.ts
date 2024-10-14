import { IOrder } from "../types/order.type";
import { model, Schema } from "mongoose";

const orderSchema = new Schema<IOrder>({
    userId: {type:Schema.Types.ObjectId, ref:'User'},
    items: [{
        productId: {type: Schema.Types.ObjectId, ref:'Product'},
        quantity: {type: Number, default:1},
        price: {type: Number, default:0}
     }],
    totalAmount: {type:Number, default:0},
    status: {type:String, default:'pending'},
    shippingAddress:{type:Object, default:{}},
    paymentMethod:{type:String, default:''},
    paymentStatus: {type:String, default:'pending'},
    createdAt: {type:Date, default:new Date()},
    updatedAt: {type:Date, default:new Date()},
})

export default model<IOrder>("Order", orderSchema);