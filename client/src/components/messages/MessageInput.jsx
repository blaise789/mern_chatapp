import React, { useState } from 'react'
import {BsSend}from "react-icons/bs"
import useSendMessage from '../../hooks/useSendMessage'

const MessageInput = () => {
  const {loading,sendMessage}=useSendMessage()
  const [message,setMessages]=useState("")
  const handleSubmit=async(e)=>{
    e.preventDefault()
    await sendMessage(message)
    setMessages("")
    
  
    
  }
  return (
    <form className='px-4 my-3 ' onSubmit={handleSubmit}>
        <div className='w-full relative'>
        <input type="text" placeholder='Send a message' value={message} onChange={(e)=>setMessages(e.target.value)} className='border text-sm rounded-lg  w-full p-2.5  bg-gray-700 border-gray-600 text-white'/>
        <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
          { !loading? (<BsSend />): <span className="loading loading-spinner"></span>}
        </button>
        </div>

    </form>
  )
}

export default MessageInput