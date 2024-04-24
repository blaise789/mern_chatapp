import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js"

export const registerUser=async (req,res)=>{
    try{
    const {fullName,username,password,confirmPassword,gender}=req.body
    if(password!==confirmPassword){
        return res.status(400).json({error:"passwords don't match"})
    }
    const user=await User.findOne({username})
    if(user){
        return res.status(400).json({error:"user already registered"})
    }
  const hashedPassword= await bcrypt.hash(password,10)
  const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
  const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

  const newUser=new User({
    fullName,
    username,
    password:hashedPassword,
    gender,
    profilePic:gender==="male" ? boyProfilePic:girlProfilePic
  }) 
  

  if(newUser){
    generateTokenAndSetCookie(newUser._id,res)
    await newUser.save()
  }
 res.status(201).json({
    id:newUser._id,
    fullName:newUser.fullName,
    username:newUser.username,
    profilePic:newUser.profilePic,
    
    
 })
    }
    catch(error){
    res.status(500).json({error:"failed to register user"})

    }
}
export const loginUser=async (req,res)=>{
  try{
    const {username,password}=req.body
    const user=await User.findOne({username})
    const isPasswordCorrect= await bcrypt.compare(password,user.password)
  
  if(!user || !isPasswordCorrect){
    res.status(400).json({error:"invalid username or password"})
  
  }
  generateTokenAndSetCookie(user._id,res)
  res.status(200).json({
    id:user._id,
    username:user.username,
    fullName:user.fullName,
    profilePic:user.profilePic,
  })

  }
  catch(err){
    res.status(50).json({error:"internal server error"})
  }

    // return res.send("login route")
}
export const logoutUser=async(req,res)=>{
    // return res.send("logout route")
    try{
      res.cookie("jwt","",{maxAge:0})
      res.json({message:"logout successfully"})
    
    }
    catch(error){
      res.status(500).json({error:"internal server error"})
      
      res.json({message:"logout failed"})

    }
}