import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"
import { connectToDb } from "./db/connectDb.js"
import cookieParser  from "cookie-parser"
import messageRoutes from "./routes/messages.routes.js"
import userRoutes from "./routes/user.routes.js"
import { app,server } from "./socket/socket.js"
import  path from "path"
dotenv.config()
const port=process.env.PORT ||5000
const __dirname=path.resolve()
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRoutes)
app.use('/api/messages',messageRoutes)
app.use('/api/users',userRoutes)
app.use(express.static(path.join(__dirname,"/client/dist")))
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"client","dist","index.html"))
})

server.listen(port,()=>{
     connectToDb()
    console.log(`server is running on PORT ${port}`)
}
)