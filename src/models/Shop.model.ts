import {Schema, model} from "mongoose";
import { Ishop } from "../types/shop.type";
import { any, required } from "joi";

const shopSchema=new Schema<Ishop>({
    name: {type: String},
    address: {type: Object, default:{}, required:false},
    images: { type: [String], default: [], required: true },
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    rating: {type: String},
    tagline: {type: String},
    description : {type: String},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()}
});
export default model("Shop",shopSchema);