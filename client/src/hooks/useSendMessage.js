import { useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"

const useSendMessage = () => {
    const [loading,setLoading]=useState(false)
    const {messages,setMessages,selectedConversation}=useConversation()
    const sendMessage=async(message)=>{
        setLoading(true)
        console.log(message)
        try{
            console.log(selectedConversation._id)

            const res=await fetch(`/api/messages/${selectedConversation._id}`,{method:"POST",headers:{
                    "Content-type": "application/json"
                },
                body:JSON.stringify({message})
            })
            const data=await res.json()
            console.log(data)
            
            if(data.error){
                throw new Error(data.error)
            }
            setMessages([...messages,data])
        }
        catch(error){
            toast.error(error.message)

        }
        finally{
            setLoading(false)
        }
    }
    return {sendMessage,loading}
  

}

export default useSendMessage