import { Schema } from "mongoose";
import Joi from "joi";

export const signupValidator=(user:{name:string,email:string,password:string})=>{
    const userSchema= Joi.object({
        name: Joi.string().min(4).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    })
    return userSchema.validate(user);
}