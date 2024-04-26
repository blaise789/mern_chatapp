import React, { useState } from 'react'
import {IoSearchSharp} from "react-icons/io5"
const SearchInput = () => {
 const [search,setSearch]=useState("")
  const handleSubmit=(e)=>{
    e.preventDefault()


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