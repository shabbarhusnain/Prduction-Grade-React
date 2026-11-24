import React from 'react'
import PostForm from '../Components/LogicalComponents/PostForm'

function EditPost({post}) {
  return (
    <div><PostForm post={post}/></div>
  )
}

export default EditPost