import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {login, logout} from '../Store/AuthSlice'

function AuthLayer({children,authentication=true,to} ) {
    const [isLoading, setIsLoading] = React.useState(true)
    const navigate =useNavigate()
    const isAuth = useSelector((state)=>state.auth.status)

    
    useEffect(()=>{
        if (authentication && isAuth !== authentication){
        navigate('/signin-page')
        
    }else if (!authentication && isAuth !== authentication){
        navigate(to)
    }
        setIsLoading(false)
    },[children,to])
    
  return (
    <div>{isLoading?<div className='flex h-screen bg-zinc-900 text-white font-sans text-3xl justify-center items-center'>Loading....</div>:<div>{children}</div>} </div>
  )
}

export default AuthLayer