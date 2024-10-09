import mongoose, {Types,Schema} from "mongoose";
import { Iuser, Iaddress } from "../types/user.type";

const userSchema=new Schema<Iuser>({
    email: {type: String},
    name: {type:String},
    password: {type:String},
    address: {type:Object, default:{}},
    phoneNo: {type: String},
    dob: {type: Date},
    gender: {type: String},
    role: {type: String, default:'user'},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()}
})
export default mongoose.model("User",userSchema);
   