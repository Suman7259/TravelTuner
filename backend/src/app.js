import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"}))

app.use(express.urlencoded({extended:"true",limit:"16kb"}))

app.use(express.static("public"))

app.use(cookieParser())


//Routers
import userRouter from './routes/user.routes.js'
app.use("/api/v1/users", userRouter)

import chatRouter from "./routes/chat.routes.js";
app.use("/api/v1/chat", chatRouter);

import auth0Router from "./routes/auth0.routes.js";
app.use("/api/v1/auth0", auth0Router);

export {app}