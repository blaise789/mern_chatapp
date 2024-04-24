import Message from "../models/messsages.model.js"
import Conversation from "../models/conversation.model.js"
export const sendMessage=async(req,res)=>{
    try{
        const {message}=req.body
        const {id:recieverId}=req.params
        const senderId=req.user._id
        let conversation=await Conversation.findOne({
            participants:{$all:[senderId,recieverId]}
        })
        if(!conversation){
            conversation=await Conversation.create({participants:[senderId,recieverId]})
            
        }
        const newMessage=new Message({
            senderId,
            recieverId,
            message
        })
        if(newMessage){
        conversation.messages.push(newMessage._id)
        await Promise.all([newMessage.save(),conversation.save()])
        
        }

       
    res.status(201).json({newMessage})
    }
    catch(error){
   console.log(error)
   res.status(500).json({message:"internal server error"})
    }
}
export const getMessages=async(req,res)=>{
    try{
    const {id:userToChatId}=req.params
    const senderId=req.user._id
    const conversation=await Conversation.findOne({
        participants:{$all:[senderId,userToChatId]}
    }).populate("messages")
    if(!conversation){
        return res.status(200).json([])
    }
    res.status(200).json({messages:conversation.messages})
    }
    catch(error){
        res.status(500).json({message:"error in the controller"})
    }




}