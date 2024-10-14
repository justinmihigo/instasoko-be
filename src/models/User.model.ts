import mongoose, {Types,Schema} from "mongoose";
import { Iuser, Iaddress } from "../types/user.type";
import { required } from "joi";

const userSchema=new Schema<Iuser>({
    email: {type: String},
    uid:{type: String, default:"",  unique:true, required:true},
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
export default mongoose.model("User",userSchema);
   