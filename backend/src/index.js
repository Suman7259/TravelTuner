import { connectDB } from "./db/index.js";
import dotenv from "dotenv"
import { app } from "./app.js";

dotenv.config({
    path:'./.env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 5000 ,()=>{
        console.log(`server running at port ${process.env.PORT} `);
    })
})
.catch((error)=>{
    console.log("Mongo db connection failed",error)
})