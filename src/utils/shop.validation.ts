import Joi from "joi";
import { Iaddress, Iuser } from "../types/user.type";

const shopValidator=(
    shop:{
        name:string,
        address:Iaddress
        owner:string,
        rating?:string,
        tagline?:string,
        description?:string,
    }
)=>{
   const shopSchema= Joi.object({
        name: Joi.string().min(10).required(),
        address: Joi.object({
            district: Joi.string().required(), 
            sector: Joi.string(), // not required
            cell: Joi.string(), // not required
            village: Joi.string(), // not required
            houseNo: Joi.string(),
            zipcode: Joi.string(),
            postalcode: Joi.string(),
            street: Joi.string(),
        }),
        owner: Joi.required(),
        rating: Joi.string(),
        tagline: Joi.string(),
        description : Joi.string(),
    })
    return shopSchema.validate(shop);
}
export default shopValidator;
