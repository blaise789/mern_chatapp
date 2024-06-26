import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../skeletons/MessageSkeleton'
import useConversation from '../../zustand/useConversation'
import useListenMessage from '../../hooks/useListenMessage'

const Messages = () => {
  const {messages,loading}=useGetMessages()
  const {selectedConversation}=useConversation()
	useListenMessage();
  
  const lastMessageRef=useRef()
  useEffect(()=>{
    setTimeout(()=>{
      lastMessageRef.current?.scrollIntoView({behaviour:"smooth"})
    },10)
  },[messages])


  return (
    <div className='px-4 flex-1 overflow-auto'>
    {!loading && messages?.length>0&& messages?.map((message)=><div key={message._id}  ref={lastMessageRef} >
      <Message  message={message} profilePicture={selectedConversation.profilePic}/>
    </div>)} 
     {loading &&[...Array(3)].map((_,idx)=><MessageSkeleton key={idx}/>)}
     {!loading && !messages && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}
    </div>
  )
}

export default Messages