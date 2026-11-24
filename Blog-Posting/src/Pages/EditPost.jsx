import React, { useEffect, useState } from 'react'
import PostForm from '../Components/LogicalComponents/PostForm'
import { useParams } from 'react-router-dom'
import databaseService from '../Backend/DatabaseService'

function EditPost() {
  const {id}=useParams()
  const [post, setPost]=useState('')
  useEffect(()=>{
    const mypost = async ()=>{
      try {
        await databaseService.singlePost(id).then((prev)=>setPost(prev))
      } catch (error) {
        throw error
      }
    }
    mypost()
  },[id])
  return (
    <div>{post?<PostForm post={post}/>:<div className="flex flex-col items-center justify-center min-h-screen bg-zinc-800 text-white">
    <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
    <p className="mt-4 text-lg font-medium animate-pulse">LODING DATA</p>
  </div>}</div>
  )
}

export default EditPost