import React, { useState } from 'react'
import {login} from '../../Store/AuthSlice'
import {Link, useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Input from '../components/Input'
import Button from '../components/Button'
import authService from '../../Backend/AuthService'
import { useDispatch } from 'react-redux'
function Signin() {
    const {register,handleSubmit,formState: { errors ,isSubmitting}} =useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [errorss,setError] = useState("")

const Submit =async (data)=>{
    setError("")
    try {
        if(data){
        const user= await authService.Signin(data)    
            if (user){
                const userData=await authService.currentUser()
                if (userData){
                dispatch(login({userData}))
                navigate('/')
            }
            }else{
                navigate('/signin-page')
            }
        }
    } catch (error) {
        setError(error.message)
    }
}

  return (
    <div className='min-h-screen flex justify-center items-start backdrop-blur-xl '>
        <div className=' bg-zinc-800 text-white w-[450px] border-amber-700 border-2 mt-10 flex flex-col rounded-4xl p-10 '>
            <div ><h1 className='flex justify-center text-4xl font-bold text-shadow-lg m-3'>The Bloger's</h1></div>
            <div className='flex justify-center text-2xl text-bold  text-shadow-lg'>WELLCOME</div>
            <div className='flex justify-center text-lg text-bold mt-3 text-shadow-lg'>Please sign in</div>
            <div >{errorss? <p className='text-md text-red-600 m-3'>{errorss}</p>:""}</div>
            <div >
            <form onSubmit={handleSubmit(Submit)} >
                <div className='mx-3 my-6'>
                    <Input
                    label="Email"
                    type="text"
                    className="text-lg"    
                    placeholder="Email"
                    {...register("email",{required:"Email is required",pattern:{value:/^\S+@\S+\.\S+$/
                        ,message:"Email is required"}
                    })}
                    />
                    
                </div>
                <div  className='m-3 mt-6'>
                    <Input
                    label="Password"
                    type="password"
                    className="text-lg"    
                    placeholder="Password"
                    {...register("password",{required:"Password is required",
                        minLength:{message:"Invalid password"}
                    })}
                    />
                </div>
                <div  className='mx-3 mt-8  flex justify-center text-2xl'>
                     <p className='text-sm '> If you don't have an account? <Link to={'/signup-page'} className='hover:text-amber-500 font-bold'>Sign Up</Link></p>
                  </div>  
                  <div className='p-4 flex justify-center'>
                  <Button className=' w-[85%]  rounded-3xl text-2xl'
                  type="submit"
                  disabled={isSubmitting}>{ isSubmitting? "Signing in...":"Signin"}
                  </Button>
                </div>
                
            </form>
            </div>
        </div>
        
    </div>
  )
}

export default Signin