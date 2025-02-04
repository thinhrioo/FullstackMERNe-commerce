import mongoose from "mongoose"
import dotenv from "dotenv"

if(process.env.MONGODB_URI){
    throw new Error(
        "Please  provide a Mongoose URI in the .env file"
    )
}
async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB Connected...")
    }catch(e){
        console.error("Mongodb connection error",e)
        process.exit(1)
    }
}

export default connectDB