import React from 'react'
import PostCard from '../Components/LogicalComponents/PostCard'
import { useParams } from 'react-router-dom'
function Post() {
  const {id}= useParams()
  return (
    <div><PostCard id={id}/></div>
  )
}

export default Post