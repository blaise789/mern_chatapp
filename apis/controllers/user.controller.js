import User from "../models/user.model.js"
export const getUserForSideBar=async (req,res)=>{
    try{
   const loggedInUser= req.user._id
   console.log(loggedInUser)
   const filteredUsers=await User.find({_id:{$ne:loggedInUser}}).select("-password")
   return res.status(200).json(filteredUsers)
    }
    catch(error){
        // console.log(error.message)
        res.status(500).json({message:"internal error"})
    }

}