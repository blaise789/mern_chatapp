import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  
  const {messages,setMessages,selectedConversation}=useConversation()

  useEffect(() => {
    const getMessages = async () => {
    setLoading(true);
    console.log(selectedConversation)

        try{
      const res = await fetch(`/api/messages/${selectedConversation._id}`)
      const data=await res.json();
      console.log(data.messages)
      if(data.error){
        throw new Error(data.error)
      }
      setMessages(data.messages)
    }
    catch(error){
        toast.error(error.message)
        console.log(error)

    }
    finally{
        setLoading(false)
    }



    };
   if (selectedConversation?._id)  getMessages()
    

  },[selectedConversation?._id,setMessages]);
  return {messages,loading}
};

export default useGetMessages;
