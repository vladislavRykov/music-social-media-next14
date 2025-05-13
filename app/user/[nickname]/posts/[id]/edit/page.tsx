import { getPostsByIdA } from '@/actions/post'
import PostEditPage from '@/pages/PostEditPage/PostEditPage'
import React from 'react'

const page =async (props: {
  params: { id: string }
}) => {
    const postData=await getPostsByIdA(props.params.id)
  return (
    <PostEditPage postData={postData}/>
  )
}

export default page