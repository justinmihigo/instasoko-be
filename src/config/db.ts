
import { config } from 'dotenv';
import mongoose from 'mongoose';
import { MongoClient, ServerApiVersion } from "mongodb"
config();
const uri= process.env.MONGODB_URL||"";
// const password = process.env.MONGODB_PASSWORD||"";
// const fullUri= uri.replace('<db_password>',password);

const dbConnection=async ()=>{
    try {
         (await mongoose.connect(uri)).Connection;
         console.log("Connected to MongoDB");
        
        
     } catch (error) {
        console.log(error);
         console.log("Error connecting");
     }
} 
  
export default dbConnection;