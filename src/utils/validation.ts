import { Schema } from "mongoose";
import Joi from "joi";
import { Iaddress } from "../types/user.type";

export const signupValidator=(
    user:{
    name?:string,
    image?:string, 
    uid?:string,
    email?:string,
    password?:string,
    address?:Iaddress, 
    gender?:string, 
    dob?:Date,
})=>{
    const userSchema= Joi.object({
        name: Joi.string().min(4),
        // email: Joi.string(),
        uid: Joi.string().required(),
        // image: Joi.string(),
        // password: Joi.string().min(6).required(),
        // address: Joi.object({
        //     district: Joi.string().required(),
        //     sector: Joi.string().required(),
        //     cell: Joi.string().required(),
        //     village: Joi.string().required(),
        //     houseNo: Joi.string(),
        //     zipcode: Joi.string(),
        //     postalcode: Joi.string(),
        //     street: Joi.string(),
        // }),
        // gender: Joi.string().valid('Male', 'Female', 'Other').required(),
        // dob: Joi.date().required(),
    })
    return userSchema.validate(user);
}