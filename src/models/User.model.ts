import mongoose, {Types,Schema} from "mongoose";
import { Iuser, Iaddress } from "../types/user.type";

const userSchema=new Schema<Iuser>({
    email: {type: String},
    uid:{type: String, default:"",  unique:true, required:true, index:true},
    name: {type:String},
    password: {type:String},
    image:{type:String, default:""},
    address: {type:Object, default:{}},
    phoneNo: {type: String},
    dob: {type: Date},
    gender: {type: String},
    role: {type: String, default:'user'},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()}
})
userSchema.index({uid:1},{unique:true});
export default mongoose.model("User",userSchema);
   