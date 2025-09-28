import mongoose from "mongoose"
import { DB_NAME } from "../constant.js"

const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MongoDB connected :${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("some error occured",error)
        process.exit(1)
    }
}

export {connectDB}