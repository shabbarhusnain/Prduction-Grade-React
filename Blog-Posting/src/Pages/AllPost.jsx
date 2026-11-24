import React, { useEffect, useState } from 'react'
import databaseService from '../Backend/DatabaseService'
import { Query } from 'appwrite'
import { Link } from 'react-router-dom'
function AllPost({id}) {
  const [posts,setPosts]=useState([])
  console.log("id:",id)
  useEffect(()=>{
     if (typeof id === "string" && id.trim() !== ""){
    try {    
        databaseService.allpost([Query.equal("userid",id.id)]).then((prev)=>setPosts(prev.documents))
    } catch (error) {
      throw error
    }
  }else{
    try {
        databaseService.allpost().then((prev)=>setPosts(prev.documents))      
    } catch (error) {
      throw error
    }
  }
  },[])
  return (
    <div className='backdrop-blur-3xl min-h-screen flex flex-row'>
      <div></div>
    {posts?.map((post)=>(
     <Link to={`/post/:${post.$id}`}> <div key={post.$id} className='bg-zinc-800 border-amber-500/50 border-1 hover:bg-zinc-900  h-120 w-100 m-3 flex flex-col justify-between  border rounded-xl '>
        <div className='m-2  rounded-xl w-95 h-93 overflow-hidden'>
          <img className='w-full h-full rounded-xl ' src={databaseService.ViewFile(post.featuredimage)} alt="image not found" />
          </div>
          <div className='m-2 text-2xl font-bold bg-zinc-900 hover:bg-zinc-800 p-3 rounded-xl'>
            <h1>{post.title}</h1>
          </div>
      </div></Link>
    ))}
    </div>
  )
}

export default AllPost