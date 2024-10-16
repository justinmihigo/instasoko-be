import mongoose, {Schema, model} from "mongoose";
import IProduct from "../types/product.type";
const productSchema= new Schema<IProduct>({
    name:{type: String, required: true},
    shopId:{type:Schema.Types.ObjectId, ref:"Shop"},
    images: {type:[String], default:[]},
    model:{type: String},
    price: {type: Number, required: true},
    discount: {type: Number, default: 0},
    availabilityCount: {type: Number, required: true},
    cartCount: {type: Number, required: true},
    color: {type:[String], required: true},
    size: {type:[String], required: true},
    weight:{type:String, required: true},
    categoryId: {type:Schema.Types.ObjectId, ref:"Category"},
})
export default model<IProduct>("Product",productSchema);