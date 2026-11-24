import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Button from '../Components/components/Button'
import databaseService from '../Backend/DatabaseService'

function DeletePost() {
    const {id}=useParams()
    const navigate=useNavigate()
    const handelDelete=()=>{
        databaseService.deletePost(id)
        navigate('/my-post')
    }
  return (
    <div className='flex flex-col justify-center items-center backdrop-blur-lg min-h-screen'>
        <div className='bg-zinc-800 hover:bg-zinc-900 rounded-xl w-1/4 h-fit'>
            <div className='p-7'>
<p className='text-lg'>Do you want to delete <span class="text-amber-500 inline font-semibold">this Blog?</span> </p>
                <hr/>
                <div className='mt-3 flex flex-row  justify-end '>
                    <div className='mr-3'>
                    <Link to={`/post/${id}`}><Button
                    className='rounded-3xl bg-zinc-600 hover:bg-zinc-950'
                    >Cancle</Button></Link></div>
                    <Button
                    className='rounded-3xl hover:bg-red-700'
                    onClick={handelDelete}
                    >Delete 🗑️</Button></div>
                
            </div>
        </div>
    </div>
  )
}

export default DeletePost