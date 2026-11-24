import React, { useEffect, useState } from 'react'
import databaseService from '../Backend/DatabaseService'
import { Query } from 'appwrite'
import { Link } from 'react-router-dom'
function AllPost({id}) {
  const [isloading, setIsLoading]=useState(true)
  const [posts,setPosts]=useState([])
  
  // console.log("id mypost ma aa gai ha:",id)
  // const userid =
  useEffect(()=>{
    const userData=async ()=>{
      setIsLoading(true)
    if (id){
      // console.log("condition pass ho gai ha",id)
    try {    
      const queries=[Query.equal("userid",id)]
      await databaseService.allpost(queries).then((prev)=>setPosts(prev.documents))
    } catch (error) {
      throw error
    }finally{
      setIsLoading(false)
    }
  }else{
    try {
        await databaseService.allpost().then((prev)=>setPosts(prev.documents))
    } catch (error) {
      throw error
    }finally{
      setIsLoading(false)
    }
  }}
  userData()
    
  },[id])
  return (
    <div className='grid grid-cols-3 gap-1 backdrop-blur-xl min-h-screen' >
      {!isloading? (posts?.length>0 ? 
          posts?.map((post)=>(
        <Link to={`/post/${post.$id}`} key={post.$id}> 
        <div  className='bg-zinc-800 border-amber-500/50 border-1 hover:bg-zinc-900  h-120 w-100 m-3 flex flex-col justify-between  border rounded-xl '>
          <div className='m-2  rounded-xl w-95 h-93 overflow-hidden'>
            <img className='w-full h-full rounded-xl ' src={databaseService.ViewFile(post.featuredimage)} alt="image not found" />
          </div>
          <div className='m-2 text-2xl font-bold bg-zinc-900 hover:bg-zinc-800 p-3 rounded-xl'>
            <h1>{post.title}</h1>
          </div>
        </div>
</Link>
          ))               
                                :
       <div className='flex flex-col justify-center items-center'>                     
    <div className='text-3xl bg-zinc-800 p-10 rounded-2xl font-bold'>
      <p className='text-amber-500'>Sorry!</p>You have no post yet...</div></div>
      ):(<div className="flex flex-col items-center justify-center min-h-screen bg-zinc-800 text-white">
    <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
    <p className="mt-4 text-lg font-medium animate-pulse">LODING DATA</p>
  </div>)
      } 
</div>
  )
}

export default AllPost