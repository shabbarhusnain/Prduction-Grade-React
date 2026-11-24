import React, { useEffect, useState } from 'react'
import AllPost from './AllPost'
import authService from '../Backend/AuthService'
function MyPost() {
  const [id,setId] = useState([])
  const [load,setLoad]=useState(true)
  useEffect(()=>{
    authService.currentUser().then((prev)=>setId(prev.$id))
    setLoad(false)
  
  },[])
  

  return (
    <>{load? <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-800 text-white">
    <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
    <p className="mt-4 text-lg font-medium animate-pulse">Loading...</p>
  </div>
      :
 <AllPost id={id}/>
 }</>
  )
}

export default MyPost