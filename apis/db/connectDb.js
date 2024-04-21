import mongoose from "mongoose"

export const connectToDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("connectedToDb")
    }

    catch(error){
    console.log("Error connecting to db",error.message)
    }
}
