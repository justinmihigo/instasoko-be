import mongoose, {Types,Schema} from "mongoose";
import { Iuser } from "../types/user";

const userSchema=new Schema<Iuser>({
    email: {type: String},
    name: {type:String},
    password: {type:String},
})
export default mongoose.model("User",userSchema);
   