import React, { useState } from 'react'
import {login} from '../../Store/AuthSlice'
import {Link, useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Input from '../components/Input'
import Button from '../components/Button'
import authService from '../../Backend/AuthService'
import { useDispatch } from 'react-redux'

function Signup() {
    const {register,handleSubmit,formState: { errors, isSubmitting },getValues} =useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [errorss,setError] = useState("")

const Submit =async (data)=>{
    setError("")
    try {
        if(data){
         const userData=await authService.Signup(data)    
            dispatch(login(userData)); navigate('/')
        }else{
                navigate('/signup-page')
            }
        }
    catch (error) {
        setError(error.message)
    }
}

  return (
    <div className='min-h-screen flex justify-center items-start backdrop-blur-xl '>
        <div className=' bg-zinc-800 text-white  w-[450px] border-amber-700 border-2 flex flex-col mt-10 rounded-4xl p-10 '>
            <div ><h1 className='flex justify-center text-5xl font-bold text-shadow-lg mt-3'>The Bloger's</h1></div>
            <div className='flex justify-center text-2xl text-bold m-2 text-shadow-lg'>WELLCOME</div>
            <div className='flex justify-center text-xl text-bold mt-4 text-shadow-lg'>Please Create Your Account</div>
            {errorss && <p className="text-red-600 mt-8 text-center">{errorss}</p>}

            <div>
            <form className='' onSubmit={handleSubmit(Submit)} >
                <div className='m-3'>
                    <Input
                    type="text"
                    label="Full Name"
                    className="text-lg"   
                    placeholder="Enter your full name"
                    {...register("name",{required:"Name is required."})}
                    />
                </div>
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
                     <p>{errors.email?.message}</p>
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
                    <p>{errors.password?.message}</p>
                <div  className='mx-3 mt-8  flex justify-center '>
                    <p className='text-lg '> If you already have an account? <Link to={'/signin-page'} className='hover:text-amber-500 font-bold'>Sign In</Link></p>
                    </div>
                    <div className='p-4 flex justify-center'>
                        <Button className='ml-3  w-[85%]  rounded-3xl text-2xl 'type="submit" disabled={isSubmitting}>
                            { isSubmitting? "Creating...":"Create"}</Button>
                </div>
                
            </form>
            </div>
        </div>
        
    </div>
  )
}

export default Signup