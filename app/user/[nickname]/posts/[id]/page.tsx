import { getPostsByIdA } from '@/actions/post'
import SinglePostPage from '@/pages/SinglePostPage/SinglePostPage'
import React from 'react'

const page =async (props: {
  params: { id: string }
}) => {
    const postData=await getPostsByIdA(props.params.id)
    console.log(postData)
  return (
    <SinglePostPage postData={postData}/>
  )
}

export default page