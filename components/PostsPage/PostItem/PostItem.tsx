import Image, { StaticImageData } from 'next/image'
import React from 'react'
import s from './PostItem.module.scss'

type Props = {
    _id: string,
    text: string,
    postImg: string | StaticImageData,
}

const PostItem = ({_id,text,postImg}:Props) => {
  return (
    <div className={s.postItem}>
        <div className={s.postItem_imgWrapper}>
        <Image className={s.postItem_image} src={postImg} fill alt='post image'/>

        </div>
        <div className={s.postItem_text}>{text}</div>
    </div>
  )
}

export default PostItem