import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"
import { connectToDb } from "./db/connectDb.js"
dotenv.config()
const port=process.env.PORT ||5000
const app=express()
app.use(express.json())
app.use('/api/auth',authRoutes)

app.listen(port,()=>{
    connectToDb()
    console.log(`server is running on PORT ${port}`)
}
)