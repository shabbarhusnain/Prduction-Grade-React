import React, { useEffect, useState } from 'react'
import Select from '../components/Select.jsx'
import databaseService from '../../Backend/DatabaseService'
import {useForm} from 'react-hook-form'
import TextEditor from './textEditor.jsx'
import { useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import Button from '../components/Button'
import authService from '../../Backend/AuthService.js'
function PostForm({post}) {
    const {formState:{isSubmitting},watch,register,handleSubmit,setValue,control,getValues,onChange}=useForm({
        defaultValues:{
            title:post?.title||"",
            content:post?.content || "",
            slug:post?.$id || "",
            status:post?.status || "",
            featuredimage:post?.featuredimage||""
        }
    })
    const navigate =useNavigate()
    const [url,setUrl]=useState("")
    const [preview, setPreview] =useState(null)
    const [newPostUserID,setNewPostUserID]=useState("")

    useEffect(()=>{
        if(post){
            setUrl("")
        try {
            const viewLink= databaseService.ViewFile(post.featuredimage)
            if (viewLink){
                setUrl(viewLink)
            }
        } catch (error) {
            throw error
        }
    }},[])

    
    const Submit = async (data)=>{ 
        console.log("form wala data:",data);
        if (post){
            const id= post.userid
            try {
                const uploded=await databaseService.uploadFile(data.file[0])
                if (uploded){
                    await databaseService.deleteFile(post.featuredimage)
                    await databaseService.updatePost(post.$id,{...data, featuredimage:uploded.$id, userid:id})

                    navigate(`/post/${post.$id}`)
                }else{
                    navigate('/')
                };
            } catch (error) {
                throw error
            };
        }else{
            console.log("ye else wala chal giya ha")
            try {
                await authService.currentUser().then((prev)=>setNewPostUserID(prev.$id))
                const uploaded = await databaseService.uploadFile(data.file[0]);
                console.log("try wala chal giya jis upload na ye diya:",uploaded)
                if (uploaded && newPostUserID){
                    
                    const posted = await databaseService.newPost({...data,featuredimage:uploaded.$id, userid:newPostUserID})
                    console.log("uploaded condition pass ka bad ab ya sa posted mila ha:",posted)
                    console.log("isi posted walay ma database ko ye uploaded.$id ye ja rahi ha:",uploaded.$id)
                    if(posted){
                        console.log("hm na posted ki condition pass kar li ha matla data chala giya ha")
                        navigate(`/post/${posted.$id}`)
                    };
                };
            } catch (error) {
                throw error
            };
        };
    };
    const slugTransform = React.useCallback((value)=>{
        if (value && typeof value=="string")
        return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s+/g,"-")
        return "";
    },[])
    React.useEffect(()=>{
        const subscription= watch((value,{name})=>{
            if(name==="title"){
                setValue('slug',slugTransform(value.title),{shouldValidate:true})
            }
            
    })
    return ()=>subscription.unsubscribe()
},[watch,slugTransform,setValue])



  return (
    <div className='backdrop:blur-xl flex flex-col justify-start items-center backdrop-blur-lg min-h-screen'>
        <div className='bg-zinc-800 w-[80%] m-10  rounded-2xl  shadow-md shadow-amber-500/50 '>

            <div className='flex flex-col justify-center items-center text-3xl font-bold text-amber-500 mt-10 '>Write You Blog</div>

        <form className='flex flex-col lg:flex-row m-10 mt-5' onSubmit={handleSubmit(Submit)}>
            <div className='w-full lg:w-2/3 space-y-5'>                   
                <div className='m-3 mt-10 w-1/2'>
                    <Input
                    label="Title"
                    
                    placeholder="Enter title of blog"
                    labelclass="text-white text-2xl my"
                    {...register('title',{required:"Title is required"})}
                    />
                </div >

                <div className='m-3 mt-10 w-1/2'>
                    <Input
                    label="Slug"
                    placeholder="Auto generated..."
                    
                    labelclass="text-white text-2xl my"
                    {...register("slug",{required:true})}
                    onInput={(e)=>
                        {setValue("slug",slugTransform(e.currentTarget.value))}}
                    />
                </div >

                <div className='m-3 mt-10'>
                    <TextEditor
                    label="Context"
                    control={control}
                    defaultValue={getValues('content')}
                    />
                </div >    
            </div>

            <div className='w-full lg:w-1/3 space-y-5  '>
             <div className=''>
                        {post?<img src={url} alt="image not found"
                        
                        />:<img src={preview} alt="image not found"
                        className='className="w-fit rounded-lg'
                        />}
                </div>
                <div className='m-3 mt-5'>
                    <Input
                    type="file"
                    placeholder="upload image"
                    className=" bg-slate-900"
                    accept="file/png, file/jpg, file/jpeg, file/gif"
                    {...register('file',{required:"Image is required",onChange:(e)=>setPreview(URL.createObjectURL(e.target.files[0]))})}
                    />
                </div>
                <div className='m-3'>
                <Select
                items={["active","inactive"]}
                placeholder="Select Status"
                {...register("status")}
                />
                </div>
                <div className='m-3 mt-5 flex justify-center '>
                    {post?<Button type='submit'
                    className='w-[85%] rounded-xl '
                    disabled={isSubmitting}
                    >
                        {isSubmitting? "Updating...":"Update Now"}
                    </Button>:<Button type='submit'
                    className='w-[85%] rounded-xl '
                    disabled={isSubmitting}
                    >
                        {isSubmitting? "Posting...":"Post Now"}
                    </Button>}
                    
                </div>
            </div>

        </form>       
</div>            
</div>
)
}

export default PostForm;