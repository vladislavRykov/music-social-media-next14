import React from 'react'
import OldestNewestSelector from './OldestNewestSelector/OldestNewestSelector'
import s from './PostFilters.module.scss'
import Link from 'next/link'

const PostFilters = () => {
  return (
    <div className={s.postFilters}>
      <Link className={s.postFilters_createNewPost} href={'/post/create'}>Создать пост</Link>
        <OldestNewestSelector/>
    </div>
  )
}

export default PostFilters