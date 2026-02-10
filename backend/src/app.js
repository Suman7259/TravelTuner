import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({}))

app.use(express.urlencoded({extended:"true",limit:"16kb"}))

app.use(express.static("public"))

app.use(cookieParser())



//Routers
app.get("/", (req, res) => {
  res.send("TravelTuner Backend is running");
});

app.get("/health", (req, res) => {
  res.status(200).send("API running");
});

import userRouter from './routes/user.routes.js'
app.use("/api/v1/users", userRouter)

import chatRouter from "./routes/chat.routes.js";
app.use("/api/v1/chat", chatRouter);

import itineraryRouter from "./routes/itinerary.routes.js";
app.use("/api/v1/itinerary", itineraryRouter);



export {app}