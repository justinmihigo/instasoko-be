import {Schema, model} from "mongoose";
import { Ishop } from "../types/shop.type";

const shopSchema=new Schema<Ishop>({
    name: {type: String},
    address: {type: Object, default:{}},
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    rating: {type: String},
    tagline: {type: String},
    description : {type: String},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()}
});
export default model("Shop",shopSchema);