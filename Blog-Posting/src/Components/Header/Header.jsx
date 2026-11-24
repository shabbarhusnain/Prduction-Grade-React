import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Button from '../components/Button'
function Header() {
  const isactive = useSelector((state)=>state.auth.status)
const navitems=[
  {
    id:"01",
    name:"Home",
    slug:"/",
    status:true
  },
  {
    id:"03",
    name:"All Posts",
    slug:"/all-post",
    status:isactive
  },
  {
    id:"04",
    name:"My Posts",
    slug:'/my-post',
    status:isactive
  },
  {
    id:"05",
    name:"Add Post",
    slug:"/add-post/:userId",
    status:isactive
  },
  {
    id:"06",
    name:"Sign Up",
    slug:"/signup-page",
    status:!isactive
  },
  
]
  return (
    <nav className='sticky  h-20 top-0 z-50  flex justify-between items-center px-6 py-4 bg-zinc-800 backdrop-blur-md border-b border-gray-900'>
      <div  className="text-2xl font-bold text-amber-500">The Bloger's</div>
      
      <div className='hidden md:flex items-center gap-8 text-gray-200 font-medium text-md'>
          {navitems.map((item)=>item.status?
      <Link to={item.slug}  key={item.id} value={item.name}><p className='hover:text-amber-500 transition'>{item.name}</p></Link>:null
      )}</div>
      {isactive? <Link to={'/signout'}><Button
      className='shadow-lg shadow-amber-600/50'
      >
    Sign Out
  </Button></Link>:<Link to={'/signin-page'}><Button 
  className='shadow-lg shadow-amber-600/50'>
    Sign In
  </Button></Link>}
      
      </nav>
  )
}

export default Header