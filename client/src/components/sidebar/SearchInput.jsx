import React, { useState } from 'react'
import toast from 'react-hot-toast'
import {IoSearchSharp} from "react-icons/io5"
import useConversation from '../../zustand/useConversation'
import useGetConversations from '../../hooks/useGetConversations'
const SearchInput = () => {
 const [search,setSearch]=useState("")
const {conversations}=useGetConversations()
const {setSelectedConversation}=useConversation()

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(!search) return
   if(search.length<3){
    return toast.error("please enter atleast 3 characters")
   }
  

const conversation=conversations.find((c)=>c.fullName.toLowerCase().includes(search.toLowerCase()))
if(conversation){
setSelectedConversation(conversation)
setSearch("")
}
else{
  toast.error("user not found")
  setSearch("")
}



return


  }
  return (
    <form className='flex items-center gap-2' onSubmit={handleSubmit}> 
        <input type='text' placeholder="search ..." value={search}   onChange={(e)=>setSearch(e.target.value)}className='input input-bordered'/>
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
        <IoSearchSharp className='w-6 h-6 outline-none' />
            </button>


    </form>
  )
}

export default SearchInput