import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"
import { connectToDb } from "./db/connectDb.js"
import cookieParser  from "cookie-parser"
import messageRoutes from "./routes/messages.routes.js"
dotenv.config()
const port=process.env.PORT ||5000
const app=express()
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRoutes)
app.use('/api/messages',messageRoutes)

app.listen(port,()=>{
    connectToDb()
    console.log(`server is running on PORT ${port}`)
}
)