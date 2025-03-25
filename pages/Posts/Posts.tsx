import PostFilters from '@/components/PostsPage/PostFilters/PostFilters'
import PostList from '@/components/PostsPage/PostList/PostList'
import React from 'react'

const Posts = () => {
  return (
    <div>
      <PostFilters/>
        <PostList/>
    </div>
  )
}

export default Posts