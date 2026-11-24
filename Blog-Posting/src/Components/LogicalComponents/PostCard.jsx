import React, { useEffect, useState } from 'react'
import databaseService from '../../Backend/DatabaseService'
import parse from 'html-react-parser';
import authService from '../../Backend/AuthService';
import Button from '../components/Button'
import { Link } from 'react-router-dom';
function PostCard({id}) {
  const [isLoading, setIsLoading] = useState(true)
  const [post, setPost] =useState([])
  const [url, setUrl] =useState()
  const [user, setUser] = useState("")
  
  console.log("id:  ",id)
  useEffect(()=>{
    const getPost=async()=>{
      if(id){
        setIsLoading(true)
        setPost(null)
        setUrl(null)
        try {
          await authService.currentUser().then((user)=>setUser(user))
          await databaseService.singlePost(id).then((prev)=>{if(prev){
            setPost(prev)
           const image =databaseService.ViewFile(prev.featuredimage)
           setUrl(image)
          }})
          
        } catch (error) {
          throw error
        }finally{
          setIsLoading(false)
        }
      }
    }
    getPost()
  },[id])
  console.log(user)
  return (

    <div>{isLoading? 
    // true condition
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-800 text-white">
    <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
    <p className="mt-4 text-lg font-medium animate-pulse">LODING DATA</p>
  </div>
     : 
      <div className='bg-zinc-800 border-amber-600 flex flex-col min-h-screen items-center'>
      <div className='mt-7 text-4xl font-bold'>{post.title}</div>
      <div className='mt-7 grid grid-cols-3 '>
      <div className=' col-span-2 overflow-y-auto ml-8 h-150 rounded-xl'>
      <h1 className=' pl-3 text-3xl font-bold hover:text-amber-500'>Detail:</h1>
      <p className='bg-zinc-900 rounded-xl  p-7 mt-3 w-full text-xl'>
       {parse(post.content)} </p>
      </div>
      <div className=' m-7 rounded-2xl h-fit'>
        <img className='w-fit shadow-lg shadow-black rounded-2xl'
        src={url} alt="Image Not Found" />
          {post?.userid && user?.$id===post?.userid && (
          <div className='mt-10'>
            <Link to={`/edit-post/${id}`}><Button>
              Edit Post
            </Button></Link>
<Link to={`/delete-post/${id}`}><Button className='bg-red-800 ml '>Delete Post</Button></Link>
            
          </div>
        )}
      </div>
      </div>
    </div>
    
    }</div>
  )
}

export default PostCard