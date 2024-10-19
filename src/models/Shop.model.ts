import {Schema, model} from "mongoose";
import { Ishop } from "../types/shop.type";

const shopSchema=new Schema<Ishop>({
    name: {type: String},
    category: {},
    email: {type: String, default:""},
    phone: {type:String,default:""},
    location: {type:Schema.Types.Mixed, default:{}},
    address: {type: Object, default:{}, required:false},
    images: { type: [String], default: [], required: true },
    owner: {type: String},
    rating: {type: String},
    tagline: {type: String},
    description : {type: String},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()}
});
shopSchema.index({owner:1 },{unique:true});
shopSchema.index({location:'2dsphere'})
export default model("Shop", shopSchema);