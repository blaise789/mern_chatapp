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
export const getMessages=(req,res)=>{

}