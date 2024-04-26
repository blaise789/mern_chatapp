import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute=async(req,res,next)=>{

    try{
        const token=req.cookies.jwt
        if(!token){
            return res.status(400).json({error:"An authorized no token Provided"})

        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(400).json({error:"An authorized invalid token"})
        }
        const user=await User.findById(decoded.userId)
        if(!user){
            return res.status(404).json({error:"user not found"})
        }
        req.user=user
        next()




    }
    catch(error){
        res.status(500).json({error:"internal server error"})
    }
}
export default protectRoute