import { use, useEffect, useState } from 'react'
import './App.css'
import {login, logout} from './Store/AuthSlice'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import {Outlet, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import authService from './Backend/AuthService'

function App() {
const url="https://png.pngtree.com/thumb_back/fh260/background/20240727/pngtree-beautiful-snapseed-background-hd-4k-for-editing-image-image_16118056.jpg"
const [isloading, setIsLoading] = useState(true)

const dispatch= useDispatch()
const navigate =useNavigate()
useEffect(()=>{ 
  const checkuser = async()=>{
  const user =await authService.currentUser()
  // console.log("user : ",user)
  if (user){
    dispatch(login({user}))
    navigate('/')
  }else{
    dispatch(logout())
  }
  
}
checkuser()
// console.log("user  :", checkuser)
return setIsLoading(false)},[])

  return (<>{isloading? 
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-800 text-white">
   
    <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
    <p className="mt-4 text-lg font-medium animate-pulse">Loading...</p>
  </div>    
    ://main rendering
  <><Header/>
    <div className='min-h-screen bg-no-repeat bg-center bg-cover ' 
    style={{ backgroundImage: `url(${url})` }}><Outlet/></div>
    <Footer/></>}</>
    

  )
}

export default App
